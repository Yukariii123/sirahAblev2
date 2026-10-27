/**
 * SIRAHABLE — Sistem Logik Cerita & Keputusan (Req 5 & 6)
 */

const worldNodes = [
    {
        id: 1, type: 'story', module_id: 2,
        title: "KOTA BAGHDAD (MADINAT AL-SALAM)",
        narration: "Kota Baghdad telah diasaskan oleh Khalifah Abu Ja'far al-Mansur pada tahun 762 M sebagai ibu kota pentadbiran baharu. Ia dibina dengan reka bentuk bulatan yang unik dan digelar Kota Kedamaian.",
        pos_x: 0, pos_z: -15
    },
    {
        id: 2, type: 'story', module_id: 4,
        title: "BAYT AL-HIKMAH",
        narration: "During the Abbasid period, Baghdad became an important center of knowledge and scholarship. Ribuan sarjana berkumpul di sini untuk menterjemahkan manuskrip falsafah dan perubatan dari seluruh dunia.",
        pos_x: -10, pos_z: -45
    },
    {
        id: 3, type: 'decision', module_id: 4, topic: "knowledge",
        title: "PERTEMUAN DENGAN SARJANA",
        narration: "Seorang sarjana menghampiri anda dan bertanya: 'Wahai penuntut ilmu, aktiviti manakah yang paling menyumbang kepada perkembangan pesat ilmu pengetahuan di era ini?'",
        options: [
            { text: "A. Penterjemahan karya ilmiah ke Bahasa Arab (Translation of scholarly works)", correct: true },
            { text: "B. Penutupan institusi pendidikan (Closing educational institutions)", correct: false },
            { text: "C. Menghalang perbincangan saintifik (Preventing scientific discussion)", correct: false },
            { text: "D. Memusnahkan manuskrip purba (Destroying manuscripts)", correct: false }
        ],
        explanation: "Penterjemahan karya ilmiah memainkan peranan yang sangat penting dalam memindahkan ilmu dari pelbagai tamadun luar ke dalam dunia Islam.",
        pos_x: 10, pos_z: -55
    },
    {
        id: 4, type: 'decision', module_id: 5, topic: "astronomy",
        title: "ZAMAN KEEMASAN: ASTRONOMI",
        narration: "Anda menjumpai sebuah Astrolab yang memancarkan cahaya. Apakah kegunaan utama instrumen ini dalam tamadun Islam?",
        options: [
            { text: "A. Alat muzik untuk hiburan istana", correct: false },
            { text: "B. Instrumen falak untuk mengukur bintang dan arah kiblat", correct: true }
        ],
        explanation: "Tepat! Astrolab disempurnakan oleh sarjana Islam untuk ilmu astronomi, pelayaran, dan penentuan waktu ibadah.",
        pos_x: 0, pos_z: -85
    },
    {
        id: 5, type: 'story', module_id: 8,
        title: "KEJATUHAN BAGHDAD (1258 CE)",
        narration: "Suasana suram menyelubungi. Tentera Mongol yang diketuai Hulagu Khan telah mengepung kota. Perpustakaan dimusnahkan dan air sungai Dajlah bertukar hitam kerana dakwat manuskrip. Empayar Abbasiyah akhirnya tumbang.",
        pos_x: 0, pos_z: -150
    }
];

let engine;
let currentActiveNode = null;
let currentNarrationText = "";

document.addEventListener('DOMContentLoaded', () => {
    engine = new AbbasidWorldEngine('canvas-container');
    worldNodes.forEach(node => engine.registerStoryNode(node));

    window.addEventListener('narrative-trigger', (e) => {
        currentActiveNode = e.detail;
        currentNarrationText = currentActiveNode.narration;
        openStoryPanel(currentActiveNode);
    });
});

function openStoryPanel(node) {
    const modal = document.getElementById('story-modal');
    document.getElementById('node-title').innerText = node.title;
    document.getElementById('node-narrative').innerText = `"${node.narration}"`;
    
    const actionsBox = document.getElementById('story-actions');
    const decisionBox = document.getElementById('node-interactive-container');
    const feedbackBox = document.getElementById('node-feedback');
    const btnContinue = document.getElementById('btn-continue');

    // Reset UI
    actionsBox.classList.add('hidden');
    decisionBox.classList.add('hidden');
    feedbackBox.classList.add('hidden');
    btnContinue.classList.add('hidden');
    decisionBox.innerHTML = '';

    if (node.type === 'story') {
        // Paparkan butang [LISTEN], [EXPLORE] untuk Node Cerita
        actionsBox.classList.remove('hidden');
        btnContinue.classList.remove('hidden');
    } 
    else if (node.type === 'decision') {
        // Paparkan soalan A/B/C/D untuk Node Keputusan
        decisionBox.classList.remove('hidden');
        node.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = opt.text;
            btn.onclick = () => handleDecision(opt, btn, node.options);
            decisionBox.appendChild(btn);
        });
    }

    modal.classList.remove('hidden-view');
}

function handleDecision(selectedOpt, btnElement, allOptions) {
    const allBtns = document.querySelectorAll('.choice-btn');
    allBtns.forEach(b => b.disabled = true);

    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');

    if (selectedOpt.correct) {
        btnElement.classList.add('correct');
        feedbackTitle.innerHTML = "CORRECT! <span style='color:#4ECCA3;'>+10 Knowledge Points</span>";
        feedbackTitle.style.color = "#4ECCA3";
        // Panggil API progress.php di sini untuk simpan XP
    } else {
        btnElement.classList.add('wrong');
        feedbackTitle.innerText = "Not quite.";
        feedbackTitle.style.color = "#FF6B6B";
        
        allBtns.forEach((b, idx) => {
            if(allOptions[idx].correct) b.classList.add('correct');
        });
    }

    feedbackDesc.innerText = currentActiveNode.explanation;
    document.getElementById('node-feedback').classList.remove('hidden');
    document.getElementById('btn-continue').classList.remove('hidden');
}

let _engineNarrationAudio = null;

// Fungsi [LISTEN] menggunakan Sebutan Melayu Tulen (Google Malay & Web Speech fallback)
function playNarration() {
    try {
        if (_engineNarrationAudio) {
            _engineNarrationAudio.pause();
            _engineNarrationAudio.src = '';
            _engineNarrationAudio = null;
        }
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();

        const cleanText = (currentNarrationText || '')
            .replace(/\bS\.?A\.?W\.?\b/gi, "Sallallahu 'Alaihi Wasallam")
            .replace(/\bR\.?A\.?\b/gi, "Radhiallahu 'Anhu")
            .replace(/\b(\d+)\s*M\b/gi, '$1 Masihi')
            .replace(/\b(\d+)\s*H\b/gi, '$1 Hijrah')
            .replace(/[•۞\(\)\[\]"“]/g, ' ')
            .trim();

        if (!cleanText) return;

        const url = `api/tts.php?text=${encodeURIComponent(cleanText.slice(0, 200))}&voice=osman`;
        const audio = new Audio(url);
        _engineNarrationAudio = audio;

        const fallback = () => {
            try {
                const utterance = new SpeechSynthesisUtterance(cleanText);
                utterance.lang = 'ms-MY';
                utterance.rate = 0.95;
                const voices = window.speechSynthesis.getVoices();
                const matched = voices.find(v => v.lang && (v.lang === 'ms-MY' || v.lang.startsWith('ms')));
                if (matched) utterance.voice = matched;
                window.speechSynthesis.speak(utterance);
            } catch(e) {}
        };

        audio.onerror = fallback;
        const p = audio.play();
        if (p !== undefined) p.catch(fallback);
    } catch(e) {}
}

function closeStoryPanel() {
    try {
        if (_engineNarrationAudio) {
            _engineNarrationAudio.pause();
            _engineNarrationAudio.src = '';
            _engineNarrationAudio = null;
        }
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } catch(e) {}
    document.getElementById('story-modal').classList.add('hidden-view');
    // Tolak pemain ke belakang sikit supaya kotak tak muncul berulang kali
    engine.player.position.z += 4; 
}