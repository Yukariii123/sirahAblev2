// Assets/js/belajar.js
// EDUSYS — Pusat Nota Pintar (SirahAble V2)
// Menyelaras 5 Modul Silibus Lengkap, Suara TV3 Melayu, Flashcard, Kuiz & Simpanan Kemajuan DB

const STORAGE_PREFIX = 'edusys_belajar_';
let currentModuleId = 1;

// ==========================================
// DATA SILIBUS LENGKAP 5 BAB SEJARAH ABBASIYAH
// ==========================================
const MODULE_CHAPTERS = {
    1: {
        id: 1,
        title: "Sejarah Kebangkitan Bani Abbasiyah",
        metaAuthor: "Ustaz Ahmad",
        metaTime: "3 Minit",
        paragraphs: [
            "Kerajaan Bani Abbasiyah diasaskan pada tahun 750 Masihi selepas berjaya menumbangkan kerajaan Bani Umayyah. Gerakan revolusi ini bermula secara rahsia di wilayah Khurasan, dipimpin oleh seorang tokoh strategik bernama Abu Muslim al-Khurasani.",
            "Kelemahan pentadbiran Umayyah pada fasa akhir, termasuk isu diskriminasi terhadap golongan Mawali (orang Islam bukan Arab) dan cukai yang tidak adil, telah menyemarakkan api kemarahan rakyat. Golongan Abbasiyah mengambil kesempatan ini dengan melaungkan slogan mengembalikan hak kekhalifahan kepada keluarga Nabi Muhammad SAW melalui keturunan bapa saudara baginda, Al-Abbas.",
            "Selepas mencapai kemenangan mutlak dalam Pertempuran Zab, Abu al-Abbas As-Saffah telah diisytiharkan sebagai Khalifah pertama, menandakan bermulanya sebuah era baharu yang kelak akan memimpin dunia dalam bidang sains dan falsafah."
        ],
        aiSummary: [
            { title: 'Tarikh Penubuhan', text: 'Diasaskan pada 750 Masihi selepas kejatuhan Umayyah.' },
            { title: 'Punca Kejayaan', text: 'Menggunakan sentimen ketidakpuasan hati golongan Mawali dan kelemahan pentadbiran Umayyah.' },
            { title: 'Tokoh Penting', text: 'Abu Muslim al-Khurasani (Ketua Revolusi) dan Abu al-Abbas As-Saffah (Khalifah Pertama).' }
        ],
        flashcards: [
            { front: 'Pada tahun berapakah Kerajaan Abbasiyah diasaskan?', back: '750 Masihi selepas Pertempuran Zab.' },
            { front: 'Siapakah Khalifah pertama Abbasiyah?', back: 'Abu al-Abbas As-Saffah.' },
            { front: 'Di manakah gerakan rahsia revolusi bermula?', back: 'Di wilayah Khurasan dipimpin Abu Muslim al-Khurasani.' }
        ],
        quiz: [
            {
                q: 'Pada tahun berapakah Kerajaan Bani Abbasiyah diasaskan?',
                options: ['632 Masihi', '750 Masihi', '850 Masihi', '1258 Masihi'],
                correct: 1
            },
            {
                q: 'Siapakah tokoh strategik yang memimpin gerakan revolusi Abbasiyah di Khurasan?',
                options: ['Abu al-Abbas As-Saffah', 'Harun al-Rasyid', 'Abu Muslim al-Khurasani', 'Al-Ma\'mun'],
                correct: 2
            },
            {
                q: 'Kemenangan dalam pertempuran manakah yang membawa kepada pengisytiharan Khalifah Abbasiyah yang pertama?',
                options: ['Pertempuran Badar', 'Pertempuran Zab', 'Pertempuran Karbala', 'Pertempuran Yarmuk'],
                correct: 1
            }
        ]
    },
    2: {
        id: 2,
        title: "Madinat al-Salam: Keagungan Kota Bulat Baghdad",
        metaAuthor: "Ustaz Ahmad",
        metaTime: "4 Minit",
        paragraphs: [
            "Pada tahun 762 Masihi, Khalifah kedua Abu Ja'far al-Mansur telah membuat keputusan bersejarah untuk memindahkan pusat pentadbiran kerajaan dari Kufah ke lokasi baharu yang lebih strategik di tebing Sungai Dajlah (Tigris), lalu menamakan kota ini sebagai Madinat al-Salam (Kota Kedamaian) atau lebih dikenali sebagai Baghdad.",
            "Kota Baghdad dibina dengan reka bentuk unik berbentuk bulat sepusat yang dikelilingi oleh tembok pertahanan kukuh setinggi puluhan meter dan empat pintu gerbang utama yang menghadap ke Kufah, Basrah, Khurasan, dan Syam. Di tengah-tengah kota terletak Istana Pintu Emas (Bab al-Dhahab) dan Masjid Agung Baghdad.",
            "Kedudukan geografi Baghdad yang terletak di persimpangan laluan perdagangan maritim dan darat antara Timur dan Barat menjadikan kota ini pusat ekonomi global yang amat kaya, menarik pedagang dari China, India, Byzantium, dan Afrika untuk berniaga sutera, rempah, kertas, dan tembikar."
        ],
        aiSummary: [
            { title: 'Pengasas Kota', text: 'Khalifah Abu Ja\'far al-Mansur pada tahun 762 Masihi.' },
            { title: 'Reka Bentuk Unik', text: 'Kota Bulat sepusat dengan empat pintu gerbang pertahanan dan istana di pusat kota.' },
            { title: 'Kelebihan Geografi', text: 'Terletak di tebing Sungai Dajlah (Tigris) sebagai persimpangan perdagangan sutera dan rempah dunia.' }
        ],
        flashcards: [
            { front: 'Siapakah pengasas Kota Baghdad?', back: 'Khalifah Abu Ja\'far al-Mansur pada tahun 762 Masihi.' },
            { front: 'Apakah nama rasmi Kota Baghdad ketika dibina?', back: 'Madinat al-Salam (Kota Kedamaian).' },
            { front: 'Apakah keunikan seni bina Baghdad?', back: 'Reka bentuk bulat sepusat berdinding ganda dengan 4 pintu gerbang utama.' }
        ],
        quiz: [
            {
                q: 'Siapakah Khalifah yang mengasaskan pembinaan Kota Bulat Baghdad?',
                options: ['Abu al-Abbas As-Saffah', 'Abu Ja\'far al-Mansur', 'Harun al-Rashid', 'Al-Mu\'tasim'],
                correct: 1
            },
            {
                q: 'Apakah nama rasmi yang diberikan oleh Khalifah kepada Kota Baghdad?',
                options: ['Darul Aman', 'Madinat al-Salam', 'Al-Madinah Al-Munawwarah', 'Samarra'],
                correct: 1
            },
            {
                q: 'Mengapakah lokasi Baghdad dipilih di tebing Sungai Dajlah (Tigris)?',
                options: ['Kerana cuaca sejuk bersalji', 'Kedudukan strategik perdagangan dan pengairan subur', 'Jauh dari sumber air minuman', 'Kawasan perlombongan emas'],
                correct: 1
            }
        ]
    },
    3: {
        id: 3,
        title: "Era Keemasan Ilmu & Baitul Hikmah",
        metaAuthor: "Ustaz Ahmad",
        metaTime: "4 Minit",
        paragraphs: [
            "Zaman pemerintahan Khalifah Harun al-Rashid dan puteranya Al-Ma'mun menandakan kemuncak Zaman Keemasan Tamadun Islam. Baginda mengasaskan dan memperluaskan Bayt al-Hikmah (Rumah Kebijaksanaan) di Baghdad, sebuah akademi penyelidikan, perpustakaan gergasi, dan pusat penterjemahan karya teragung di dunia.",
            "Gerakan penterjemahan besar-besaran dibiayai dengan lumayan oleh istana, di mana para penterjemah seperti Hunayn ibn Ishaq dihadiahkan emas setimbang dengan berat buku yang diterjemahkan. Khazanah sains Yunani, Parsi, India, dan Mesir purba diterjemah ke Bahasa Arab dan disempurnakan dengan penemuan baharu.",
            "Zaman ini melahirkan sarjana tersohor seperti Al-Khwarizmi yang merintis bidang Algebra dan angka sifar, Al-Kindi bapa falsafah Arab, Al-Razi pakar klinikal perubatan, dan keluarga Banu Musa yang mencipta mesin mekanikal dan alat falak astrolab."
        ],
        aiSummary: [
            { title: 'Institusi Utama', text: 'Bayt al-Hikmah (Rumah Kebijaksanaan) yang menggabungkan perpustakaan dan makmal kajian.' },
            { title: 'Dasar Galakan Ilmu', text: 'Penterjemah dibayar emas seberat buku yang berjaya diterjemahkan ke Bahasa Arab.' },
            { title: 'Tokoh & Disiplin', text: 'Al-Khwarizmi (Algebra), Al-Razi (Perubatan), Hunayn ibn Ishaq (Penterjemahan).' }
        ],
        flashcards: [
            { front: 'Apakah institusi ilmu terpenting era Harun al-Rashid & Al-Ma\'mun?', back: 'Bayt al-Hikmah (Rumah Kebijaksanaan) di Baghdad.' },
            { front: 'Siapakah tokoh yang digelar Bapa Algebra?', back: 'Muhammad bin Musa Al-Khwarizmi.' },
            { front: 'Bagaimanakah Khalifah Al-Ma\'mun menghargai penterjemah?', back: 'Menghadiahkan emas seberat naskhah buku yang diterjemahkan.' }
        ],
        quiz: [
            {
                q: 'Apakah nama institusi penterjemahan dan akademi ilmu terunggul di Baghdad?',
                options: ['Darul Hadith', 'Bayt al-Hikmah', 'Al-Azhar', 'Nizamiyyah'],
                correct: 1
            },
            {
                q: 'Siapakah tokoh sarjana yang mengasaskan disiplin ilmu Algebra melalui karyanya?',
                options: ['Ibnu Sina', 'Muhammad bin Musa Al-Khwarizmi', 'Al-Farabi', 'Al-Ghazali'],
                correct: 1
            },
            {
                q: 'Era pemerintahan siapakah yang diiktiraf sebagai kemuncak Zaman Keemasan Abbasiyah?',
                options: ['Marwan II', 'Harun al-Rashid & Al-Ma\'mun', 'Al-Musta\'sim', 'Yazid bin Muawiyah'],
                correct: 1
            }
        ]
    },
    4: {
        id: 4,
        title: "Cabaran Politik & Pergolakan Kuasa Wilayah",
        metaAuthor: "Ustaz Ahmad",
        metaTime: "3 Minit",
        paragraphs: [
            "Bermula tahun 861 Masihi selepas pembunuhan Khalifah Al-Mutawakkil, Khilafah Abbasiyah memasuki era kemerosotan politik yang dikenali sebagai era kegoncangan Samarra. Pengaruh jeneral tentera pengawal berbangsa Turki semakin dominan sehingga mampu melantik dan memecat para khalifah mengikut kehendak mereka.",
            "Kelemahan kuasa pusat di Baghdad membuka ruang kepada kemunculan dinasti-dinasti tempatan yang memerintah secara autonomi di wilayah pinggiran, seperti Dinasti Thahiriyyah di Khurasan, Tuluniyyah di Mesir, Samaniyyah di Transoxiana, dan kemudian penguasaan Dinasti Buwaihiyyah di Baghdad.",
            "Meskipun kuasa politik dan ketenteraan khalifah semakin terhad sebagai simbol keagamaan semata-mata, kegiatan keilmuan dan penulisan ensiklopedia madrasah seperti Madrasah Nizamiyyah yang diasaskan oleh Nizam al-Mulk terus subur di pelbagai bandar Islam."
        ],
        aiSummary: [
            { title: 'Punca Pergolakan', text: 'Campur tangan berlebihan jeneral tentera pengawal Turki di istana bermula 861 Masihi.' },
            { title: 'Kemunculan Wilayah Autonomi', text: 'Kekuasaan khalifah mengecil dan digantikan oleh dinasti tempatan seperti Buwaihiyyah dan Seljuk.' },
            { title: 'Kelangsungan Ilmu', text: 'Aktiviti intelektual diteruskan menerusi institusi wakaf dan madrasah Nizamiyyah.' }
        ],
        flashcards: [
            { front: 'Apakah peristiwa yang memulakan era kemerosotan politik Abbasiyah?', back: 'Pembunuhan Khalifah Al-Mutawakkil pada tahun 861 Masihi.' },
            { front: 'Siapakah golongan tentera yang mendominasi istana Samarra?', back: 'Jeneral tentera pengawal berbangsa Turki.' },
            { front: 'Apakah institusi pendidikan tinggi yang diasaskan pada era Seljuk?', back: 'Madrasah Nizamiyyah oleh Wazir Nizam al-Mulk.' }
        ],
        quiz: [
            {
                q: 'Apakah faktor utama yang melemahkan kuasa mutlak Khalifah bermula era Samarra?',
                options: ['Serangan lanun di laut', 'Campur tangan berlebihan pegawai tentera pengawal istana', 'Ketiadaan ilmuwan sains', 'Rakyat berpindah ke Eropah'],
                correct: 1
            },
            {
                q: 'Siapakah wazir terkenal yang mengasaskan rangkaian Madrasah Nizamiyyah?',
                options: ['Abu Muslim', 'Nizam al-Mulk', 'Khalid al-Barmaki', 'Ibnu Fadlan'],
                correct: 1
            },
            {
                q: 'Apakah status kuasa Khalifah semasa era penguasaan dinasti tempatan?',
                options: ['Kuasa mutlak seluruh dunia', 'Simbol perpaduan agama dan keagamaan sahaja', 'Tiada khalifah langsung dilantik', 'Menjadi maharaja tentera Rom'],
                correct: 1
            }
        ]
    },
    5: {
        id: 5,
        title: "Pencapaian Sains & Detik Pengepungan Baghdad 1258 M",
        metaAuthor: "Ustaz Ahmad",
        metaTime: "4 Minit",
        paragraphs: [
            "Sepanjang lima abad pemerintahan Abbasiyah, warisan sains Islam mencapai tahap kecemerlangan yang belum pernah disaksikan oleh dunia. Ilmu falak dipacu dengan penciptaan balai cerap Shammasiyyah di Baghdad dan Maragha, manakala bidang farmasi dan perubatan hospital (Bimaristan) melahirkan piawaian etika kedoktoran moden.",
            "Pada awal tahun 1258 Masihi, awan hitam menyelubungi Baghdad apabila gerombolan tentera Mongol di bawah pimpinan Hulagu Khan mengepung kota itu. Keengganan Khalifah Al-Musta'sim menyerah kalah dan kelemahan pertahanan tentera Baghdad membawa kepada serangan runtuh yang memusnahkan kota.",
            "Kejatuhan Baghdad pada 1258 Masihi menandakan berakhirnya Khilafah Abbasiyah di Iraq. Berjuta-juta manuskrip berharga di Bayt al-Hikmah telah dicampakkan ke dalam Sungai Dajlah sehingga airnya dilaporkan bertukar warna menjadi hitam dakwat, satu kerugian khazanah ilmu terbesar dalam sejarah tamadun manusia."
        ],
        aiSummary: [
            { title: 'Warisan Sains', text: 'Balai cerap astronomi, instrumen astrolab, dan sistem hospital klinikal (Bimaristan).' },
            { title: 'Tahun Kejatuhan', text: '1258 Masihi di bawah serangan tentera Mongol pimpinan Hulagu Khan.' },
            { title: 'Tragedi Khazanah Ilmu', text: 'Kemusnahan perpustakaan Bayt al-Hikmah dan jutaan naskhah manuskrip dibuang ke Sungai Dajlah.' }
        ],
        flashcards: [
            { front: 'Siapakah panglima Mongol yang meruntuhkan Baghdad pada 1258 M?', back: 'Hulagu Khan.' },
            { front: 'Siapakah Khalifah Abbasiyah terakhir di Baghdad?', back: 'Khalifah Al-Musta\'sim Billah.' },
            { front: 'Apakah simbol kemusnahan khazanah ilmu semasa kejatuhan Baghdad?', back: 'Air Sungai Dajlah menjadi hitam akibat ribuan manuskrip dicampak.' }
        ],
        quiz: [
            {
                q: 'Pada tahun berapakah Kota Baghdad ditakluk oleh tentera Mongol pimpinan Hulagu Khan?',
                options: ['750 Masihi', '1099 Masihi', '1258 Masihi', '1453 Masihi'],
                correct: 2
            },
            {
                q: 'Siapakah Khalifah Abbasiyah terakhir yang memerintah di Baghdad sebelum kejatuhannya?',
                options: ['Harun al-Rashid', 'Al-Mansur', 'Al-Musta\'sim Billah', 'Al-Wathiq'],
                correct: 2
            },
            {
                q: 'Apakah tragedi paling menyedihkan kepada warisan keilmuan semasa kejatuhan Baghdad?',
                options: ['Semua emas dicuri ke laut', 'Manuskrip Bayt al-Hikmah dimusnahkan dan dibuang ke Sungai Dajlah', 'Sungai Tigris kering sepenuhnya', 'Sekolah ditutup selama seminggu'],
                correct: 1
            }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    checkSecurity();
    setupModuleSidebar();
    loadModuleContent(currentModuleId);
    setupTextToSpeech();
    setupAISummary();
    setupFocusMode();
    setupReadingProgress();
    setupFontControls();
    setupSearch();
    setupHighlighting();
    setupPersonalNotes();
    setupFlashcards();
    setupNoteUploader();
    setupStudyTimer();
    refreshIlmuMeter();
    setupSirahAudioUI();
});

// ==========================================
// 0. FUNGSI KESELAMATAN (SECURITY CHECK) & SYNC DB
// ==========================================
function checkSecurity() {
    fetch('api/get_dashboard.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error' || data.status === 'unauthorized') {
                alert("Akses Ditolak! Sila log masuk terlebih dahulu.");
                window.location.href = 'index.html';
            } else {
                console.log("Akses disahkan untuk:", data.user.username);
                // Segerakkan status modul selesai dari DB
                if (data.modules && Array.isArray(data.modules)) {
                    data.modules.forEach(m => {
                        if (m.is_completed == 1) {
                            localStorage.setItem(moduleDoneKey(m.id), 'done');
                            markModuleDone(m.id);
                        }
                    });
                    refreshIlmuMeter();
                }
            }
        })
        .catch(() => {
            window.location.href = 'index.html';
        });
}

// ==========================================
// 1. "BACA UNTUK SAYA" — SUARA PEMBACA BERITA TV3 (OSMAN & YASMIN NEURAL)
// ==========================================
class TV3MalayNarrator {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
        this.activeElement = null;
        this.onStateChange = null;
        this.selectedVoice = 'osman'; // 'osman' (Ustaz Osman TV3) atau 'yasmin' (Yasmin TV3)
        this.cachedVoice = null;

        if ('speechSynthesis' in window) {
            const findMalayVoice = () => {
                const voices = window.speechSynthesis.getVoices();
                this.cachedVoice = voices.find(v => v.lang && (v.lang === 'ms-MY' || v.lang.startsWith('ms'))) ||
                                   voices.find(v => v.name && (v.name.includes('Yasmin') || v.name.includes('Osman') || (v.name.includes('Malay') && !v.name.includes('Indonesian'))));
            };
            findMalayVoice();
            window.speechSynthesis.onvoiceschanged = findMalayVoice;
        }
    }

    setVoice(voice) {
        this.selectedVoice = voice;
    }

    normalizeText(text) {
        if (!text) return '';
        return text
            .replace(/\bS\.?A\.?W\.?\b/gi, "Sallallahu 'Alaihi Wasallam")
            .replace(/\bR\.?A\.?\b/gi, "Radhiallahu 'Anhu")
            .replace(/\bA\.?S\.?\b/gi, "'Alaihissalam")
            .replace(/\b(\d+)\s*M\b/gi, '$1 Masihi')
            .replace(/\b(\d+)\s*H\b/gi, '$1 Hijrah')
            .replace(/Mawali\s*\(([^)]+)\)/gi, 'Mawali, iaitu $1')
            .replace(/[•۞\(\)\[\]"“]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    stop() {
        this.isPlaying = false;
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.src = '';
            this.currentAudio = null;
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        this.clearHighlight();
        if (this.onStateChange) this.onStateChange(false);
    }

    clearHighlight() {
        if (this.activeElement) {
            this.activeElement.classList.remove('tts-active-reading');
            this.activeElement = null;
        }
    }

    setHighlight(element) {
        this.clearHighlight();
        if (element) {
            this.activeElement = element;
            element.classList.add('tts-active-reading');
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    playParagraphs(paragraphs, onFinish) {
        this.stop();
        if (!paragraphs || paragraphs.length === 0) return;

        this.isPlaying = true;
        if (this.onStateChange) this.onStateChange(true);

        const items = [];
        paragraphs.forEach((p, pIndex) => {
            const raw = p.innerText || p.textContent;
            const normalized = this.normalizeText(raw);
            if (normalized.length > 2) {
                items.push({
                    text: normalized,
                    element: p,
                    paragraphIndex: pIndex
                });
            }
        });

        if (items.length === 0) {
            this.stop();
            return;
        }

        let index = 0;

        const playNext = () => {
            if (!this.isPlaying) return;
            if (index >= items.length) {
                this.stop();
                if (onFinish) onFinish();
                return;
            }

            const item = items[index];
            this.setHighlight(item.element);
            index++;

            let audioUrl = '';
            // Khusus Bab 1 Osman mempunyai fail MP3 studio pra-jana
            if (currentModuleId === 1 && this.selectedVoice === 'osman' && item.paragraphIndex >= 0 && item.paragraphIndex <= 2) {
                audioUrl = `Assets/audio/bab1_p${item.paragraphIndex + 1}.mp3`;
            } else {
                audioUrl = `api/tts.php?text=${encodeURIComponent(item.text)}&voice=${encodeURIComponent(this.selectedVoice)}`;
            }

            const audio = new Audio(audioUrl);
            this.currentAudio = audio;

            let failed = false;
            audio.onended = () => {
                if (this.isPlaying) playNext();
            };

            const triggerFallback = () => {
                if (failed || !this.isPlaying) return;
                failed = true;
                this.fallbackSpeak(item.text, () => {
                    if (this.isPlaying) playNext();
                });
            };

            audio.onerror = triggerFallback;

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(triggerFallback);
            }
        };

        playNext();
    }

    fallbackSpeak(text, onComplete) {
        if (!('speechSynthesis' in window)) {
            if (onComplete) onComplete();
            return;
        }

        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = 'ms-MY';
        utt.rate = 0.95;
        utt.pitch = 1.0;

        if (this.cachedVoice) {
            utt.voice = this.cachedVoice;
        }

        utt.onend = () => { if (onComplete) onComplete(); };
        utt.onerror = () => { if (onComplete) onComplete(); };

        window.speechSynthesis.speak(utt);
    }
}

let globalNarrator = null;

function setupTextToSpeech() {
    const btnRead = document.getElementById('btn-read');
    const noteContent = document.getElementById('note-content');
    const voiceSelect = document.getElementById('voice-select');
    if (!btnRead || !noteContent) return;

    if (!globalNarrator) {
        globalNarrator = new TV3MalayNarrator();
    }

    if (voiceSelect) {
        voiceSelect.addEventListener('change', () => {
            globalNarrator.setVoice(voiceSelect.value);
            if (globalNarrator.isPlaying) {
                globalNarrator.stop();
            }
        });
        globalNarrator.setVoice(voiceSelect.value);
    }

    globalNarrator.onStateChange = (playing) => {
        if (playing) {
            btnRead.innerHTML = '⏹ Hentikan Suara';
            btnRead.classList.add('reading-active');
        } else {
            btnRead.innerHTML = '🔊 Baca Teks';
            btnRead.classList.remove('reading-active');
        }
    };

    btnRead.addEventListener('click', () => {
        if (globalNarrator.isPlaying) {
            globalNarrator.stop();
        } else {
            const paragraphs = Array.from(noteContent.querySelectorAll('p'));
            globalNarrator.playParagraphs(paragraphs);
        }
    });
}

// ==========================================
// 2. PEMUATAN KANDUNGAN MODUL SECARA DINAMIK
// ==========================================
function loadModuleContent(modId) {
    const data = MODULE_CHAPTERS[modId] || MODULE_CHAPTERS[1];
    currentModuleId = data.id;

    if (globalNarrator && globalNarrator.isPlaying) {
        globalNarrator.stop();
    }

    // Tajuk dan Meta
    const titleEl = document.getElementById('note-title');
    if (titleEl) titleEl.textContent = data.title;

    // Perenggan Kandungan
    const contentEl = document.getElementById('note-content');
    if (contentEl) {
        contentEl.innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    // Reset Rumusan AI
    const summaryBox = document.getElementById('ai-summary-box');
    const btnAI = document.getElementById('btn-ai-summary');
    if (summaryBox) summaryBox.style.display = 'none';
    if (btnAI) {
        btnAI.innerHTML = "Rumusan AI";
        btnAI.disabled = false;
    }
    window._flashcardsReady = false;

    // Kad Imbas Header
    const flashHead = document.querySelector('.flash-modal-head span');
    if (flashHead) flashHead.textContent = `Kad Imbas — Bab ${currentModuleId}`;

    // Nota Peribadi
    const noteArea = document.getElementById('personal-note-input');
    if (noteArea) {
        noteArea.value = localStorage.getItem(personalNotesKey()) || '';
    }

    // Muat semula penanda / highlight
    reapplyPersistedHighlights();

    // Muat semula Kuiz
    setupQuiz();

    // Scroll ke atas dengan lancar
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mainkan tema kesan bunyi latar bab jika auto-SFX aktif
    if (window.SirahAudio) {
        window.SirahAudio.playChapterTheme(currentModuleId);
    }
}

// ==========================================
// 3. RUMUSAN AI PINTAR
// ==========================================
function setupAISummary() {
    const btnAI = document.getElementById('btn-ai-summary');
    const summaryBox = document.getElementById('ai-summary-box');
    const bulletList = document.getElementById('ai-bullets');
    if (!btnAI || !summaryBox || !bulletList) return;

    btnAI.addEventListener('click', () => {
        if (btnAI.disabled) return;
        btnAI.innerHTML = "AI Menganalisis...";
        btnAI.disabled = true;

        const currentData = MODULE_CHAPTERS[currentModuleId] || MODULE_CHAPTERS[1];

        setTimeout(() => {
            summaryBox.style.display = 'block';
            bulletList.innerHTML = currentData.aiSummary
                .map(item => `<li><strong>${item.title}:</strong> ${item.text}</li>`)
                .join('');

            btnAI.innerHTML = "Rumusan AI Selesai ✓";
            summaryBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

            window._flashcardsReady = true;
        }, 800);
    });
}

// ==========================================
// 4. "MOD FOKUS / GELAP"
// ==========================================
function setupFocusMode() {
    const btnFocus = document.getElementById('btn-focus');
    if (!btnFocus) return;

    let isFocus = localStorage.getItem(STORAGE_PREFIX + 'focus') === '1';
    applyFocus(isFocus);

    btnFocus.addEventListener('click', () => {
        isFocus = !isFocus;
        applyFocus(isFocus);
        localStorage.setItem(STORAGE_PREFIX + 'focus', isFocus ? '1' : '0');
    });

    function applyFocus(state) {
        document.body.classList.toggle('focus-mode', state);
        btnFocus.innerHTML = state ? "Matikan Mod Fokus" : "Mod Fokus";
    }
}

// ==========================================
// 5. BAR KEMAJUAN BACAAN (TOP RAIL)
// ==========================================
function setupReadingProgress() {
    const rail = document.getElementById('reading-rail');
    const content = document.getElementById('note-content');
    if (!rail || !content) return;

    window.addEventListener('scroll', () => {
        const rect = content.getBoundingClientRect();
        const total = rect.height - window.innerHeight + 200;
        const scrolled = Math.min(Math.max(-rect.top + 200, 0), total);
        const pct = total > 0 ? (scrolled / total) * 100 : 0;
        rail.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
}

// ==========================================
// 6. KAWALAN SAIZ TEKS
// ==========================================
function setupFontControls() {
    const key = STORAGE_PREFIX + 'font_scale';
    let scale = parseFloat(localStorage.getItem(key)) || 1;
    applyScale();

    const incBtn = document.getElementById('font-inc');
    const decBtn = document.getElementById('font-dec');

    if (incBtn) {
        incBtn.addEventListener('click', () => {
            scale = Math.min(scale + 0.1, 1.4);
            applyScale();
        });
    }

    if (decBtn) {
        decBtn.addEventListener('click', () => {
            scale = Math.max(scale - 0.1, 0.85);
            applyScale();
        });
    }

    function applyScale() {
        document.documentElement.style.setProperty('--font-scale', scale.toFixed(2));
        localStorage.setItem(key, scale);
    }
}

// ==========================================
// 7. CARIAN DALAM NOTA
// ==========================================
function setupSearch() {
    const input = document.getElementById('note-search');
    const countEl = document.getElementById('search-count');
    const content = document.getElementById('note-content');
    if (!input || !content) return;

    let debounceTimer;

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = input.value.trim();
            clearHits();
            if (!query) {
                if (countEl) countEl.textContent = '';
                return;
            }
            const hits = markMatches(content, query);
            if (countEl) countEl.textContent = `${hits} dijumpai`;
            if (hits > 0) {
                const first = content.querySelector('mark.hit');
                if (first) {
                    first.classList.add('current');
                    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }, 250);
    });

    function clearHits() {
        content.querySelectorAll('mark.hit').forEach(m => {
            m.replaceWith(document.createTextNode(m.textContent));
        });
        content.normalize();
    }

    function markMatches(node, term) {
        let count = 0;
        const lower = term.toLowerCase();

        function walk(current) {
            if (current.nodeType === 3) {
                const text = current.nodeValue;
                const idx = text.toLowerCase().indexOf(lower);
                if (idx !== -1) {
                    const before = text.slice(0, idx);
                    const match = text.slice(idx, idx + term.length);
                    const after = text.slice(idx + term.length);

                    const mark = document.createElement('mark');
                    mark.className = 'hit';
                    mark.textContent = match;

                    const frag = document.createDocumentFragment();
                    if (before) frag.appendChild(document.createTextNode(before));
                    frag.appendChild(mark);
                    if (after) frag.appendChild(document.createTextNode(after));

                    current.replaceWith(frag);
                    count++;
                }
            } else if (current.nodeType === 1 && current.nodeName !== 'MARK' && !current.classList.contains('highlight')) {
                Array.from(current.childNodes).forEach(walk);
            }
        }

        walk(node);
        return count;
    }
}

// ==========================================
// 8. SOROTAN TEKS (HIGHLIGHTING)
// ==========================================
function highlightStorageKey() {
    return STORAGE_PREFIX + 'hl_mod' + currentModuleId;
}

function setupHighlighting() {
    const content = document.getElementById('note-content');
    const popover = document.getElementById('hl-popover');
    const makeBtn = document.getElementById('hl-make');
    const countEl = document.getElementById('highlight-count');
    if (!content || !popover || !makeBtn) return;

    document.addEventListener('selectionchange', () => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !content.contains(sel.anchorNode)) {
            popover.style.display = 'none';
            return;
        }

        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        popover.style.display = 'flex';
        popover.style.top = (window.scrollY + rect.top - 42) + 'px';
        popover.style.left = (window.scrollX + rect.left) + 'px';

        makeBtn.onclick = () => {
            try {
                const span = document.createElement('span');
                span.className = 'highlight';
                span.title = 'Klik dua kali untuk buang tanda';
                range.surroundContents(span);
                span.addEventListener('dblclick', () => {
                    span.replaceWith(document.createTextNode(span.textContent));
                    persistHighlights();
                    updateHighlightCount();
                });
                persistHighlights();
                updateHighlightCount();
            } catch (e) {
                console.warn('Tidak dapat menanda pilihan merentasi elemen berbeza.');
            }
            popover.style.display = 'none';
            sel.removeAllRanges();
        };
    });

    document.addEventListener('mousedown', (e) => {
        if (!popover.contains(e.target)) popover.style.display = 'none';
    });

    function updateHighlightCount() {
        const n = content.querySelectorAll('.highlight').length;
        if (countEl) countEl.textContent = `${n} penanda`;
    }
}

function persistHighlights() {
    const content = document.getElementById('note-content');
    if (!content) return;
    const texts = Array.from(content.querySelectorAll('.highlight')).map(el => el.textContent);
    localStorage.setItem(highlightStorageKey(), JSON.stringify(texts));
}

function reapplyPersistedHighlights() {
    const saved = JSON.parse(localStorage.getItem(highlightStorageKey()) || '[]');
    const countEl = document.getElementById('highlight-count');
    if (countEl) countEl.textContent = `${saved.length} penanda`;
    if (!saved.length) return;

    const content = document.getElementById('note-content');
    if (!content) return;

    saved.forEach(text => {
        if (!text) return;
        wrapFirstMatch(content, text);
    });

    function wrapFirstMatch(node, text) {
        for (const child of Array.from(node.childNodes)) {
            if (child.nodeType === 3 && child.nodeValue.includes(text)) {
                const idx = child.nodeValue.indexOf(text);
                const before = child.nodeValue.slice(0, idx);
                const after = child.nodeValue.slice(idx + text.length);
                const span = document.createElement('span');
                span.className = 'highlight';
                span.title = 'Klik dua kali untuk buang tanda';
                span.textContent = text;
                span.addEventListener('dblclick', () => {
                    span.replaceWith(document.createTextNode(span.textContent));
                    persistHighlights();
                });
                const frag = document.createDocumentFragment();
                if (before) frag.appendChild(document.createTextNode(before));
                frag.appendChild(span);
                if (after) frag.appendChild(document.createTextNode(after));
                child.replaceWith(frag);
                return true;
            } else if (child.nodeType === 1 && child.className !== 'highlight') {
                if (wrapFirstMatch(child, text)) return true;
            }
        }
        return false;
    }
}

// ==========================================
// 9. NOTA PERIBADI
// ==========================================
function personalNotesKey() {
    return STORAGE_PREFIX + 'note_mod' + currentModuleId;
}

function setupPersonalNotes() {
    const textarea = document.getElementById('personal-note-input');
    const status = document.getElementById('note-save-status');
    if (!textarea) return;

    let saveTimeout;
    textarea.value = localStorage.getItem(personalNotesKey()) || '';

    textarea.addEventListener('input', () => {
        if (status) status.textContent = 'Menyimpan…';
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            localStorage.setItem(personalNotesKey(), textarea.value);
            if (status) {
                status.textContent = 'Disimpan ✓';
                setTimeout(() => { if (status.textContent === 'Disimpan ✓') status.textContent = ''; }, 1800);
            }
        }, 500);
    });
}

// ==========================================
// 10. KAD IMBAS (FLASHCARDS)
// ==========================================
function setupFlashcards() {
    const openBtn = document.getElementById('btn-flashcards');
    const overlay = document.getElementById('flash-overlay');
    const closeBtn = document.getElementById('close-flash');
    const card = document.getElementById('flashcard');
    const front = document.getElementById('flash-front');
    const back = document.getElementById('flash-back');
    const counter = document.getElementById('flash-counter');
    const prevBtn = document.getElementById('flash-prev');
    const nextBtn = document.getElementById('flash-next');

    if (!openBtn || !overlay) return;

    let idx = 0;

    openBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
        idx = 0;
        render();
    });

    closeBtn.addEventListener('click', () => overlay.style.display = 'none');
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });

    card.addEventListener('click', () => {
        const curData = MODULE_CHAPTERS[currentModuleId] || MODULE_CHAPTERS[1];
        if (!curData.flashcards || !curData.flashcards.length) return;
        card.classList.toggle('flipped');
        if (window.SirahAudio) window.SirahAudio.pageTurn();
    });

    prevBtn.addEventListener('click', () => {
        const curData = MODULE_CHAPTERS[currentModuleId] || MODULE_CHAPTERS[1];
        idx = (idx - 1 + curData.flashcards.length) % curData.flashcards.length;
        render();
        if (window.SirahAudio) window.SirahAudio.pageTurn();
    });

    nextBtn.addEventListener('click', () => {
        const curData = MODULE_CHAPTERS[currentModuleId] || MODULE_CHAPTERS[1];
        idx = (idx + 1) % curData.flashcards.length;
        render();
        if (window.SirahAudio) window.SirahAudio.pageTurn();
    });

    function render() {
        card.classList.remove('flipped');
        const curData = MODULE_CHAPTERS[currentModuleId] || MODULE_CHAPTERS[1];
        const cards = curData.flashcards || [];

        if (cards.length === 0) {
            front.textContent = 'Tiada kad imbas untuk bab ini.';
            back.textContent = '';
            counter.textContent = '0 / 0';
            return;
        }

        const item = cards[idx];
        front.textContent = item.front;
        back.textContent = item.back;
        counter.textContent = `${idx + 1} / ${cards.length}`;
    }
}

// ==========================================
// 11. KUIZ RINGKAS BAB & SIMPAN SKOR KE DB
// ==========================================
function quizStorageKey() {
    return STORAGE_PREFIX + 'quiz_mod' + currentModuleId;
}

function setupQuiz() {
    const root = document.getElementById('quiz-root');
    if (!root) return;
    renderQuiz(root);
}

function renderQuiz(root) {
    root.innerHTML = '';
    const currentData = MODULE_CHAPTERS[currentModuleId] || MODULE_CHAPTERS[1];
    const rawQuiz = currentData.quiz || [];
    // Rawakkan susunan soalan
    const quizList = [...rawQuiz].sort(() => Math.random() - 0.5);

    let score = 0;
    let answered = 0;

    quizList.forEach((item, qIndex) => {
        const card = document.createElement('div');
        card.className = 'quiz-card';

        const qEl = document.createElement('div');
        qEl.className = 'quiz-q';
        qEl.textContent = `${qIndex + 1}. ${item.q}`;
        card.appendChild(qEl);

        const optsWrap = document.createElement('div');
        optsWrap.className = 'quiz-options';

        // Rawakkan pilihan jawapan
        const mappedOptions = item.options.map((optText, origIdx) => ({
            text: optText,
            isCorrect: origIdx === item.correct
        })).sort(() => Math.random() - 0.5);

        mappedOptions.forEach((opt) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt';
            btn.type = 'button';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => {
                Array.from(optsWrap.children).forEach(b => b.disabled = true);
                if (opt.isCorrect) {
                    btn.classList.add('correct');
                    score++;
                    if (window.SirahAudio) window.SirahAudio.correct();
                } else {
                    btn.classList.add('wrong');
                    // Serlahkan jawapan sebenar
                    Array.from(optsWrap.children).forEach((b, i) => {
                        if (mappedOptions[i].isCorrect) b.classList.add('correct');
                    });
                    if (window.SirahAudio) window.SirahAudio.wrong();
                }
                answered++;
                if (answered === quizList.length) {
                    finishQuiz(root, score, quizList.length);
                }
            });
            optsWrap.appendChild(btn);
        });

        card.appendChild(optsWrap);
        root.appendChild(card);
    });
}

function finishQuiz(root, score, total) {
    const passed = score >= Math.ceil(total * 0.6);

    const resultEl = document.createElement('div');
    resultEl.className = 'quiz-result';
    resultEl.innerHTML = `
        Skor anda: ${score} / ${total}<br>
        <span style="font-family:'Plus Jakarta Sans'; font-size:.85rem; color:var(--muted);">
            ${passed ? 'Tahniah! Bab ini ditandakan selesai & rekod disimpan ke pangkalan data (+40 XP).' : 'Cuba lagi untuk kukuhkan kefahaman anda.'}
        </span><br>
        <button class="btn-retry">Cuba Lagi</button>
    `;
    root.appendChild(resultEl);

    resultEl.querySelector('.btn-retry').addEventListener('click', () => renderQuiz(root));

    if (passed) {
        if (window.SirahAudio) window.SirahAudio.victory();
        localStorage.setItem(quizStorageKey(), 'done');
        markModuleDone(currentModuleId);
        refreshIlmuMeter();

        // Rekod ke pangkalan data MySQL melalui API
        fetch('api/progress.php?action=save_score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                module_id: currentModuleId,
                score: Math.round((score / total) * 100),
                xp: 40
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(`[SirahAble] Kemajuan Bab ${currentModuleId} berjaya disimpan:`, data);
        })
        .catch(err => {
            console.log(`[SirahAble] Mod luar talian:`, err);
        });
    }
}

// ==========================================
// 12. SIDEBAR MODUL & LAMPU ILMU
// ==========================================
function moduleDoneKey(modId) {
    return STORAGE_PREFIX + 'quiz_mod' + modId;
}

function setupModuleSidebar() {
    const items = document.querySelectorAll('#module-list li');
    items.forEach(li => {
        const modId = parseInt(li.dataset.mod, 10);
        if (localStorage.getItem(moduleDoneKey(modId)) === 'done') {
            li.classList.add('done');
        }
        li.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('active'));
            li.classList.add('active');
            loadModuleContent(modId);
        });
    });
}

function markModuleDone(modId) {
    const li = document.querySelector(`#module-list li[data-mod="${modId}"]`);
    if (li) li.classList.add('done');
}

function refreshIlmuMeter() {
    const items = document.querySelectorAll('#module-list li');
    const total = items.length;
    const done = document.querySelectorAll('#module-list li.done').length;
    const pct = total ? Math.round((done / total) * 100) : 0;

    const pctEl = document.getElementById('ilmu-pct');
    const fillEl = document.getElementById('ilmu-bar-fill');
    if (pctEl) pctEl.textContent = pct + '%';
    if (fillEl) fillEl.style.width = pct + '%';

    const flame = document.getElementById('lamp-flame');
    if (flame) {
        const opacity = 0.15 + (pct / 100) * 0.85;
        flame.style.opacity = opacity.toFixed(2);
        flame.style.filter = `drop-shadow(0 0 ${4 + (pct / 100) * 10}px var(--gold))`;
    }
}

// ==========================================
// 13. STUDY TIMER (POMODORO)
// ==========================================
function setupStudyTimer() {
    const digits = document.getElementById('timer-digits');
    const startBtn = document.getElementById('timer-start');
    const resetBtn = document.getElementById('timer-reset');
    const collapseBtn = document.getElementById('timer-collapse-btn');
    const wrap = document.getElementById('study-timer');
    if (!digits || !startBtn || !resetBtn) return;

    const FOCUS_SECONDS = 25 * 60;
    let remaining = FOCUS_SECONDS;
    let running = false;
    let intervalId = null;

    render();

    startBtn.addEventListener('click', () => {
        running = !running;
        startBtn.textContent = running ? '⏸' : '▶';
        if (running) {
            intervalId = setInterval(() => {
                remaining = Math.max(0, remaining - 1);
                render();
                if (remaining === 0) {
                    clearInterval(intervalId);
                    running = false;
                    startBtn.textContent = '▶';
                    notifyBreak();
                }
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        running = false;
        startBtn.textContent = '▶';
        remaining = FOCUS_SECONDS;
        render();
    });

    if (collapseBtn && wrap) {
        collapseBtn.addEventListener('click', () => {
            wrap.classList.toggle('collapsed');
        });
    }

    function render() {
        const m = String(Math.floor(remaining / 60)).padStart(2, '0');
        const s = String(remaining % 60).padStart(2, '0');
        digits.textContent = `${m}:${s}`;
    }

    function notifyBreak() {
        digits.textContent = '☕ Rehat!';
        if (window.Notification && Notification.permission === 'granted') {
            new Notification('EDUSYS', { body: 'Sesi fokus 25 minit selesai — masa untuk rehat sekejap.' });
        }
    }
}

// ==========================================
// 14. PEMUAT NAIK NOTA PELAJAR & ANALISIS AI
// ==========================================
function setupNoteUploader() {
    const btnUpload = document.getElementById('btn-upload-my-notes');
    const fileInput = document.getElementById('note-file-input');
    if (!btnUpload || !fileInput) return;

    btnUpload.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function() {
        if (!this.files.length) return;
        const file = this.files[0];
        
        btnUpload.innerText = "⏳ Memproses Dokumen...";
        btnUpload.disabled = true;

        const formData = new FormData();
        formData.append('file', file);

        fetch('api/ai_summarize.php', {
            method: 'POST',
            body: formData
        })
        .then(async res => {
            const resData = await res.json().catch(() => null);
            btnUpload.innerText = "📤 Muat Naik Nota";
            btnUpload.disabled = false;
            fileInput.value = '';

            if (res.ok && resData && resData.status === 'success') {
                const d = resData.data;

                // Cipta bab kustom daripada nota pelajar
                const customMod = {
                    id: 999,
                    title: d.title || file.name,
                    metaAuthor: "Nota Pelajar (" + file.name + ")",
                    metaTime: "5 Minit",
                    paragraphs: d.key_points && d.key_points.length ? d.key_points : [d.summary],
                    aiSummary: (d.key_points || []).map((pt, idx) => ({ title: `Isi Penting ${idx + 1}`, text: pt })),
                    flashcards: (d.flashcards || []).map(fc => ({ front: fc.q, back: fc.a })),
                    quiz: (d.quiz && d.quiz.length) ? d.quiz : [
                        {
                            q: `Apakah intipati utama yang dinyatakan dalam nota "${file.name}"?`,
                            options: [d.summary.substring(0, 50) + "...", "Tiada fakta dinyatakan", "Fakta luar konteks", "Bukan dalam nota"],
                            correct: 0
                        }
                    ]
                };

                MODULE_CHAPTERS[999] = customMod;

                // Tambah atau kemaskini pilihan dalam sidebar
                let myNoteLi = document.getElementById('my-custom-note-li');
                if (!myNoteLi) {
                    const moduleList = document.getElementById('module-list');
                    myNoteLi = document.createElement('li');
                    myNoteLi.id = 'my-custom-note-li';
                    myNoteLi.dataset.mod = '999';
                    myNoteLi.innerHTML = `<span class="mod-check">★</span><span class="mod-name">Nota: ${file.name.substring(0, 16)}...</span>`;
                    myNoteLi.addEventListener('click', () => {
                        document.querySelectorAll('#module-list li').forEach(i => i.classList.remove('active'));
                        myNoteLi.classList.add('active');
                        loadModuleContent(999);
                    });
                    moduleList.appendChild(myNoteLi);
                }

                document.querySelectorAll('#module-list li').forEach(i => i.classList.remove('active'));
                myNoteLi.classList.add('active');
                loadModuleContent(999);

                // Buka kotak rumusan AI secara automatik
                const summaryBox = document.getElementById('ai-summary-box');
                const bulletList = document.getElementById('ai-bullets');
                const btnAI = document.getElementById('btn-ai-summary');
                if (summaryBox && bulletList) {
                    summaryBox.style.display = 'block';
                    bulletList.innerHTML = customMod.aiSummary
                        .map(item => `<li><strong>${item.title}:</strong> ${item.text}</li>`)
                        .join('');
                    if (btnAI) btnAI.innerHTML = "Rumusan AI Selesai ✓";
                    window._flashcardsReady = true;
                }

                alert(`BERJAYA! Nota "${file.name}" telah dianalisis oleh AI. Rumusan, isi-isi penting, audio pembaca berita TV3, dan kad imbasan kini sedia dipelajari.`);
            } else {
                alert("Ralat AI: " + (resData.message || "Gagal memproses fail."));
            }
        })
        .catch(err => {
            btnUpload.innerText = "📤 Muat Naik Nota";
            btnUpload.disabled = false;
            console.error("Upload error:", err);
            alert("Ralat memuat naik fail. Sila cuba lagi.");
        });
    });
}

// ==========================================
// 12. PENGURUS AUDIO SEJARAH
// ==========================================
function setupSirahAudioUI() {
    // Interaktiviti butang dan maklum balas audio diurus secara automatik oleh SirahAudio
}