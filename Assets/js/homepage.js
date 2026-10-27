document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    initNavbarScroll();
    initTimelineInteractive();
    initModalHandlers();
    initChapterCards();
    initProtectedLinks();
    initCinematicAudio();
    initMobileMenuAndDropdowns();
});

// ==========================================
// PAUTAN BERKUNCI — HANYA PELAJAR YANG LOG MASUK
// ==========================================
// Simpan destinasi yang cuba diakses, supaya lepas log masuk berjaya
// pelajar terus dihantar ke sana (bukan ke dashboard.html sahaja).
const PENDING_REDIRECT_KEY = 'edusys_pending_redirect';

function initProtectedLinks() {
    document.getElementById('link-belajar-footer')?.addEventListener('click', (e) => {
        e.preventDefault();
        requireLoginThenGo('belajar.html');
    });
}

function requireLoginThenGo(destination) {
    // Guna API sedia ada untuk semak sama ada sesi pelajar masih aktif
    fetch('api/get_dashboard.php')
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.href = destination;
            } else {
                showLoginGate(destination);
            }
        })
        .catch(() => showLoginGate(destination));
}

function showLoginGate(destination) {
    sessionStorage.setItem(PENDING_REDIRECT_KEY, destination);

    const gateMsg = document.getElementById('auth-gate-msg');
    if (gateMsg) gateMsg.style.display = 'block';

    openModal('modal-auth');
}

function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = Math.random() * 0.3 + 0.1;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.goldColor = Math.random() > 0.4 ? '212, 175, 55' : '13, 92, 70';
        }
        update() {
            this.y -= this.speedY;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = `rgba(${this.goldColor}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 45; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

const eraData = {
    1: {
        tag: "ZAMAN PENUBUHAN (750 M)",
        heading: "Kebangkitan Dinasti Abbasiyah",
        body: "Gerakan revolusi yang menumbangkan Khilafah Umayyah di Damsyik dan mengangkat Khalifah Abu al-Abbas As-Saffah sebagai khalifah pertama, memindahkan pusat kuasa ke Iraq."
    },
    2: {
        tag: "KOTA KEDAMAIAN (762 M)",
        heading: "Pembinaan Madinat al-Salam (Baghdad)",
        body: "Khalifah Abu Ja'far al-Mansur membina Kota Bulat Baghdad berhampiran Sungai Dajlah (Tigris), menjadikannya pusat perdagangan antarabangsa dan pentadbiran tersusun."
    },
    3: {
        tag: "ZAMAN KEEMASAN (800 – 861 M)",
        heading: "Bayt al-Hikmah & Revolusi Sains Islam",
        body: "Di bawah pimpinan Khalifah Harun al-Rashid dan Al-Ma'mun, ribuan karya falsafah, sains, falak, dan perubatan dari tamadun Yunani dan Parsi diterjemahkan serta dimurnikan."
    },
    4: {
        tag: "ERA PERGOLAKAN (861 – 1100 M)",
        heading: "Cabaran Politik & Kuasa Ketenteraan",
        body: "Pemberontakan 'Fitnah Samarra', pengaruh tentera Turki, dan kemunculan kerajaan-kerajaan kecil (Buwayhiyyah dan Saljuk) yang melemahkan kuasa mutlak khalifah."
    },
    5: {
        tag: "TRAGEDI 1258 M",
        heading: "Pengepungan & Kejatuhan Baghdad",
        body: "Serangan tentera Mongol di bawah pimpinan Hulagu Khan yang memusnahkan perpustakaan agung dan mengakhiri pemerintahan Abbasiyah di Baghdad."
    }
};

function initTimelineInteractive() {
    const nodes = document.querySelectorAll('.timeline-node');
    const eraTag = document.getElementById('era-tag');
    const eraHeading = document.getElementById('era-heading');
    const eraBody = document.getElementById('era-body');
    const btnExplore = document.getElementById('btn-timeline-explore');

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            const eraId = node.getAttribute('data-era');
            const data = eraData[eraId];
            if (data) {
                eraTag.innerText = data.tag;
                eraHeading.innerText = data.heading;
                eraBody.innerText = data.body;
            }
        });
    });

    if (btnExplore) {
        btnExplore.addEventListener('click', () => openModal('modal-journey'));
    }
}

function initModalHandlers() {
    const btnHeroStart = document.getElementById('btn-hero-start');
    const btnCtaLaunch = document.getElementById('btn-cta-launch');
    const loginForm = document.getElementById('form-auth');

    if (btnHeroStart) btnHeroStart.addEventListener('click', () => openModal('modal-journey'));
    if (btnCtaLaunch) btnCtaLaunch.addEventListener('click', () => openModal('modal-journey'));

    // Pilihan Butang Modal Mod Pengembaraan -> Ke game.html
    document.getElementById('mode-story-mode')?.addEventListener('click', () => {
        window.location.href = 'game.html';
    });

    document.getElementById('mode-academic-mode')?.addEventListener('click', () => {
        closeModal('modal-journey');
        document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-close');
            closeModal(target);
            if (target === 'modal-auth') {
                sessionStorage.removeItem(PENDING_REDIRECT_KEY);
                document.getElementById('auth-gate-msg')?.style.setProperty('display', 'none');
            }
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-overlay')) {
            e.target.classList.add('hidden');
            if (globalAudioEngine) globalAudioEngine.playClick();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => {
                m.classList.add('hidden');
            });
        }
    });

    // ==========================================
    // LOGIK TOGGLE: LOG MASUK <--> DAFTAR AKAUN
    // ==========================================
    const authTitle = document.getElementById('auth-title');
    const authDesc = document.getElementById('auth-desc');
    const groupUsername = document.getElementById('group-username');
    const btnSubmit = document.getElementById('btn-submit-auth');
    const toggleText = document.getElementById('auth-toggle-text');
    let isLoginMode = true;

    function attachToggleEvent() {
        const toggleLink = document.getElementById('auth-toggle-link');
        if(toggleLink) {
            toggleLink.addEventListener('click', (e) => {
                e.preventDefault();
                isLoginMode = !isLoginMode;

                if (isLoginMode) {
                    // Mod Log Masuk
                    authTitle.innerText = "Log Masuk Pelajar";
                    authDesc.innerText = "Masukkan maklumat akaun anda untuk merekod markah dan Mata Ilmu (XP).";
                    groupUsername.classList.add('hidden');
                    document.getElementById('auth-username').removeAttribute('required');
                    btnSubmit.innerText = "MASUK SEKARANG";
                    toggleText.innerHTML = `Belum mempunyai akaun? <a href="#" id="auth-toggle-link" style="color: var(--color-gold); font-weight: 600;">Daftar di sini</a>`;
                } else {
                    // Mod Daftar
                    authTitle.innerText = "Daftar Akaun Baharu";
                    authDesc.innerText = "Daftar untuk memulakan pengembaraan sejarah anda.";
                    groupUsername.classList.remove('hidden');
                    document.getElementById('auth-username').setAttribute('required', 'true');
                    btnSubmit.innerText = "DAFTAR AKAUN";
                    toggleText.innerHTML = `Sudah mempunyai akaun? <a href="#" id="auth-toggle-link" style="color: var(--color-gold); font-weight: 600;">Log Masuk di sini</a>`;
                }
                attachToggleEvent(); // Pasang semula event listener pada link baru
            });
        }
    }
    attachToggleEvent();

    // ==========================================
    // LOGIK HANTAR DATA (SUBMIT FORM) KE API
    // ==========================================
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const feedbackEl = loginForm.querySelector('.form-feedback-msg');
            
            // Tukar format form data kepada JSON
            const payload = {};
            formData.forEach((value, key) => payload[key] = value);

            // Tentukan API: login.php atau register.php bergantung kepada Mod Semasa
            const apiEndpoint = isLoginMode ? 'api/login.php' : 'api/register.php';
            
            fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    // Berjaya log masuk/daftar -> hantar ke destinasi asal (jika ada), jika tiada ke dashboard
                    const pending = sessionStorage.getItem(PENDING_REDIRECT_KEY);
                    sessionStorage.removeItem(PENDING_REDIRECT_KEY);
                    window.location.href = pending || 'dashboard.html';
                } else {
                    // Paparkan mesej ralat (contoh: kata laluan salah)
                    if(feedbackEl) {
                        feedbackEl.textContent = data.message;
                        feedbackEl.style.display = 'block';
                    } else {
                        alert(data.message);
                    }
                }
            }).catch(err => {
                console.error(err);
                // Jika fail PHP belum berfungsi, kita paksa masuk untuk Ujian UI
                const pending = sessionStorage.getItem(PENDING_REDIRECT_KEY);
                sessionStorage.removeItem(PENDING_REDIRECT_KEY);
                alert("Simulasi Berjaya: Membawa anda masuk...");
                window.location.href = pending || 'dashboard.html';
            });
        });
    }
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        if (globalAudioEngine) globalAudioEngine.playModal();
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        if (globalAudioEngine) globalAudioEngine.playClick();
    }
}

// ==========================================
// 6B. MAKLUMAT LENGKAP BAB SILIBUS (DATA & MODAL)
// ==========================================
const CHAPTER_INFO_DATA = {
    1: {
        number: "BAB 1",
        era: "750 M (132 H) • PENUBUHAN",
        title: "Fasa Kebangkitan Daulah Abbasiyah",
        tag: "REVOLUSI & ASAS PEMBINAAN DAULAH",
        synopsis: "Gerakan kebangkitan Abbasiyah bermula secara rahsia dari Humaimah dan Khurasan untuk menumbangkan kekuasaan Umayyah. Didorong oleh penentangan terhadap dasar diskriminasi golongan Mawali dan kelemahan dalaman Umayyah, gerakan ini berjaya menumpaskan Marwan II dalam Pertempuran Sungai Zab (750 M). Pengisytiharan Khalifah Abu al-Abbas As-Saffah di Masjid Kufah menandakan terbinanya sebuah empayar baharu yang berpusat di Iraq.",
        figures: "Abu al-Abbas As-Saffah, Abu Muslim al-Khurasani, Muhammad bin Ali",
        event: "Pertempuran Zab (750 M) & Bai'ah Masjid Kufah",
        location: "Humaimah, Khurasan, Kufah & Al-Anbar",
        topics: [
            "Faktor kemerosotan Daulah Umayyah dan gelombang kebangkitan Abbasiyah",
            "Strategi tiga fasa revolusi: Rahsia (Humaimah), Terbuka (Khurasan), dan Bai'ah Kufah",
            "Peranan kaum Mawali serta penyatuan sokongan melalui slogan Ahlul Bait",
            "Dasar pemerintahan awal Khalifah Abu al-Abbas As-Saffah dalam menstabilkan wilayah"
        ],
        lesson: "Perpaduan ummah, penghapusan diskriminasi, dan keadilan sosial merupakan tunjang kestabilan sebuah kepimpinan. Penindasan hanya mempercepatkan keruntuhan sesebuah kuasa.",
        gameChapter: "1"
    },
    2: {
        number: "BAB 2",
        era: "762 M (145 H) • KOTA KEDAMAIAN",
        title: "Madinat al-Salam (Kota Bulat Baghdad)",
        tag: "SENI BINA KONSENTRIK & PENTADBIRAN",
        synopsis: "Khalifah Abu Ja'far al-Mansur memilih lokasi paling strategik di tebing barat Sungai Dajlah (Tigris) untuk mendirikan ibu kota agung yang dinamakan Madinat al-Salam (Baghdad). Dibina dengan reka bentuk konsentrik (Kota Bulat) dengan empat pintu gerbang berkubu (Kufah, Basrah, Syam, dan Khurasan), Baghdad berkembang pesat menjadi pusat perdagangan global dan jantung pentadbiran empayar Islam.",
        figures: "Khalifah Abu Ja'far al-Mansur, jurutera Naubakht & Mashallah",
        event: "Peletakan Batu Asas Baghdad (762 M) & Istana Bab az-Zahab",
        location: "Lembah Sungai Dajlah & Sungai Furat (Iraq)",
        topics: [
            "Sebab strategik pemilihan tapak Baghdad menggantikan Damsyik dan Kufah",
            "Struktur seni bina Kota Bulat Baghdad, parit pertahanan, dan empat pintu gerbang",
            "Organisasi pentadbiran pusat: Peranan Wazir, Diwan (kementerian), dan sistem pos berkuda (Barid)",
            "Baghdad sebagai hab perniagaan antarabangsa menghubungkan Timur dan Barat"
        ],
        lesson: "Perancangan yang berwawasan, pemilihan lokasi yang strategik, dan pengurusan pentadbiran yang berdisiplin menjadi pemacu kemakmuran dan tamadun berkekalan.",
        gameChapter: "2"
    },
    3: {
        number: "BAB 3",
        era: "786 – 861 M • ZAMAN KEEMASAN",
        title: "Bayt al-Hikmah & Revolusi Sains Islam",
        tag: "PUSAT AKADEMI & GERAKAN PENTERJEMAHAN",
        synopsis: "Kemuncak kegemilangan tamadun Abbasiyah dizahirkan di bawah kepimpinan Khalifah Harun al-Rashid dan Khalifah Al-Ma'mun. Institusi Bayt al-Hikmah (Khazanah Kebijaksanaan) menjadi akademi sains, balai cerap falak, dan perpustakaan awam terhebat di dunia. Cendekiawan Islam bukan sahaja menterjemahkan karya Yunani, India, dan Parsi, bahkan menyaringnya dengan prinsip tauhid serta mempelopori penemuan baharu dalam algebra, perubatan, optik, dan astronomi.",
        figures: "Khalifah Harun al-Rashid, Khalifah Al-Ma'mun, Al-Khawarizmi, Hunayn bin Ishaq",
        event: "Penubuhan Bayt al-Hikmah & Gerakan Tarjamah Agung",
        location: "Baghdad (Pusat Akademi & Balai Cerap Falak)",
        topics: [
            "Fungsi dan sumbangan institusi Bayt al-Hikmah terhadap perkembangan tamadun sejagat",
            "Gerakan penterjemahan karya falsafah, perubatan, matematik, dan astronomi",
            "Tokoh cendekiawan agung: Al-Khawarizmi (Algebra), Al-Kindi (Falsafah), dan Hunayn bin Ishaq",
            "Penubuhan Bimaristan (hospital moden) dan perkembangan industri kertas (Kagaz)"
        ],
        lesson: "Kemajuan sesebuah bangsa terbina atas kecintaan terhadap ilmu, sokongan jitu pemimpin terhadap para saintis, dan keterbukaan minda yang berasaskan pegangan akidah.",
        gameChapter: "3"
    },
    4: {
        number: "BAB 4",
        era: "861 – 1100 M • ERA PERGOLAKAN",
        title: "Pergolakan Kuasa & Krisis Politik",
        tag: "CABARAN MILITERI & POLARISASI KUASA",
        synopsis: "Selepas pembunuhan Khalifah Al-Mutawakkil pada tahun 861 M, Daulah Abbasiyah memasuki era krisis anarki yang dikenali sebagai 'Fitnah Samarra'. Pengaruh para panglima tentera Turki yang terlalu dominan menghakis kuasa khalifah kepada figura simbolik semata-mata. Kelemahan ini memicu kemunculan dinasti-dinasti separa bebas serta pengaruh kekuasaan Bani Buwayhiyyah dan Bani Saljuk ke atas kota Baghdad.",
        figures: "Khalifah Al-Mutawakkil, Khalifah Al-Mu'tasim, Dinasti Buwayhiyyah, Sultan Alp Arslan & Nizam al-Mulk",
        event: "Fitnah Samarra (861 M) & Penguasaan Panglima Ketenteraan",
        location: "Samarra, Baghdad, Parsi & Asia Tengah",
        topics: [
            "Kesan pembentukan kor tentera elit Turki oleh Al-Mu'tasim dan peralihan kuasa",
            "Fitnah Samarra dan perebutan takhta khalifah yang melemahkan kewangan baitulmal",
            "Kemunculan kerajaan wilayah separa bebas (Bani Buwayhiyyah dan Saljuk)",
            "Peranan Nizam al-Mulk dan penubuhan Madrasah Nizamiyyah untuk memulihkan kestabilan"
        ],
        lesson: "Perebutan takhta, ketamakan pengaruh militeri, dan perpecahan dalaman akan meruntuhkan kuasa terkuat dari dalam, walaupun musuh luar belum tiba.",
        gameChapter: "4"
    },
    5: {
        number: "BAB 5",
        era: "1258 M (656 H) • DETIK KEJATUHAN",
        title: "Detik Kejatuhan Baghdad 1258",
        tag: "PENGAKHIRAN EMPAYAR & IKTIBAR UMMAH",
        synopsis: "Pada bulan Safar 656 H (Februari 1258 M), tentera Mongol pimpinan Hulagu Khan mengepung Baghdad. Kelemahan pertahanan di bawah Khalifah Al-Musta'sim Billah, kealpaan para pembesar, dan perpecahan mazhab mengakibatkan kota Baghdad ditawan. Perpustakaan Bayt al-Hikmah dimusnahkan dan jutaan manuskrip dicampakkan ke dalam Sungai Dajlah sehingga airnya bertukar hitam pekat. Tragedi ini menamatkan pemerintahan Abbasiyah di Baghdad selama lebih lima abad.",
        figures: "Khalifah Al-Musta'sim Billah, Hulagu Khan (Mongol), Wazir Ibnu al-Alqami",
        event: "Pengepungan Baghdad 1258 M & Pemusnahan Khazanah Sungai Dajlah",
        location: "Kota Baghdad & Sungai Dajlah (Tigris)",
        topics: [
            "Faktor luaran (serangan Mongol) dan faktor dalaman yang melemahkan benteng Baghdad",
            "Kronologi pengepungan 12 hari dan kejatuhan istana khalifah",
            "Kesan kejatuhan Baghdad terhadap warisan ilmu tamadun Islam dan dunia",
            "Iktibar KSSM: Kewajipan mempertahankan perpaduan, waspada terhadap tipu daya, dan amanah kepimpinan"
        ],
        lesson: "Kealpaan terhadap persediaan pertahanan, kelalaian dalam kemewahan, dan hilangnya perpaduan membawa kepada kemusnahan khazanah yang dibina berabad lamanya.",
        gameChapter: "5"
    }
};

function showChapterInfo(chapterNum) {
    const data = CHAPTER_INFO_DATA[chapterNum];
    if (!data) return;

    const elNumber = document.getElementById('ci-number');
    const elEra = document.getElementById('ci-era');
    const elTitle = document.getElementById('ci-title');
    const elTag = document.getElementById('ci-tag');
    const elSynopsis = document.getElementById('ci-synopsis');
    const elFigures = document.getElementById('ci-figures');
    const elEvent = document.getElementById('ci-event');
    const elLocation = document.getElementById('ci-location');
    const elTopics = document.getElementById('ci-topics');
    const elLesson = document.getElementById('ci-lesson');
    const btnGame = document.getElementById('ci-btn-game');
    const btnLearn = document.getElementById('ci-btn-learn');

    if (elNumber) elNumber.textContent = data.number;
    if (elEra) elEra.textContent = data.era;
    if (elTitle) elTitle.textContent = data.title;
    if (elTag) elTag.textContent = data.tag;
    if (elSynopsis) elSynopsis.textContent = data.synopsis;
    if (elFigures) elFigures.textContent = data.figures;
    if (elEvent) elEvent.textContent = data.event;
    if (elLocation) elLocation.textContent = data.location;
    if (elLesson) elLesson.textContent = data.lesson;

    if (elTopics) {
        elTopics.innerHTML = '';
        data.topics.forEach(topic => {
            const li = document.createElement('li');
            li.textContent = topic;
            elTopics.appendChild(li);
        });
    }

    if (btnGame) {
        btnGame.setAttribute('href', `game.html?chapter=${data.gameChapter}`);
    }

    if (btnLearn) {
        btnLearn.onclick = (e) => {
            e.preventDefault();
            requireLoginThenGo('belajar.html');
        };
    }

    openModal('modal-chapter-info');
}

function initChapterCards() {
    const cards = document.querySelectorAll('.ui-game-card[data-chapter]');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const chap = card.getAttribute('data-chapter');
            showChapterInfo(chap);
        });
    });

    document.getElementById('ci-btn-close')?.addEventListener('click', () => {
        closeModal('modal-chapter-info');
    });
}

// ==========================================
// 7. SISTEM MUZIK LATAR BELAKANG SINEMATIK AUTOMATIK
// Arabian Nights Instrumental (Desert Vibes)
// Video ID: gin_VBYqWBo (Auto-Loop Berterusan)
// ==========================================
function initCinematicAudio() {
    const bgmPlayer = document.getElementById('bgm-player');
    let isPlaying = false;
    let ytPlayer = null;

    if (!bgmPlayer) return;

    bgmPlayer.volume = 0.48;

    function startMusic() {
        if (isPlaying) return;
        const promise = bgmPlayer.play();
        if (promise !== undefined) {
            promise.then(() => {
                isPlaying = true;
                removeInteractionListeners();
            }).catch(() => {
                // Jika pelayar menyekat autoplay tanpa interaksi awal, tunggu sebarang gerak isyarat
                attachInteractionListeners();
            });
        }
    }

    function triggerOnGesture() {
        if (!isPlaying) {
            bgmPlayer.play().then(() => {
                isPlaying = true;
                removeInteractionListeners();
            }).catch(() => {
                playYouTubeFallback();
            });
        }
    }

    const events = ['pointerdown', 'click', 'touchstart', 'scroll', 'keydown', 'mousemove'];

    function attachInteractionListeners() {
        events.forEach(evt => {
            window.addEventListener(evt, triggerOnGesture, { once: true, passive: true });
        });
    }

    function removeInteractionListeners() {
        events.forEach(evt => {
            window.removeEventListener(evt, triggerOnGesture);
        });
    }

    // Cuba mainkan serta-merta semasa masuk ke halaman
    startMusic();
    attachInteractionListeners();

    // Fallback YouTube IFrame API jika fail media disekat oleh rangkaian sekolah
    function playYouTubeFallback() {
        if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
            try { ytPlayer.playVideo(); isPlaying = true; } catch (e) {}
            return;
        }

        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(tag);

            window.onYouTubeIframeAPIReady = () => {
                createYTPlayer();
            };
        } else {
            createYTPlayer();
        }
    }

    function createYTPlayer() {
        try {
            ytPlayer = new YT.Player('yt-bgm-container', {
                videoId: 'gin_VBYqWBo',
                playerVars: {
                    autoplay: 1,
                    loop: 1,
                    playlist: 'gin_VBYqWBo',
                    controls: 0,
                    showinfo: 0,
                    modestbranding: 1
                },
                events: {
                    onReady: (event) => {
                        event.target.setVolume(48);
                        event.target.playVideo();
                        isPlaying = true;
                    }
                }
            });
        } catch (e) {
            console.warn("YouTube fallback player error:", e);
        }
    }
}

// Pengendali Menu Bar Bertingkat (Dropdown) & Navigasi Mobile
function initMobileMenuAndDropdowns() {
    const toggleBtn = document.getElementById('btn-mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Tutup menu jika klik di luar
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                toggleBtn.classList.remove('active');
                navMenu.classList.remove('open');
            }
        });
    }

    // Sokongan klik/sentuh untuk butang dropdown
    const dropdownToggles = document.querySelectorAll('.nav-dropdown > .dropdown-toggle');
    dropdownToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = btn.parentElement;
            const isOpen = parent.classList.contains('active');
            document.querySelectorAll('.nav-dropdown').forEach(d => {
                if (d !== parent) d.classList.remove('active');
            });
            parent.classList.toggle('active', !isOpen);
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
    });
}