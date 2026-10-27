/**
 * SIRAHABLE — Modul Penilaian Akhir (Final Assessment Engine)
 * Dilengkapi pengocakan rawak soalan & jawapan (Full Randomization), integrasi SFX, dan semakan jawapan teliti.
 */

let finalExamQuestions = [];
let examIndex = 0;
let examScore = 0;
let examTimer = null;
let examTimeLeft = 30;
let userAnswers = [];

// Fungsi Pengocakan Rawak (Fisher-Yates Shuffle)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Persiapkan soalan dan kocak pilihan jawapan (A, B, C, D) serta susunan soalan
function prepareShuffledExam(rawList) {
    const shuffledQuestions = shuffleArray(rawList);
    return shuffledQuestions.map(q => {
        const correctText = q.options[q.correct];
        const shuffledOpts = shuffleArray(q.options);
        const newCorrectIdx = shuffledOpts.indexOf(correctText);
        return {
            ...q,
            options: shuffledOpts,
            correct: newCorrectIdx
        };
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchExamQuestions();
    setupResultNav();
    document.getElementById('btn-next-exam-q')?.addEventListener('click', handleNextQuestion);
});

function loadExamQuestion() {
    if (autoNextExamInterval) {
        clearInterval(autoNextExamInterval);
        autoNextExamInterval = null;
    }
    const qData = finalExamQuestions[examIndex];
    document.getElementById('exam-q-index').innerText = `SOALAN ${examIndex + 1} / ${finalExamQuestions.length}`;
    document.getElementById('exam-topic-tag').innerText = `TOPIK: ${qData.topic}`;
    document.getElementById('exam-question-text').innerText = qData.q;

    const progress = ((examIndex + 1) / finalExamQuestions.length) * 100;
    document.getElementById('exam-progress-fill').style.width = `${progress}%`;
    document.getElementById('exam-feedback-box').classList.add('hidden');

    const grid = document.getElementById('exam-options-grid');
    grid.innerHTML = '';
    const prefixes = ['A', 'B', 'C', 'D'];

    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.index = idx;
        btn.innerHTML = `<span class="opt-prefix">${prefixes[idx]}</span><span class="opt-text">${opt}</span>`;
        btn.addEventListener('click', (e) => selectExamAnswer(e.currentTarget));
        grid.appendChild(btn);
    });

    startExamTimer();
}

const DEFAULT_EXAM_QUESTIONS = [
    {
        topic: "PENUBUHAN & REVOLUSI (750 M)",
        q: "Siapakah tokoh strategik yang memimpin kempen rahsia di wilayah Khurasan bagi menjatuhkan kerajaan Bani Umayyah?",
        rationale: "Abu Muslim al-Khurasani memimpin gerakan bawah tanah di Khurasan dengan menyatukan golongan Mawali yang menuntut keadilan sosial dan cukai.",
        options: ["Abu Muslim al-Khurasani", "Abu al-Abbas As-Saffah", "Harun al-Rashid", "Khalid al-Barmaki"],
        correct: 0
    },
    {
        topic: "KHALIFAH PERTAMA",
        q: "Di manakah Abu al-Abbas As-Saffah diisytiharkan secara rasmi sebagai Khalifah pertama Abbasiyah pada tahun 750 M?",
        rationale: "Pengisytiharan rasmi khalifah pertama dilakukan di Masjid Kufah selepas kemenangan Pertempuran Zab.",
        options: ["Masjid Kufah (Iraq)", "Masjid Umayyah di Damsyik", "Kota Baghdad", "Kota Kaherah"],
        correct: 0
    },
    {
        topic: "PEMBINAAN KOTA BULAT (762 M)",
        q: "Apakah nama rasmi yang dinamakan oleh Khalifah Abu Ja'far al-Mansur bagi kota Baghdad yang dibina berbentuk bulat sepusat?",
        rationale: "Nama rasmi Baghdad ialah Madinat al-Salam (Kota Kedamaian), direka bentuk bulat dengan istana dan masjid agung di tengah-tengahnya.",
        options: ["Madinat al-Salam", "Darul Aman", "Madinat al-Hikmah", "Al-Qahirah"],
        correct: 0
    },
    {
        topic: "GEOGRAFI & PERDAGANGAN",
        q: "Kedudukan Baghdad di antara dua sungai manakah yang memacu kepesatan ekonomi dan pertanian empayar?",
        rationale: "Lembah subur di antara Sungai Dajlah (Tigris) dan Sungai Furat (Euphrates) menjadi nadi pengairan dan laluan kapal perdagangan dunia.",
        options: ["Sungai Dajlah (Tigris) dan Sungai Furat (Euphrates)", "Sungai Nil dan Sungai Jordan", "Sungai Indus dan Sungai Gangga", "Sungai Danube dan Sungai Rhine"],
        correct: 0
    },
    {
        topic: "BAYT AL-HIKMAH & SAINS",
        q: "Apakah sumbangan utama biro penterjemahan di Bayt al-Hikmah semasa era Khalifah Al-Ma'mun?",
        rationale: "Bayt al-Hikmah menterjemah ribuan manuskrip falsafah, perubatan, dan falak dari bahasa Yunani, Sanskrit, dan Parsi ke Bahasa Arab.",
        options: ["Penterjemahan naskhah sains sedunia & akademi penyelidikan pelbagai disiplin", "Mencetak mata wang dinar emas semata-mata", "Pusat latihan tentera laut empayar", "Pusat penyimpanan biji benih gandum"],
        correct: 0
    },
    {
        topic: "MATEMATIK & ALGEBRA",
        q: "Siapakah ilmuwan agung Abbasiyah yang digelar 'Bapa Algebra' dan memperkenalkan angka sifar ke dunia?",
        rationale: "Muhammad bin Musa Al-Khwarizmi menulis Kitab Al-Jabr wa'l-Muqabala yang merintis disiplin algebra dan sistem algoritma moden.",
        options: ["Muhammad bin Musa Al-Khwarizmi", "Ibnu Sina (Avicenna)", "Al-Battani", "Al-Kindi"],
        correct: 0
    },
    {
        topic: "PERUBATAN KLINIKAL",
        q: "Karya 'Kitab Al-Hawi Fi Al-Tibb' yang merintis diagnosis pembezaan campak dan cacar ditulis oleh:",
        rationale: "Abu Bakar Al-Razi (Rhazes) merupakan doktor agung hospital Baghdad yang terkenal dengan kaedah klinikal dan penggunaan benang pembedahan.",
        options: ["Abu Bakar Al-Razi (Rhazes)", "Hunayn ibn Ishaq", "Ibnu Rushd (Averroes)", "Al-Farabi"],
        correct: 0
    },
    {
        topic: "KEMEROSOTAN POLITIK",
        q: "Apakah faktor utama yang melenyapkan kuasa mutlak Khalifah bermula era Samarra (861 M)?",
        rationale: "Campur tangan berlebihan jeneral tentera pengawal Turki di istana Samarra menyebabkan perebutan kuasa dan perpecahan dinasti wilayah.",
        options: ["Campur tangan keterlaluan pembesar tentera pengawal dalam urusan takhta", "Penolakan rakyat terhadap aktiviti keilmuan", "Ketiadaan sumber bekalan air di Iraq", "Serangan lanun di Laut Mediterranean"],
        correct: 0
    },
    {
        topic: "KEJATUHAN BAGHDAD (1258 M)",
        q: "Siapakah panglima tentera Mongol yang mengepung dan memusnahkan kota Baghdad serta khazanah perpustakaannya pada 1258 M?",
        rationale: "Hulagu Khan mengetuai pencerobohan tentera Mongol yang membakar perpustakaan Baghdad dan membunuh Khalifah Al-Musta'sim.",
        options: ["Hulagu Khan", "Genghis Khan", "Kublai Khan", "Batu Khan"],
        correct: 0
    },
    {
        topic: "IKTIBAR KELANGSUNGAN UMMAH",
        q: "Apakah iktibar terpenting yang dipelajari daripada kejatuhan Baghdad bagi kelangsungan sesebuah negara moden?",
        rationale: "Perpecahan dalaman dan kelemahan pertahanan meruntuhkan tamadun; kemakmuran memerlukan integrasi akhlak, perpaduan, dan penguasaan ilmu.",
        options: ["Perpaduan ummah, integriti tadbir urus, dan kesiapsiagaan pertahanan adalah benteng utama tamadun", "Penyelidikan sains perlu dihentikan untuk mengelak dicemburui", "Pertahanan ketenteraan tidak perlu jika ekonomi sudah kaya", "Mengasingkan diri sepenuhnya daripada hubungan diplomasi luar"],
        correct: 0
    }
];

async function fetchExamQuestions() {
    try {
        const response = await fetch('api/get_challenge_questions.php');
        const result = await response.json();
        let raw = DEFAULT_EXAM_QUESTIONS;
        if (result.status === 'success' && result.data && result.data.length > 0) {
            raw = result.data;
        }
        finalExamQuestions = prepareShuffledExam(raw);
        loadExamQuestion();
    } catch (error) {
        console.warn('Menggunakan set soalan sandaran silibus rasmi:', error);
        finalExamQuestions = prepareShuffledExam(DEFAULT_EXAM_QUESTIONS);
        loadExamQuestion();
    }
}

function startExamTimer() {
    clearInterval(examTimer);
    examTimeLeft = 30;
    document.getElementById('exam-timer-sec').innerText = examTimeLeft;
    examTimer = setInterval(() => {
        examTimeLeft--;
        document.getElementById('exam-timer-sec').innerText = examTimeLeft;
        if (examTimeLeft <= 0) {
            clearInterval(examTimer);
            selectExamAnswer(null); // Tamat masa automatik
        }
    }, 1000);
}

let autoNextExamInterval = null;

function selectExamAnswer(btn) {
    clearInterval(examTimer);
    if (autoNextExamInterval) {
        clearInterval(autoNextExamInterval);
        autoNextExamInterval = null;
    }

    const idx = btn ? parseInt(btn.dataset.index) : -1;
    const qData = finalExamQuestions[examIndex];
    const allBtns = document.querySelectorAll('#exam-options-grid .option-btn');

    allBtns.forEach(b => b.disabled = true);

    userAnswers.push({ questionIndex: examIndex, selectedIndex: idx });

    const isCorrect = (idx === qData.correct);
    if (isCorrect) {
        if (btn) btn.classList.add('correct');
        examScore++;
        if (window.SirahAudio) window.SirahAudio.correct();
    } else {
        if (btn) btn.classList.add('wrong');
        const correctBtn = document.querySelector(`#exam-options-grid .option-btn[data-index='${qData.correct}']`);
        if (correctBtn) correctBtn.classList.add('correct');
        if (window.SirahAudio) window.SirahAudio.wrong();
    }

    const fbBox = document.getElementById('exam-feedback-box');
    const fbText = document.getElementById('exam-status-text');
    const nextBtn = document.getElementById('btn-next-exam-q');

    if (fbText) fbText.innerText = qData.rationale;
    if (fbBox) {
        fbBox.classList.remove('hidden');
        setTimeout(() => {
            fbBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // Auto-advance selepas 3.5 saat supaya peperiksaan tidak pernah beku
    let autoSec = 3;
    if (nextBtn) nextBtn.innerText = `Soalan Seterusnya (${autoSec}s) →`;

    autoNextExamInterval = setInterval(() => {
        autoSec--;
        if (nextBtn) {
            nextBtn.innerText = autoSec > 0 ? `Soalan Seterusnya (${autoSec}s) →` : `Memuatkan...`;
        }
        if (autoSec <= 0) {
            clearInterval(autoNextExamInterval);
            autoNextExamInterval = null;
            handleNextQuestion();
        }
    }, 1000);
}

function handleNextQuestion() {
    if (autoNextExamInterval) {
        clearInterval(autoNextExamInterval);
        autoNextExamInterval = null;
    }
    const nextBtn = document.getElementById('btn-next-exam-q');
    if (nextBtn) nextBtn.innerText = "Soalan Seterusnya →";

    examIndex++;
    if (examIndex < finalExamQuestions.length) {
        loadExamQuestion();
    } else {
        showExamResults();
    }
}

function showExamResults() {
    document.getElementById('final-exam-card').classList.add('hidden-view');
    document.getElementById('final-result-card').classList.remove('hidden-view');

    const percent = Math.round((examScore / finalExamQuestions.length) * 100);
    document.getElementById('exam-final-percent').innerText = `${percent}%`;
    document.getElementById('exam-correct-ratio').innerText = `${examScore} / ${finalExamQuestions.length}`;
    document.getElementById('exam-xp-earned').innerText = `+${examScore * 25} XP`;

    let grade = "MUMTAZ";
    if (percent < 50) grade = "RASIB";
    else if (percent < 70) grade = "JAYYID";
    else if (percent < 85) grade = "JAYYID JIDDAN";

    document.getElementById('exam-final-grade').innerText = grade;

    if (percent >= 70 && window.SirahAudio) {
        window.SirahAudio.victory();
    }

    saveExamResultsToAPI(percent, examScore * 25);
}

function setupResultNav() {
    document.getElementById('btn-view-answers')?.addEventListener('click', showAnswerReview);
    document.getElementById('btn-back-to-results')?.addEventListener('click', () => {
        document.getElementById('final-review-card').classList.add('hidden-view');
        document.getElementById('final-result-card').classList.remove('hidden-view');
    });
}

function showAnswerReview() {
    document.getElementById('final-result-card').classList.add('hidden-view');
    document.getElementById('final-review-card').classList.remove('hidden-view');

    const reviewArea = document.getElementById('review-content-area');
    reviewArea.innerHTML = '';

    finalExamQuestions.forEach((qData, index) => {
        const userAnswer = userAnswers.find(a => a.questionIndex === index);
        const selectedIdx = userAnswer ? userAnswer.selectedIndex : -1;
        const isCorrect = selectedIdx === qData.correct;

        let optionsHTML = '';
        const prefixes = ['A', 'B', 'C', 'D'];
        qData.options.forEach((opt, optIdx) => {
            let stateClass = '';
            if (optIdx === qData.correct) {
                stateClass = 'correct';
            } else if (optIdx === selectedIdx && !isCorrect) {
                stateClass = 'wrong';
            }
            optionsHTML += `<li class="${stateClass}"><span class="opt-prefix">${prefixes[optIdx]}</span> ${opt}</li>`;
        });

        const reviewBlock = `
            <div class="review-item">
                <div class="review-q-header">
                    <span class="q-badge">SOALAN ${index + 1}</span>
                    <span class="q-result-tag ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? 'TEPAT' : 'SALAH'}</span>
                </div>
                <p class="review-q-text">${qData.q}</p>
                <ul class="review-options">
                    ${optionsHTML}
                </ul>
                <div class="review-rationale">
                    <strong>Hujah Sejarah:</strong> ${qData.rationale}
                </div>
            </div>
        `;

        reviewArea.innerHTML += reviewBlock;
    });
}

function saveExamResultsToAPI(score, xp_earned) {
    fetch('api/save_challenge.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            score: score,
            xp_earned: xp_earned
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== 'success') {
            console.warn('Simpanan skor cabaran:', data.message);
        }
    })
    .catch(error => {
        console.warn('Luar talian - skor cabaran disimpan secara tempatan.');
    });
}