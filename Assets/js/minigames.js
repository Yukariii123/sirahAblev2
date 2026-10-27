/**
 * SIRAHABLE — Pusat Mini-Games Pembelajaran (KSSM / SMU Tingkatan 4 Edition)
 * Menyelaras 4 Mini-Game dengan Silibus Khilafah Abbasiyah, Maklum Balas Pedagogi, dan Simpanan Kemajuan.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 0. FUNGSI SIMPANAN KEMAJUAN KE API
    // ==========================================
    function saveProgressToAPI(gameKey, xp) {
        fetch('api/progress.php?action=save_score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ module_id: 1, score: 100, xp: xp })
        })
        .then(res => res.json())
        .then(data => {
            console.log(`[SirahAble] Kemajuan ${gameKey} disimpan (+${xp} XP):`, data);
        })
        .catch(err => {
            console.log(`[SirahAble] Mod luar talian untuk ${gameKey}:`, err);
        });
    }

    // ==========================================
    // 1. KAWALAN TAB MINI-GAMES
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.mg-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.add('hidden-tab');
                c.classList.remove('active-tab');
            });

            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.tab);
            if (target) {
                target.classList.remove('hidden-tab');
                target.classList.add('active-tab');
            }
        });
    });

    // ==========================================
    // 2. MINI-GAME 1: SUSUNAN KRONOLOGI TAMADUN
    // ==========================================
    const timelineData = [
        { id: 1, text: 'Penubuhan Khilafah Abbasiyah & Kemenangan Pertempuran Zab (750 M)', era: '750 M' },
        { id: 2, text: 'Pembinaan Madinat al-Salam (Kota Bulat Baghdad) oleh Al-Mansur (762 M)', era: '762 M' },
        { id: 3, text: 'Zaman Keemasan Sains, Falsafah & Perpustakaan Bayt al-Hikmah (Era Harun al-Rashid)', era: '800-861 M' },
        { id: 4, text: 'Pergolakan Politik Tentera Samarra & Kemerosotan Kuasa Pusat', era: '861 M ke atas' },
        { id: 5, text: 'Pengepungan & Kejatuhan Baghdad di Tangan Tentera Mongol Hulagu Khan (1258 M)', era: '1258 M' }
    ];

    let currentTimelineOrder = [];
    const timelineList = document.getElementById('timeline-list');
    const timelineFeedback = document.getElementById('timeline-feedback');
    let draggedItem = null;

    function shuffleTimeline() {
        currentTimelineOrder = [...timelineData].sort(() => Math.random() - 0.5);
        renderTimelineList();
        if (timelineFeedback) {
            timelineFeedback.innerHTML = '';
            timelineFeedback.className = 'feedback-msg';
        }
    }

    function renderTimelineList() {
        if (!timelineList) return;
        timelineList.innerHTML = '';

        currentTimelineOrder.forEach((item, index) => {
            const slot = document.createElement('div');
            slot.className = 'timeline-slot';
            slot.draggable = true;
            slot.dataset.id = item.id;
            slot.dataset.index = index;

            slot.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px; flex:1;">
                    <span class="slot-badge">${index + 1}</span>
                    <div>
                        <div class="slot-text" style="font-weight:600; color:#FFF;">${item.text}</div>
                        <div style="font-size:0.75rem; color:var(--color-gold); margin-top:2px;">Fasa Era: ${item.era}</div>
                    </div>
                </div>
                <div style="display:flex; gap:6px;">
                    <button class="btn-slot-move" data-index="${index}" data-dir="-1" title="Pindah Ke Atas" style="background:rgba(255,255,255,0.06); border:1px solid var(--color-surface-border); color:#FFF; border-radius:6px; width:28px; height:28px; cursor:pointer;">▲</button>
                    <button class="btn-slot-move" data-index="${index}" data-dir="1" title="Pindah Ke Bawah" style="background:rgba(255,255,255,0.06); border:1px solid var(--color-surface-border); color:#FFF; border-radius:6px; width:28px; height:28px; cursor:pointer;">▼</button>
                </div>
            `;

            // Drag and drop event listeners
            slot.addEventListener('dragstart', (e) => {
                draggedItem = slot;
                setTimeout(() => slot.classList.add('dragging'), 0);
            });

            slot.addEventListener('dragend', () => {
                if (draggedItem) draggedItem.classList.remove('dragging');
                draggedItem = null;
                document.querySelectorAll('.timeline-slot').forEach(s => s.classList.remove('drag-over'));
            });

            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.classList.add('drag-over');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('drag-over');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('drag-over');
                if (draggedItem && draggedItem !== slot) {
                    const fromIdx = parseInt(draggedItem.dataset.index);
                    const toIdx = parseInt(slot.dataset.index);
                    const [moved] = currentTimelineOrder.splice(fromIdx, 1);
                    currentTimelineOrder.splice(toIdx, 0, moved);
                    renderTimelineList();
                }
            });

            timelineList.appendChild(slot);
        });

        // Butang kawalan atas / bawah (Sesuai untuk peranti sentuh / mobile)
        timelineList.querySelectorAll('.btn-slot-move').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index);
                const dir = parseInt(btn.dataset.dir);
                const targetIdx = idx + dir;
                if (targetIdx >= 0 && targetIdx < currentTimelineOrder.length) {
                    const temp = currentTimelineOrder[idx];
                    currentTimelineOrder[idx] = currentTimelineOrder[targetIdx];
                    currentTimelineOrder[targetIdx] = temp;
                    renderTimelineList();
                }
            });
        });
    }

    shuffleTimeline();

    document.getElementById('btn-reset-timeline')?.addEventListener('click', shuffleTimeline);

    document.getElementById('btn-check-timeline')?.addEventListener('click', () => {
        const isCorrect = currentTimelineOrder.every((item, idx) => item.id === (idx + 1));
        if (isCorrect) {
            timelineFeedback.innerHTML = `
                <div class="feedback-success" style="padding:12px; border-radius:8px;">
                    <strong>✦ TAHNIAH! KRONOLOGI LENGKAP (+30 XP)</strong><br>
                    Urutan 5 abad tamadun Abbasiyah tepat dari penubuhan 750 M, pembinaan Baghdad 762 M, zaman sains, pergolakan politik, hingga kejatuhan 1258 M.
                </div>
            `;
            saveProgressToAPI('minigame_timeline', 30);
        } else {
            timelineFeedback.innerHTML = `
                <div class="feedback-error" style="padding:12px; border-radius:8px;">
                    <strong>Susunan Belum Tepat</strong><br>
                    <em>Petunjuk Sejarah:</em> Pertempuran Zab (750 M) menandakan permulaan, diikuti pembinaan Madinat al-Salam (762 M). Kejatuhan Baghdad (1258 M) adalah peristiwa penamat.
                </div>
            `;
        }
    });

    // ==========================================
    // 3. MINI-GAME 2: PADANAN TOKOH & DISIPLIN
    // ==========================================
    class MatchGameManager {
        constructor() {
            this.disciplinesCol = document.getElementById('match-disciplines-col');
            this.scholarsCol = document.getElementById('match-scholars-col');
            this.feedbackEl = document.getElementById('match-feedback');
            this.resetBtn = document.getElementById('btn-reset-match');
            this.selectedDisciplineBtn = null;
            this.matchedCount = 0;
            this.totalPairs = 5;

            this.init();
        }

        init() {
            if (!this.disciplinesCol || !this.scholarsCol) return;
            this.shuffleScholars();
            this.disciplinesCol.querySelectorAll('.match-btn').forEach(btn => {
                btn.addEventListener('click', () => this.handleDisciplineClick(btn));
            });
            this.resetBtn?.addEventListener('click', () => this.resetGame());
        }

        shuffleScholars() {
            if (!this.scholarsCol) return;
            const buttons = Array.from(this.scholarsCol.querySelectorAll('.match-btn'));
            buttons.sort(() => Math.random() - 0.5);
            this.scholarsCol.innerHTML = '';
            buttons.forEach(btn => {
                btn.onclick = () => this.handleScholarClick(btn);
                this.scholarsCol.appendChild(btn);
            });
        }

        handleDisciplineClick(btn) {
            if (btn.classList.contains('correct')) return;
            this.disciplinesCol.querySelectorAll('.match-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            this.selectedDisciplineBtn = btn;
            this.feedbackEl.innerHTML = '';
        }

        handleScholarClick(btn) {
            if (btn.classList.contains('correct')) return;
            if (!this.selectedDisciplineBtn) {
                this.feedbackEl.innerHTML = "<span class='feedback-error'>Sila pilih disiplin ilmu di sebelah kiri terlebih dahulu.</span>";
                return;
            }

            const disciplineKey = this.selectedDisciplineBtn.dataset.key;
            const scholarTarget = btn.dataset.target;

            if (disciplineKey === scholarTarget) {
                this.selectedDisciplineBtn.classList.add('correct');
                btn.classList.add('correct');
                this.selectedDisciplineBtn.disabled = true;
                btn.disabled = true;
                this.matchedCount++;

                if (this.matchedCount === this.totalPairs) {
                    this.feedbackEl.innerHTML = "<span class='feedback-success'>✦ SEMPURNA! Kesemua 5 tokoh sarjana berjaya dipadankan dengan tepat (+30 XP).</span>";
                    saveProgressToAPI('minigame_match_all', 30);
                } else {
                    this.feedbackEl.innerHTML = `<span class='feedback-success'>✓ Padanan Tepat! (${this.matchedCount}/${this.totalPairs} Selesai)</span>`;
                }
            } else {
                this.selectedDisciplineBtn.classList.add('wrong');
                btn.classList.add('wrong');
                this.feedbackEl.innerHTML = "<span class='feedback-error'>Padanan kurang tepat. Sila semak semula bidang kepakaran tokoh.</span>";
                setTimeout(() => {
                    btn.classList.remove('wrong');
                    if (this.selectedDisciplineBtn) this.selectedDisciplineBtn.classList.remove('wrong');
                }, 1000);
            }

            this.selectedDisciplineBtn.classList.remove('selected');
            this.selectedDisciplineBtn = null;
        }

        resetGame() {
            this.disciplinesCol.querySelectorAll('.match-btn').forEach(btn => {
                btn.classList.remove('selected', 'correct', 'wrong');
                btn.disabled = false;
            });
            this.scholarsCol.querySelectorAll('.match-btn').forEach(btn => {
                btn.classList.remove('selected', 'correct', 'wrong');
                btn.disabled = false;
            });
            this.selectedDisciplineBtn = null;
            this.matchedCount = 0;
            this.feedbackEl.innerHTML = '';
            this.shuffleScholars();
        }
    }

    new MatchGameManager();

    // ==========================================
    // 4. MINI-GAME 3: PENCARIAN KHmessage ARTIFAK
    // ==========================================
    const discoveredSet = new Set();
    document.querySelectorAll('.artifact-spot').forEach(spot => {
        spot.addEventListener('click', () => {
            const infoBox = document.getElementById('artifact-info-text');
            const title = spot.dataset.title || 'Artifak Sejarah';
            const info = spot.dataset.info || '';

            infoBox.innerHTML = `
                <strong style="color:var(--color-gold); font-size:1.05rem; letter-spacing:1px;">${title}</strong><br>
                <span style="color:#FFF; line-height:1.6; display:block; margin-top:6px;">${info}</span>
            `;

            if (!discoveredSet.has(title)) {
                discoveredSet.add(title);
                saveProgressToAPI('minigame_artifact_discovery', 5);
            }
        });
    });

    // ==========================================
    // 5. MINI-GAME 4: KUIZ KILAT SILIBUS (10 SOALAN)
    // ==========================================
    const quickQuizQuestions = [
        {
            q: "Apakah faktor utama kejayaan kempen revolusi penubuhan Khilafah Abbasiyah pada 750 M?",
            options: [
                { text: "Penyatuan sokongan golongan Mawali yang tertindas dan kempen rahsia di Khurasan", correct: true, rationale: "Golongan Mawali (Muslim bukan Arab) menyokong revolusi kerana menuntut keadilan cukai dan hak kesamarataan." },
                { text: "Bantuan ketenteraan daripada empayar Rom Byzantine", correct: false, rationale: "Empayar Byzantine adalah musuh luar, bukan penyokong revolusi." },
                { text: "Sistem pilihan raya terbuka di seluruh empayar", correct: false, rationale: "Pemerintahan pada masa itu tidak mengamalkan pilihan raya moden." },
                { text: "Kekayaan emas yang dibeli dari benua Afrika", correct: false, rationale: "Kejayaan berpunca daripada strategi politik dan sokongan rakyat." }
            ]
        },
        {
            q: "Siapakah Khalifah yang mengasaskan dan memulakan pembinaan Kota Baghdad (Madinat al-Salam) pada 762 M?",
            options: [
                { text: "Abu Ja'far al-Mansur", correct: true, rationale: "Khalifah Abu Ja'far al-Mansur memilih tapak di antara Sungai Dajlah dan Furat serta mereka bentuk Kota Bulat." },
                { text: "Abu al-Abbas As-Saffah", correct: false, rationale: "As-Saffah adalah khalifah pertama tetapi mentadbir dari Kufah dan Al-Anbar." },
                { text: "Harun al-Rashid", correct: false, rationale: "Harun al-Rashid terkenal dengan zaman kemuncak keemasan sains dan diplomasi antarabangsa." },
                { text: "Al-Mu'tasim", correct: false, rationale: "Al-Mu'tasim terkenal dengan pembinaan kota tentera Samarra." }
            ]
        },
        {
            q: "Apakah peranan terulung institusi Bayt al-Hikmah yang diasaskan oleh Harun al-Rashid dan diperluaskan oleh Al-Ma'mun?",
            options: [
                { text: "Pusat penterjemahan manuskrip antarabangsa, perpustakaan agung, dan akademi penyelidikan sains", correct: true, rationale: "Bayt al-Hikmah menterjemahkan karya Yunani, Sanskrit, dan Parsi ke Bahasa Arab serta melahirkan inovasi baharu." },
                { text: "Kubu pertahanan terakhir bagi tentera khalifah", correct: false, rationale: "Bayt al-Hikmah ialah pusat ilmu dan akademik, bukan pangkalan tentera." },
                { text: "Pasar rempah ratus terbesar empayar", correct: false, rationale: "Aktiviti perdagangan berlangsung di pasar Basrah dan Baghdad, bukan di perpustakaan." },
                { text: "Pusat persembahan hiburan diraja", correct: false, rationale: "Bayt al-Hikmah berfokus kepada keilmuan intelek bertaraf dunia." }
            ]
        },
        {
            q: "Apakah sumbangan monumental Muhammad bin Musa Al-Khwarizmi dalam bidang matematik dunia?",
            options: [
                { text: "Mengasaskan cabang ilmu Algebra (Al-Jabr) dan memperkenalkan angka sifar", correct: true, rationale: "Al-Khwarizmi digelar 'Bapa Algebra' dan karyanya menjadi teks rujukan universiti Eropah berabad-abad." },
                { text: "Menemui teori graviti moden", correct: false, rationale: "Teori graviti diasaskan jauh kemudian oleh Isaac Newton." },
                { text: "Mencipta mesin cetak kertas pertama", correct: false, rationale: "Mesin cetak dicipta oleh Johannes Gutenberg pada abad ke-15." },
                { text: "Menghapuskan penggunaan sistem nombor pecahan", correct: false, rationale: "Beliau memperkemas sistem pengiraan, bukan menghapuskannya." }
            ]
        },
        {
            q: "Karya perubatan terkemuka 'Kitab Al-Hawi Fi Al-Tibb' merupakan sumbangan sarjana manakah?",
            options: [
                { text: "Abu Bakar Al-Razi (Rhazes)", correct: true, rationale: "Al-Razi merintis pemerhatian klinikal dan pembezaan antara penyakit cacar dan campak." },
                { text: "Al-Kindi", correct: false, rationale: "Al-Kindi lebih terkenal sebagai 'Filosof Arab' dalam bidang mantik dan fizik." },
                { text: "Ibnu Battuta", correct: false, rationale: "Ibnu Battuta ialah pengembara dan ahli geografi zaman pertengahan." },
                { text: "Hunayn ibn Ishaq", correct: false, rationale: "Hunayn ialah ketua penterjemahan naskhah kedoktoran Yunani di Bayt al-Hikmah." }
            ]
        },
        {
            q: "Apakah fungsi utama instrumen 'Astrolab' yang disempurnakan oleh ilmuwan falak Abbasiyah?",
            options: [
                { text: "Menentukan arah koordinat Kiblat, waktu solat, dan cerapan posisi buruj bintang", correct: true, rationale: "Astrolab membolehkan pengiraan falak tepat untuk ibadah umat Islam dan navigasi pelayaran lautan." },
                { text: "Mengukur kadar kelajuan angin semata-mata", correct: false, rationale: "Astrolab ialah instrumen komprehensif falak dan koordinat astronomi." },
                { text: "Mengesan gempa bumi di bawah tanah", correct: false, rationale: "Itu fungsi seismograf yang dicipta pada era kemudian." },
                { text: "Menimbang berat emas dinar", correct: false, rationale: "Berat dinar ditimbang menggunakan neraca dacing." }
            ]
        },
        {
            q: "Apakah punca kelemahan politik pada fasa kedua pemerintahan Abbasiyah (Era Samarra)?",
            options: [
                { text: "Campur tangan berlebihan jeneral tentera pengawal Turki dalam pentadbiran takhta", correct: true, rationale: "Kelemahan kawalan ke atas tentera Samarra menyebabkan institusi khalifah hilang kuasa mutlak." },
                { text: "Kekurangan tanah pertanian di bumi Iraq", correct: false, rationale: "Lembah Tigris-Euphrates sangat subur tetapi terjejas kerana konflik politik." },
                { text: "Keputusan khalifah memindahkan ibu kota ke Eropah", correct: false, rationale: "Ibu kota tidak pernah dipindahkan ke Eropah." },
                { text: "Kemunculan teknologi senjata api moden", correct: false, rationale: "Senjata api belum wujud pada fasa awal era Abbasiyah." }
            ]
        },
        {
            q: "Kelemahan hasil kutipan cukai dan pembengkakan belanja tentera merujuk kepada faktor kemerosotan apa?",
            options: [
                { text: "Kemerosotan Ekonomi dan perbendaharaan Baitulmal", correct: true, rationale: "Kemelesetan ekonomi melumpuhkan keupayaan negara menyelenggara projek awam dan pertahanan." },
                { text: "Kemerosotan jumlah masjid di Baghdad", correct: false, rationale: "Masjid tetap banyak tetapi masalahnya ialah kewangan dan pentadbiran." },
                { text: "Kemerosotan dalam armada kapal selam", correct: false, rationale: "Kapal selam belum wujud pada zaman pertengahan." },
                { text: "Kemerosotan sistem perubatan", correct: false, rationale: "Bidang perubatan sangat maju berbanding tamadun lain." }
            ]
        },
        {
            q: "Pada tahun 1258 M, kota Baghdad telah dikepung dan dimusnahkan oleh pasukan tentera:",
            options: [
                { text: "Tentera Mongol di bawah pimpinan Hulagu Khan", correct: true, rationale: "Pengepungan 1258 M menamatkan riwayat khilafah Abbasiyah di Baghdad secara tragis." },
                { text: "Tentera Salib Eropah", correct: false, rationale: "Tentera Salib bertumpu di wilayah Syam dan Baitulmaqdis." },
                { text: "Tentera Parsi Sasaniyah", correct: false, rationale: "Empayar Sasaniyah telah runtuh sejak zaman Khulafa al-Rasyidin." },
                { text: "Tentera Rom purba", correct: false, rationale: "Rom purba telah tiada berabad-abad sebelum era ini." }
            ]
        },
        {
            q: "Apakah iktibar paling bermakna daripada peristiwa kejatuhan kota Baghdad bagi umat Islam hari ini?",
            options: [
                { text: "Perpaduan ummah, integriti pemimpin, dan kesiapsiagaan pertahanan adalah benteng kelangsungan tamadun", correct: true, rationale: "Kekayaan dan ilmu tidak dapat bertahan sekiranya masyarakat berpecah-belah dan mengabaikan keselamatan." },
                { text: "Mengehadkan aktiviti sains dan menolak penterjemahan ilmu luar", correct: false, rationale: "Sains dan penterjemahan adalah punca kegemilangan, bukan punca kejatuhan." },
                { text: "Menghapuskan sistem perbendaharaan negara", correct: false, rationale: "Baitulmal diperlukan bagi kestabilan sosioekonomi." },
                { text: "Mengasingkan diri daripada dunia antarabangsa", correct: false, rationale: "Keterbukaan ekonomi dan diplomasi adalah asas tamadun Islam yang makmur." }
            ]
        }
    ];

    class QuickQuizManager {
        constructor() {
            this.counterEl = document.getElementById('qq-counter');
            this.scoreBoxEl = document.getElementById('qq-score-box');
            this.questionEl = document.getElementById('qq-question');
            this.optionsEl = document.getElementById('qq-options');
            this.feedbackEl = document.getElementById('qq-feedback');
            this.nextBtn = document.getElementById('btn-qq-next');

            this.currentIndex = 0;
            this.totalScore = 0;
            this.shuffledDeck = [];

            this.init();
        }

        init() {
            if (!this.optionsEl || !this.questionEl) return;
            this.shuffledDeck = [...quickQuizQuestions].sort(() => Math.random() - 0.5);
            this.nextBtn?.addEventListener('click', () => this.handleNext());
            this.loadQuestion();
        }

        loadQuestion() {
            if (this.currentIndex >= this.shuffledDeck.length) {
                this.showResults();
                return;
            }

            const q = this.shuffledDeck[this.currentIndex];
            if (this.counterEl) this.counterEl.innerText = `SOALAN ${this.currentIndex + 1} / ${this.shuffledDeck.length}`;
            if (this.scoreBoxEl) this.scoreBoxEl.innerText = `SKOR: ${this.totalScore} XP`;

            this.questionEl.innerText = q.q;
            this.optionsEl.innerHTML = '';
            this.feedbackEl.innerHTML = '';
            this.nextBtn.disabled = true;

            const prefixes = ['A', 'B', 'C', 'D'];
            const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

            shuffledOptions.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerHTML = `<strong>${prefixes[idx]}.</strong> ${opt.text}`;
                btn.onclick = () => this.checkAnswer(btn, opt, shuffledOptions);
                this.optionsEl.appendChild(btn);
            });
        }

        checkAnswer(selectedBtn, selectedOpt, allOptions) {
            this.optionsEl.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
            this.nextBtn.disabled = false;

            if (selectedOpt.correct) {
                selectedBtn.classList.add('correct');
                this.totalScore += 10;
                if (this.scoreBoxEl) this.scoreBoxEl.innerText = `SKOR: ${this.totalScore} XP`;
                this.feedbackEl.innerHTML = `<span class='feedback-success'>✓ TEPAT! ${selectedOpt.rationale} (+10 XP)</span>`;
                saveProgressToAPI('minigame_quiz_q', 10);
                if (window.SirahAudio) window.SirahAudio.correct();
            } else {
                selectedBtn.classList.add('wrong');
                this.feedbackEl.innerHTML = `<span class='feedback-error'>✗ KURANG TEPAT. ${selectedOpt.rationale}</span>`;
                // Highlight jawapan betul
                this.optionsEl.querySelectorAll('.choice-btn').forEach((b, i) => {
                    if (allOptions[i].correct) b.classList.add('correct');
                });
                if (window.SirahAudio) window.SirahAudio.wrong();
            }

            setTimeout(() => {
                this.feedbackEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);

            // Auto-advance selepas 3.5 saat
            if (this.autoNextTimer) clearInterval(this.autoNextTimer);
            let sec = 3;
            this.nextBtn.innerText = `Soalan Seterusnya (${sec}s) →`;

            this.autoNextTimer = setInterval(() => {
                sec--;
                if (sec > 0) {
                    this.nextBtn.innerText = `Soalan Seterusnya (${sec}s) →`;
                } else {
                    clearInterval(this.autoNextTimer);
                    this.autoNextTimer = null;
                    this.handleNext();
                }
            }, 1000);
        }

        handleNext() {
            if (this.autoNextTimer) {
                clearInterval(this.autoNextTimer);
                this.autoNextTimer = null;
            }
            this.nextBtn.innerText = "Soalan Seterusnya →";
            this.currentIndex++;
            this.loadQuestion();
        }

        showResults() {
            const pct = Math.round((this.totalScore / (this.shuffledDeck.length * 10)) * 100);
            let grade = 'MUMTAZ (Cemerlang)';
            if (pct < 60) grade = 'MAQBUL (Perlu Pengukuhan)';
            else if (pct < 80) grade = 'JAYYID (Baik)';

            this.questionEl.innerText = "Keputusan Kuiz Kilat Harian Silibus";
            this.optionsEl.innerHTML = `
                <div style="text-align:center; padding:20px; background:rgba(212,175,55,0.08); border:1px solid var(--color-gold); border-radius:10px;">
                    <h2 style="color:var(--color-gold); font-size:2rem; margin-bottom:8px;">${this.totalScore} XP DIKUMPUL</h2>
                    <p style="font-size:1.1rem; color:#FFF; margin-bottom:6px;">Ketepatan: <strong>${pct}%</strong> — Gred: <strong>${grade}</strong></p>
                    <p style="font-size:0.85rem; color:var(--color-text-muted);">Tahniah! Ulangkaji berterusan membina ingatan sejarah yang kukuh bagi peperiksaan SMU & KSSM.</p>
                </div>
            `;
            this.feedbackEl.innerHTML = '';
            this.nextBtn.innerText = "Ulang Semula Kuiz ↺";
            this.nextBtn.disabled = false;
            this.nextBtn.onclick = () => {
                this.currentIndex = 0;
                this.totalScore = 0;
                this.nextBtn.innerText = "Soalan Seterusnya →";
                this.shuffledDeck = [...quickQuizQuestions].sort(() => Math.random() - 0.5);
                this.nextBtn.onclick = () => this.handleNext();
                this.loadQuestion();
            };
        }
    }

    new QuickQuizManager();
});