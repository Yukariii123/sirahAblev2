class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
    }

    playTone(freq, type, duration, delay = 0) {
        if (!this.enabled) return;
        this.init();
        setTimeout(() => {
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (e) {}
        }, delay);
    }

    correct() {
        if (window.SirahAudio) {
            window.SirahAudio.correct();
        } else {
            this.playTone(523.25, 'sine', 0.15, 0);
            this.playTone(659.25, 'sine', 0.15, 100);
            this.playTone(783.99, 'sine', 0.25, 200);
            this.playTone(1046.50, 'sine', 0.35, 300);
        }
    }

    wrong() {
        if (window.SirahAudio) {
            window.SirahAudio.wrong();
        } else {
            this.playTone(220.00, 'sawtooth', 0.2, 0);
            this.playTone(185.00, 'sawtooth', 0.3, 150);
        }
    }

    click() {
        if (window.SirahAudio) {
            window.SirahAudio.click();
        } else {
            this.playTone(800, 'triangle', 0.05);
        }
    }

    powerup() {
        if (window.SirahAudio) {
            window.SirahAudio.warHorn();
        } else {
            this.playTone(400, 'sine', 0.1, 0);
            this.playTone(800, 'sine', 0.2, 80);
        }
    }

    victory() {
        if (window.SirahAudio) {
            window.SirahAudio.victory();
        } else {
            [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
                this.playTone(freq, 'triangle', 0.3, idx * 120);
            });
        }
    }
}

const sfx = new SoundFX();

const quizDatabase = {
    modul_1: {
        title: "Penubuhan Dinasti Abbasiyah",
        desc: "Revolusi Abbasiyah, kejatuhan Umayyah, dan kepimpinan khalifah awal.",
        questions: [
            {
                q: "Siapakah khalifah pertama yang mengasaskan pemerintahan Khilafah Abbasiyah pada tahun 750 M?",
                options: [
                    "Abu al-Abbas As-Saffah",
                    "Abu Ja'far al-Mansur",
                    "Harun al-Rashid",
                    "Al-Ma'mun"
                ],
                correct: 0,
                explanation: "Abu al-Abbas As-Saffah mengetuai gerakan menjatuhkan Dinasti Umayyah dan dilantik sebagai khalifah pertama Abbasiyah di Kufah."
            },
            {
                q: "Di manakah pusat pentadbiran para khalifah awal sebelum Kota Baghdad dibangunkan?",
                options: [
                    "Kufah dan Al-Anbar",
                    "Madinah Munawwarah",
                    "Damsyik",
                    "Kaherah"
                ],
                correct: 0,
                explanation: "Sebelum terbinanya Baghdad oleh Khalifah Al-Mansur, khalifah awal mentadbir dari wilayah Kufah, Al-Hashimiyyah, dan Al-Anbar."
            },
            {
                q: "Pertempuran penentu manakah pada tahun 750 M yang menumbangkan tentera Marwan II dan menamatkan Dinasti Umayyah?",
                options: [
                    "Pertempuran Sungai Zab",
                    "Pertempuran Yarmuk",
                    "Pertempuran Qadisiyyah",
                    "Pertempuran Nahrawan"
                ],
                correct: 0,
                explanation: "Pertempuran Sungai Zab (Zab Besar) merupakan pertempuran kemuncak di mana tentera revolusi Abbasiyah mencapai kemenangan mutlak."
            },
            {
                q: "Siapakah tokoh strategik yang mengetuai gerakan rahsia dan ketenteraan Abbasiyah di wilayah Khurasan?",
                options: [
                    "Abu Muslim al-Khurasani",
                    "Ibrahim al-Imam",
                    "Tariq bin Ziyad",
                    "Khalid al-Barmaki"
                ],
                correct: 0,
                explanation: "Abu Muslim al-Khurasani berjaya menyatukan golongan Mawali dan penduduk timur untuk melancarkan penentangan terbuka."
            }
        ]
    },
    modul_2: {
        title: "Kota Bulat Madinat al-Salam",
        desc: "Seni bina agung Kota Baghdad oleh Khalifah Abu Ja'far al-Mansur.",
        questions: [
            {
                q: "Apakah faktor geografi utama pemilihan tapak pembinaan Kota Baghdad berhampiran Sungai Tigris?",
                options: [
                    "Kedudukan strategik laluan perdagangan dunia & kemudahan bekalan air Sungai Dajlah-Furat",
                    "Kawasan pergunungan untuk kubu pertahanan",
                    "Kawasan padang pasir yang tandus untuk tentera berkuda",
                    "Berdekatan dengan pelabuhan Laut Mediterranean"
                ],
                correct: 0,
                explanation: "Kedudukan di antara Sungai Tigris (Dajlah) dan Euphrates (Furat) menjadikan Baghdad hab perdagangan tersubur di dunia."
            },
            {
                q: "Apakah nama rasmi yang diberikan oleh Khalifah Al-Mansur kepada Kota Baghdad?",
                options: [
                    "Madinat al-Salam (Kota Kedamaian)",
                    "Madinat al-Hikmah (Kota Kebijaksanaan)",
                    "Darul Aman",
                    "Al-Qahirah"
                ],
                correct: 0,
                explanation: "Nama rasmi Baghdad ialah Madinat al-Salam yang melambangkan keharmonian, keadilan, dan kestabilan pentadbiran empayar."
            },
            {
                q: "Apakah ciri keunikan reka bentuk perancangan bandar Kota Baghdad pada era Khalifah Al-Mansur?",
                options: [
                    "Reka bentuk bulatan sepusat dengan Istana Emas dan Masjid Jamek di titik tengah",
                    "Dibina memanjang di sepanjang tebing pantai lautan",
                    "Dibina dalam bentuk piramid bertingkat",
                    "Tiada tembok pertahanan luar bagi memudahkan kemasukan"
                ],
                correct: 0,
                explanation: "Bentuk bulat konsentrik dengan tembok berkembar dan empat pintu gerbang menjadikannya kubu kebal pertahanan zaman pertengahan."
            },
            {
                q: "Berikut adalah antara empat pintu gerbang utama Kota Baghdad KECUALI:",
                options: [
                    "Pintu Iskandariah",
                    "Pintu Syam",
                    "Pintu Khurasan",
                    "Pintu Basrah dan Pintu Kufah"
                ],
                correct: 0,
                explanation: "Empat pintu gerbang Baghdad dinamakan sempena destinasi laluan empayar: Pintu Syam (Utara), Khurasan (Timur), Basrah (Selatan), dan Kufah (Barat)."
            }
        ]
    },
    modul_3: {
        title: "Bayt al-Hikmah & Sains Islam",
        desc: "Gerakan penterjemahan agung, matematik algebra, dan balai cerap falak.",
        questions: [
            {
                q: "Apakah peranan utama Bayt al-Hikmah semasa zaman keemasan Khalifah Harun al-Rashid dan Al-Ma'mun?",
                options: [
                    "Pusat penterjemahan karya ilmu, perpustakaan agung, dan akademi sains",
                    "Pusat latihan tentera berkuda elit empayar",
                    "Pusat pencetakan mata wang dinar semata-mata",
                    "Mahkamah kehakiman tertinggi wilayah"
                ],
                correct: 0,
                explanation: "Bayt al-Hikmah merupakan institusi keilmuan agung yang menterjemahkan manuskrip Yunani, Sanskrit, dan Parsi ke Bahasa Arab."
            },
            {
                q: "Tokoh matematik manakah yang digelar sebagai 'Bapa Algebra' menerusi karyanya Al-Jabr?",
                options: [
                    "Muhammad bin Musa Al-Khwarizmi",
                    "Ibnu Sina (Avicenna)",
                    "Al-Battani",
                    "Al-Kindi"
                ],
                correct: 0,
                explanation: "Al-Khwarizmi bertugas di Bayt al-Hikmah dan mengasaskan ilmu algebra serta memperkenalkan sistem angka perpuluhan ke dunia."
            },
            {
                q: "Alat falak apakah yang disempurnakan ilmuwan Islam untuk mengukur waktu solat dan arah kiblat?",
                options: [
                    "Astrolab (Al-Asturlab)",
                    "Kompas Magnetik Eropah",
                    "Teleskop Optik",
                    "Jam Pasir"
                ],
                correct: 0,
                explanation: "Astrolab disempurnakan oleh sarjana astronomi Islam untuk menghitung posisi bintang, kalendar hijrah, dan arah kiblat."
            },
            {
                q: "Apakah karya perubatan agung Abu Bakar Al-Razi yang menghimpunkan rawatan klinikal dan perbezaan penyakit berjangkit?",
                options: [
                    "Kitab Al-Hawi Fi Al-Tibb",
                    "Al-Qanun Fi Al-Tibb",
                    "Kitab Al-Shifa",
                    "Muqaddimah"
                ],
                correct: 0,
                explanation: "Kitab Al-Hawi karya Al-Razi merupakan ensiklopedia perubatan komprehensif yang menjadi rujukan hospital di dunia Islam dan Barat."
            }
        ]
    },
    modul_4: {
        title: "Cabaran & Pergolakan Politik",
        desc: "Krisis dalaman, kuasa tentera pengawal, dan kerajaan wilayah kecil.",
        questions: [
            {
                q: "Apakah punca utama kelemahan kuasa khalifah pada fasa kedua pemerintahan Abbasiyah?",
                options: [
                    "Campur tangan para pembesar tentera pengawal dan perebutan kuasa dalaman",
                    "Rakyat Baghdad menolak aktiviti perdagangan",
                    "Ketiadaan sumber makanan dan air di sekitar Iraq",
                    "Gempa bumi yang meruntuhkan kota"
                ],
                correct: 0,
                explanation: "Bermula era Samarra (861 M), tentera pengawal mula mencampuri urusan istana sehingga kuasa mutlak khalifah merosot."
            },
            {
                q: "Kelemahan kawalan kerajaan pusat di Baghdad menyebabkan kemunculan:",
                options: [
                    "Dinasti wilayah bebas (seperti Tuluniyah, Samaniyah, dan Buwayhiyah) yang tidak lagi taat setia mutlak",
                    "Penyerahan takhta kepada kerajaan Rom",
                    "Perpindahan ibu kota ke Madinah",
                    "Penutupan semua pelabuhan di Teluk Parsi"
                ],
                correct: 0,
                explanation: "Kemerosotan kuasa khalifah memberi ruang kepada dinasti serantau menguasai wilayah masing-masing dan menahan kutipan cukai."
            },
            {
                q: "Apakah faktor ekonomi yang mempercepatkan kemerosotan perbendaharaan Baitulmal Abbasiyah?",
                options: [
                    "Beban perbelanjaan menyara tentera upahan dan kerosakan sistem saliran pertanian akibat perang saudara",
                    "Penutupan semua ladang gandum di Iraq",
                    "Larangan perniagaan emas dan perak",
                    "Kekurangan kapal dagang antarabangsa"
                ],
                correct: 0,
                explanation: "Kos ketenteraan yang melonjak dan kerosakan terusan pengairan menjejaskan hasil pertanian yang merupakan sumber cukai utama negara."
            }
        ]
    },
    modul_5: {
        title: "Kejatuhan Baghdad 1258 M",
        desc: "Pengepungan Mongol oleh Hulagu Khan dan iktibar kepada tamadun.",
        questions: [
            {
                q: "Siapakah panglima tentera Mongol yang mengepung dan meruntuhkan Baghdad pada 1258 M?",
                options: [
                    "Hulagu Khan",
                    "Genghis Khan",
                    "Kublai Khan",
                    "Timur Lenk"
                ],
                correct: 0,
                explanation: "Hulagu Khan mengetuai tentera Mongol menawan Baghdad pada Februari 1258 M dan menamatkan pemerintahan khalifah di sana."
            },
            {
                q: "Tragedi kemusnahan khazanah ilmu di Bayt al-Hikmah digambarkan dalam catatan sejarah melalui:",
                options: [
                    "Jutaan manuskrip dicampak ke dalam Sungai Dajlah sehingga airnya bertukar hitam pekat kerana dakwat",
                    "Kitab-kitab dihantar pulang ke Mongolia untuk arkib diraja",
                    "Manuskrip disimpan di dalam gua rahsia padang pasir",
                    "Semua buku dibeli oleh pedagang Eropah"
                ],
                correct: 0,
                explanation: "Tentera Mongol membuang berjuta-juta manuskrip agung ke dalam Sungai Dajlah, melenyapkan khazanah ilmu yang dikumpulkan berabad-abad."
            },
            {
                q: "Apakah iktibar terpenting daripada peristiwa kejatuhan Khilafah Abbasiyah?",
                options: [
                    "Perpaduan ummah, integriti kepimpinan, dan kesiapsiagaan pertahanan adalah kunci kelangsungan tamadun",
                    "Kemajuan teknologi sahaja memadai tanpa perpaduan rakyat",
                    "Pertahanan negara tidak penting jika ekonomi kukuh",
                    "Aktiviti keilmuan perlu dihentikan ketika krisis"
                ],
                correct: 0,
                explanation: "Perpecahan dalaman dan kelemahan disiplin kepimpinan menjadi asbab utama kejatuhan mana-mana tamadun agung."
            },
            {
                q: "Bagaimanakah legasi keilmuan Abbasiyah terus memberi impak positif kepada dunia selepas 1258 M?",
                options: [
                    "Naskhah ilmu yang diselamatkan merentas ke Andalus dan Eropah, mencetuskan era Renaissance dan sains moden",
                    "Ilmu tamadun Islam hilang sepenuhnya tanpa sebarang kesan",
                    "Tamadun dunia kembali ke zaman kegelapan secara kekal",
                    "Dunia menolak sistem perubatan dan matematik algebra"
                ],
                correct: 0,
                explanation: "Karya sarjana Islam seperti Al-Khwarizmi, Al-Razi, dan Al-Battani menjadi pemangkin kepada kebangkitan intelektual Eropah (Renaissance)."
            }
        ]
    }
};

let currentModuleKey = 'modul_1';
let activeQuestions = [];
let currentQuestionIndex = 0;
let userScore = 0;
let userXP = 100;
let streakCount = 0;
let maxStreak = 0;
let timerInterval = null;
let timeLeft = 20;
let isAnswered = false;
let currentOptionButtons = [];
let used5050 = false;
let usedTime = false;
let autoNextInterval = null;

// Fungsi Kocak Array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

document.addEventListener('DOMContentLoaded', () => {
    renderModuleSelection();
    setupEventListeners();
});

function switchView(viewId) {
    document.querySelectorAll('.quiz-container').forEach(el => {
        el.classList.add('hidden-view');
        el.classList.remove('active-view');
    });
    document.getElementById(viewId).classList.remove('hidden-view');
    document.getElementById(viewId).classList.add('active-view');
}

function renderModuleSelection() {
    const container = document.getElementById('module-selection-container');
    container.innerHTML = '';

    Object.keys(quizDatabase).forEach((key, idx) => {
        const mod = quizDatabase[key];
        const card = document.createElement('div');
        card.className = 'module-quiz-card academic-glass';
        card.innerHTML = `
            <div>
                <div class="mq-header">
                    <span class="mq-icon" style="font-size:0.75rem; font-weight:800; letter-spacing:1.5px; color:var(--color-gold); border:1px solid rgba(212,175,55,0.4); padding:3px 8px; border-radius:4px;">MODUL 0${idx + 1}</span>
                    <span class="mq-count">${mod.questions.length} Cabaran</span>
                </div>
                <h3 class="mq-title">${mod.title}</h3>
                <p class="mq-desc">${mod.desc}</p>
            </div>
            <div class="btn-start-mod">Masuk Cabaran Modul →</div>
        `;
        card.addEventListener('click', () => {
            sfx.click();
            startQuizSession(key);
        });
        container.appendChild(card);
    });
}

function startQuizSession(moduleKey) {
    currentModuleKey = moduleKey;
    currentQuestionIndex = 0;
    userScore = 0;
    streakCount = 0;
    maxStreak = 0;
    used5050 = false;
    usedTime = false;

    // Kocak turutan soalan secara rawak untuk setiap sesi baharu
    activeQuestions = shuffleArray(quizDatabase[moduleKey].questions);

    document.getElementById('btn-lifeline-5050').disabled = false;
    document.getElementById('btn-lifeline-time').disabled = false;

    updateStreakUI();
    switchView('quiz-play-screen');
    loadQuestion();
}

function loadQuestion() {
    if (autoNextInterval) {
        clearInterval(autoNextInterval);
        autoNextInterval = null;
    }
    isAnswered = false;
    const moduleData = quizDatabase[currentModuleKey];
    const qData = activeQuestions[currentQuestionIndex];
    const totalQ = activeQuestions.length;

    document.getElementById('current-q-index').innerText = `SOALAN ${currentQuestionIndex + 1} / ${totalQ}`;
    document.getElementById('q-category-tag').innerText = moduleData.title.toUpperCase();
    document.getElementById('question-text').innerText = qData.q;

    const multiplierEl = document.getElementById('combo-multiplier');
    if (streakCount >= 2) {
        multiplierEl.classList.remove('hidden');
        multiplierEl.innerText = `${streakCount}X BONUS!`;
    } else {
        multiplierEl.classList.add('hidden');
    }

    const progressPercent = ((currentQuestionIndex + 1) / totalQ) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progressPercent}%`;

    document.getElementById('academic-rationale').classList.add('hidden');

    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    const prefixes = ['A', 'B', 'C', 'D'];
    currentOptionButtons = [];

    let optionObjects = qData.options.map((text, idx) => {
        return { text: text, isCorrect: (idx === qData.correct) };
    });

    // Kocak pilihan jawapan secara rawak
    optionObjects = shuffleArray(optionObjects);

    optionObjects.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.isCorrect = opt.isCorrect;
        
        btn.innerHTML = `
            <span class="opt-prefix">${prefixes[index]}</span>
            <span class="opt-text">${opt.text}</span>
        `;
        btn.addEventListener('click', () => handleOptionSelect(opt.isCorrect, btn));
        optionsGrid.appendChild(btn);
        currentOptionButtons.push(btn);
    });

    startTimer(20);
}

// Logik Pemasa
function startTimer(seconds) {
    clearInterval(timerInterval);
    timeLeft = seconds;
    const timerDisplay = document.getElementById('timer-sec');
    const timerBadge = document.getElementById('quiz-timer');
    timerDisplay.innerText = timeLeft;
    timerBadge.classList.remove('urgent');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 5) {
            timerBadge.classList.add('urgent');
            sfx.playTone(600, 'triangle', 0.05);
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!isAnswered) handleTimeOut();
        }
    }, 1000);
}

function handleOptionSelect(isCorrect, selectedBtn) {
    if (isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);

    const qData = activeQuestions[currentQuestionIndex];
    currentOptionButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        sfx.correct();
        selectedBtn.classList.add('correct');
        userScore++;
        streakCount++;
        if (streakCount > maxStreak) maxStreak = streakCount;

        const earnedXP = 15 + (streakCount * 5);
        userXP += earnedXP;
        document.getElementById('quiz-user-xp').innerText = `${userXP} XP`;

        triggerConfetti(0.3);
        showFeedback(true, qData.explanation);
    } else {
        sfx.wrong();
        selectedBtn.classList.add('wrong');
        streakCount = 0;
        // Paparkan butang jawapan yang betul
        currentOptionButtons.forEach(btn => {
            if (btn.dataset.isCorrect === "true") btn.classList.add('correct');
        });
        showFeedback(false, qData.explanation);
    }

    updateStreakUI();
}

// Jika Kehabisan Masa
function handleTimeOut() {
    isAnswered = true;
    sfx.wrong();
    const qData = activeQuestions[currentQuestionIndex];
    
    currentOptionButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.isCorrect === "true") btn.classList.add('correct');
    });
    
    streakCount = 0;
    updateStreakUI();
    showFeedback(false, `Masa telah tamat! ${qData.explanation}`);
}

function updateStreakUI() {
    const streakVal = document.getElementById('streak-val');
    const streakCounter = document.getElementById('streak-counter');
    streakVal.innerText = `${streakCount} STREAK`;

    if (streakCount >= 2) {
        streakCounter.classList.add('pulse');
    } else {
        streakCounter.classList.remove('pulse');
    }
}

function showFeedback(isCorrect, explanation) {
    const rationaleBox = document.getElementById('academic-rationale');
    const title = document.getElementById('rationale-title');
    const text = document.getElementById('rationale-text');
    const icon = document.getElementById('rationale-status-icon');
    const nextBtnText = document.getElementById('btn-next-text');

    if (isCorrect) {
        if (title) {
            title.innerText = "Jawapan Tepat! (Mumtaz)";
            title.style.color = "#4ECCA3";
        }
        if (icon) icon.innerText = "✓";
    } else {
        if (title) {
            title.innerText = "Analisis Fakta Akademik";
            title.style.color = "#FFD1D1";
        }
        if (icon) icon.innerText = "!";
    }

    if (text) text.innerText = explanation;

    if (rationaleBox) {
        rationaleBox.classList.remove('hidden');
        // Skrol lancar ke kotak hujah agar kelihatan sepenuhnya pada skrin komputer / laptop
        setTimeout(() => {
            rationaleBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // Auto-advance selepas 3.5 saat supaya kuiz tidak pernah beku (freeze)
    let autoSeconds = 3;
    if (nextBtnText) nextBtnText.innerText = `SOALAN SETERUSNYA (${autoSeconds}s)`;

    if (autoNextInterval) clearInterval(autoNextInterval);
    autoNextInterval = setInterval(() => {
        autoSeconds--;
        if (nextBtnText) {
            nextBtnText.innerText = autoSeconds > 0 ? `SOALAN SETERUSNYA (${autoSeconds}s)` : `MEMUATKAN...`;
        }
        if (autoSeconds <= 0) {
            clearInterval(autoNextInterval);
            autoNextInterval = null;
            advanceNextQuestion();
        }
    }, 1000);
}

function advanceNextQuestion() {
    if (autoNextInterval) {
        clearInterval(autoNextInterval);
        autoNextInterval = null;
    }
    const nextBtnText = document.getElementById('btn-next-text');
    if (nextBtnText) nextBtnText.innerText = "SOALAN SETERUSNYA";

    const totalQ = activeQuestions.length;
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQ) {
        loadQuestion();
    } else {
        showQuizResults();
    }
}

function setupEventListeners() {
    document.getElementById('btn-next-question').addEventListener('click', () => {
        sfx.click();
        advanceNextQuestion();
    });

    document.getElementById('btn-retry-quiz').addEventListener('click', () => {
        sfx.click();
        startQuizSession(currentModuleKey);
    });

    document.getElementById('btn-back-modules').addEventListener('click', () => {
        sfx.click();
        switchView('quiz-selection-screen');
    });

    document.getElementById('btn-lifeline-5050').addEventListener('click', function() {
        if (used5050 || isAnswered) return;
        used5050 = true;
        this.disabled = true;
        sfx.powerup();

        let wrongButtons = currentOptionButtons.filter(btn => btn.dataset.isCorrect === "false");
        wrongButtons = shuffleArray(wrongButtons);

        wrongButtons.forEach((btn, idx) => {
            if (idx < 2) {
                btn.classList.add('disabled-5050');
            }
        });
    });

    document.getElementById('btn-lifeline-time').addEventListener('click', function() {
        if (usedTime || isAnswered) return;
        usedTime = true;
        this.disabled = true;
        sfx.powerup();
        timeLeft += 10;
        document.getElementById('timer-sec').innerText = timeLeft;
    });

    document.getElementById('btn-sound-toggle').addEventListener('click', function() {
        sfx.enabled = !sfx.enabled;
        this.innerText = sfx.enabled ? 'AUDIO: ON' : 'AUDIO: OFF';
    });
}

// Paparan Skrin Keputusan Akhir
function showQuizResults() {
    switchView('quiz-result-screen');
    const totalQ = activeQuestions.length || quizDatabase[currentModuleKey].questions.length;
    const percent = Math.round((userScore / totalQ) * 100);
    const xpGained = (userScore * 15) + (maxStreak * 10);

    document.getElementById('final-score-percent').innerText = `${percent}%`;
    document.getElementById('final-xp-gained').innerText = `+${xpGained} XP`;
    document.getElementById('final-streak-max').innerText = `${maxStreak} Max`;

    let grade = "MUMTAZ";
    let badge = "KECEMERLANGAN";
    if (percent < 50) {
        grade = "RASIB";
        badge = "ULANG KAJI";
    } else if (percent < 70) {
        grade = "JAYYID";
        badge = "PENCAPAIAN BAIK";
    } else if (percent < 85) {
        grade = "JAYYID JIDDAN";
        badge = "PENCAPAIAN TINGGI";
    }

    document.getElementById('final-grade').innerText = grade;
    document.getElementById('result-badge-icon').innerText = badge;

    if (percent >= 70) {
        sfx.victory();
        triggerConfetti(1.5);
    }

    syncScoreWithBackend(percent, xpGained);
}

// Enjin Konfeti Kanvas Sebenar
function triggerConfetti(scale = 1.0) {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#D4AF37', '#FDE047', '#10B981', '#3B82F6', '#EF4444', '#EC4899', '#FFFFFF'];
    const particleCount = Math.floor(60 * scale);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: canvas.width * 0.5 + (Math.random() - 0.5) * 200,
            y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 14 * scale,
            vy: (Math.random() * -12 - 4) * scale,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    let animationFrame;
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeCount = 0;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // gravity
            p.vx *= 0.98; // friction
            p.rotation += p.rotationSpeed;
            p.opacity -= 0.008;

            if (p.opacity > 0 && p.y < canvas.height + 20) {
                activeCount++;
                ctx.save();
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                ctx.restore();
            }
        });

        if (activeCount > 0) {
            animationFrame = requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationFrame);
        }
    }
    render();
}

function syncScoreWithBackend(score, xp) {
    let dbModuleId = 1; 
    if (currentModuleKey === 'modul_1') dbModuleId = 1;
    else if (currentModuleKey === 'modul_2') dbModuleId = 2;
    else if (currentModuleKey === 'modul_3') dbModuleId = 3;
    else if (currentModuleKey === 'modul_4') dbModuleId = 4;
    else if (currentModuleKey === 'modul_5') dbModuleId = 5;

    fetch('api/progress.php?action=save_score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module_id: dbModuleId, score: score, xp: xp })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log("Berjaya: XP direkodkan!");
        }
    })
    .catch(err => {
        console.log("Modul Offline - Skor tidak disimpan ke pelayan.");
    });
}