# api/summarize_worker.py
import sys
import os
import json
import re
from typing import List, Dict, Any
from collections import Counter

def extract_text_from_pdf(file_path: str) -> str:
    try:
        from pypdf import PdfReader
        reader = PdfReader(file_path)
        text_parts = []
        for page in reader.pages:
            t = page.extract_text()
            if t:
                text_parts.append(t)
        return "\n".join(text_parts).strip()
    except Exception as e:
        return ""

def extract_text_from_docx(file_path: str) -> str:
    try:
        import zipfile
        import xml.etree.ElementTree as ET
        with zipfile.ZipFile(file_path) as z:
            xml_content = z.read("word/document.xml")
            tree = ET.fromstring(xml_content)
            paragraphs = []
            for node in tree.iter():
                if node.tag.endswith("}p"):
                    p_text = "".join(node.itertext()).strip()
                    if p_text:
                        paragraphs.append(p_text)
            return "\n".join(paragraphs).strip()
    except Exception as e:
        return ""

def extract_text(file_path: str) -> str:
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".pdf":
        text = extract_text_from_pdf(file_path)
        if text: return text
    elif ext in [".docx", ".doc"]:
        text = extract_text_from_docx(file_path)
        if text: return text

    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read().strip()
    except Exception:
        return ""

def clean_extracted_text(raw_text: str) -> str:
    # Remove replacement chars and non-printable noise
    cleaned = raw_text.replace('\ufffd', ' • ').replace('\x00', '')
    cleaned = re.sub(r'[\x01-\x08\x0b\x0c\x0e-\x1f]', ' ', cleaned)
    # Remove common slide footers like "Work from home house outline", "W1 | W2 | ..."
    cleaned = re.sub(r'Work from\s+home house\s+outline', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'W\d+\s*\|\s*W\d+.*', '', cleaned)
    cleaned = re.sub(r'\r\n|\r', '\n', cleaned)
    return cleaned

def segment_and_filter(text: str) -> List[str]:
    raw_lines = text.split('\n')
    valid_sentences = []
    
    # Track boilerplate lines to remove duplicates
    line_counts = Counter([l.strip().lower() for l in raw_lines if len(l.strip()) > 5])

    seen_raw = set()
    for line in raw_lines:
        line_clean = line.strip()
        # Filter out very short lines, numbers only, or repetitive slide headers
        if len(line_clean) < 12 or line_clean.isdigit():
            continue
        # Clean bullet artifacts, course codes, and trailing slide numbers
        line_clean = re.sub(r'^[•\-\*\d\.\)\s]+', '', line_clean).strip()
        line_clean = re.sub(r'^[A-Z]{2,4}\d{3,4}\s*[\-–—•]\s*', '', line_clean).strip()
        line_clean = re.sub(r'\s+\d{1,3}$', '', line_clean).strip()

        if len(line_clean) < 15:
            continue

        lower_key = line_clean.lower()
        if lower_key in seen_raw:
            continue
        seen_raw.add(lower_key)

        if line_counts[line_clean.lower()] > 4: # repeated 5+ times
            continue

        # Further split by sentence if line is long
        if len(line_clean) > 120:
            parts = re.split(r'(?<=[.!?])\s+', line_clean)
            for p in parts:
                if len(p.strip()) > 20:
                    valid_sentences.append(p.strip())
        else:
            valid_sentences.append(line_clean)
    
    return valid_sentences

def generate_summary(text: str, filename: str) -> Dict[str, Any]:
    cleaned_text = clean_extracted_text(text)
    sentences = segment_and_filter(cleaned_text)

    clean_doc_name = os.path.splitext(filename)[0].replace("_", " ").replace("-", " ").title()

    if not sentences:
        return {
            "title": f"Rumusan: {clean_doc_name}",
            "summary": f"Dokumen {clean_doc_name} telah berjaya dimuat naik dan diproses. Nota ini mengandungi panduan dan bahan rujukan pembelajaran bagi silibus anda.",
            "key_points": [
                f"Fail '{filename}' telah disahkan dan direkodkan ke dalam profil pembelajaran.",
                "Sila semak semula sekiranya fail adalah dokumen bergambar atau imbasan.",
                "Gunakan butang audio untuk mendengarkan bacaan rumusan nota anda."
            ],
            "keywords": ["Nota", "Pembelajaran", "Ulangkaji", "Akademik"],
            "flashcards": [
                {"q": f"Apakah dokumen yang dimuat naik?", "a": clean_doc_name}
            ],
            "quiz": []
        }

    # Best Title
    title = ""
    for s in sentences[:5]:
        if 15 < len(s) < 80 and not s.endswith(":") and not re.search(r'\b(marks|assignment|reflection)\b', s, re.IGNORECASE):
            title = s
            break
    if not title:
        title = clean_doc_name

    # Extract keywords
    words = re.findall(r'\b[A-Z][a-zA-Z0-9\'-]+\b|\b\d{3,4}\b', cleaned_text)
    stop_words = {"pada", "yang", "dan", "dari", "dalam", "untuk", "oleh", "adalah", "with", "this", "from", "that", "have", "week", "marks", "phase"}
    filtered_words = [w for w in words if len(w) > 3 and w.lower() not in stop_words]
    top_keywords = [k for k, _ in Counter(filtered_words).most_common(10)]
    if not top_keywords:
        top_keywords = ["Topik Utama", "Kandungan", "Konsep", "Pembelajaran"]

    # Score sentences to find the best 4-6 key points
    scored = []
    seen_texts = set()
    for s in sentences:
        s_norm = s.lower()
        if s_norm in seen_texts:
            continue
        seen_texts.add(s_norm)
        
        score = 0
        if re.search(r'\b(definition|importance|concept|process|objective|explain|method|outcome|faktor|punca|konsep|kepentingan|fungsi|sejarah|tujuan)\b', s, re.IGNORECASE):
            score += 4
        if re.search(r'\d+', s):
            score += 2
        for kw in top_keywords:
            if kw.lower() in s_norm:
                score += 1
        scored.append((score, s))

    scored.sort(key=lambda x: x[0], reverse=True)
    selected_points = [s for _, s in scored[:5]]

    if len(selected_points) < 3:
        selected_points = sentences[:4]

    # Create Coherent Summary
    summary_sentences = selected_points[:3]
    summary_text = " ".join(summary_sentences)
    if not summary_text.endswith("."):
        summary_text += "."

    # Generate Flashcards
    flashcards = []
    for idx, p in enumerate(selected_points[:4]):
        # Check for colon like "Topic: description"
        if ":" in p:
            parts = p.split(":", 1)
            flashcards.append({
                "q": f"Apakah intipati berkaitan {parts[0].strip()}?",
                "a": parts[1].strip()
            })
        else:
            flashcards.append({
                "q": f"Apakah konsep utama dalam bahagian {idx + 1}?",
                "a": p
            })

    # Generate Quiz items
    quiz_items = []
    for idx, p in enumerate(selected_points[:2]):
        if len(p) > 20:
            quiz_items.append({
                "q": f"Berdasarkan nota anda, manakah hujah/fakta yang tepat mengenai topik ini?",
                "options": [
                    p[:110] + ("..." if len(p) > 110 else ""),
                    "Fakta ini bertentangan dengan prinsip asal nota.",
                    "Huraian tidak berkaitan dengan silibus pembelajaran.",
                    "Fakta tidak ditemui dalam mana-mana seksyen dokumen."
                ],
                "correct": 0,
                "explanation": p
            })

    return {
        "title": title,
        "summary": summary_text,
        "key_points": selected_points,
        "keywords": top_keywords[:8],
        "flashcards": flashcards,
        "quiz": quiz_items
    }

def main():
    if len(sys.argv) < 2:
        res = {"status": "error", "message": "Tiada fail diberikan."}
        print(json.dumps(res, ensure_ascii=True))
        sys.exit(1)

    file_path = sys.argv[1]
    filename = sys.argv[2] if len(sys.argv) > 2 else os.path.basename(file_path)
    output_json_path = sys.argv[3] if len(sys.argv) > 3 else None

    if not os.path.exists(file_path):
        res = {"status": "error", "message": "Fail tidak ditemui pada pelayan."}
        print(json.dumps(res, ensure_ascii=True))
        sys.exit(1)

    text = extract_text(file_path)
    result_data = generate_summary(text, filename)

    response = {
        "status": "success",
        "filename": filename,
        "char_count": len(text),
        "data": result_data
    }

    # Ensure ASCII escaping for safe Windows pipe and file write
    json_output = json.dumps(response, ensure_ascii=True)

    if output_json_path:
        try:
            with open(output_json_path, "w", encoding="utf-8") as out_f:
                out_f.write(json_output)
        except Exception as e:
            pass

    print(json_output)

if __name__ == "__main__":
    main()
