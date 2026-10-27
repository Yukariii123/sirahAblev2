/**
 * SIRAHABLE — Enjin Dinamik Dashboard Pelajar (100% Real Data)
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchDashboardData();
    fetchLeaderboardData(); // Tarik data dari database
    setupAIStudyHub();
    setupNavDropdowns();
});

const moduleDescriptions = {
    'mod_intro': 'Revolusi kejatuhan Umayyah dan pertabalan khalifah pertama.',
    'mod_baghdad': 'Seni bina kota bulat dan pusat peradaban dunia Islam.',
    'mod_golden_age': 'Pemerintahan Khalifah Harun al-Rashid & Al-Ma\'mun.',
    'mod_bayt_hikmah': 'Gerakan penterjemahan manuskrip dan arkib ilmu.',
    'mod_achievements': 'Karya algebra Al-Khwarizmi dan inovasi astrolab.',
    'mod_challenges': 'Pengaruh tentera Samarra dan fitnah dalaman istana.',
    'mod_decline': 'Pecahnya kekuasaan khalifah kepada dinasti tempatan.',
    'mod_fall': 'Pengepungan Hulagu Khan dan kemusnahan khazanah ilmu.'
};

function fetchDashboardData() {
    fetch('api/get_dashboard.php')
        .then(response => {
            if (response.status === 401) {
                window.location.href = 'index.html'; 
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data && data.status === 'success') {
                updateDashboardUI(data);
            }
        })
        .catch(error => console.error('Ralat Dashboard:', error));
}

// ==========================================
// FUNGSI DATA LEADERBOARD (100% REAL DB)
// ==========================================
function fetchLeaderboardData() {
    const listContainer = document.getElementById('leaderboard-list');

    // Tembak fail PHP untuk ambil senarai pelajar dari database
    fetch('api/get_leaderboard.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' && data.leaderboard.length > 0) {
                renderLeaderboard(data.leaderboard);
            } else {
                listContainer.innerHTML = '<li class="rank-item" style="justify-content:center; color:#94A3B8;">Belum ada rekod pelajar.</li>';
            }
        })
        .catch(err => {
            console.error("Gagal ambil leaderboard sebenar:", err);
            listContainer.innerHTML = '<li class="rank-item" style="justify-content:center; color:#EF4444;">Gagal berhubung dengan pangkalan data.</li>';
        });
}

function renderLeaderboard(leaderboardData) {
    const listContainer = document.getElementById('leaderboard-list');
    listContainer.innerHTML = ''; // Kosongkan list

    leaderboardData.forEach((student, index) => {
        let rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
        let rankMedal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;

        const li = document.createElement('li');
        li.className = `rank-item ${rankClass}`;
        li.innerHTML = `
            <span class="rank-num">${rankMedal}</span>
            <span class="rank-name">${student.name}</span>
            <span class="rank-xp">${student.xp} XP</span>
        `;
        listContainer.appendChild(li);
    });
}

// ==========================================
// KEMAS KINI UI DASHBOARD 
// ==========================================
function updateDashboardUI(data) {
    document.getElementById('student-name').innerText = data.user.username;
    document.getElementById('dash-xp').innerText = data.user.xp_points + " XP";
    document.getElementById('dash-streak').innerText = data.user.learning_streak + " Hari";
    
    document.getElementById('dash-percent').innerText = data.stats.percent + "%";
    document.getElementById('progress-indicator-text').innerText = `${data.stats.completed} / ${data.stats.total_modules} Bab Selesai`;
    
    setTimeout(() => {
        document.getElementById('overall-bar-fill').style.width = data.stats.percent + "%";
    }, 500);

    const modulesContainer = document.getElementById('modules-flow-container');
    if (modulesContainer) modulesContainer.innerHTML = '';

    data.modules.forEach(mod => {
        let statusClass = "locked";
        let statusTag = `<span class="status-tag">TERKUNCI 🔒</span>`;
        let onClickAction = "";
        
        if (mod.is_completed == 1) {
            statusClass = "completed";
            statusTag = `<span class="status-tag">SELESAI ✓</span>`;
            onClickAction = `onclick="window.location.href='game.html?module=${mod.module_key}'"`;
        } else if (mod.is_unlocked == 1 || mod.sequence_order == 1) {
            statusClass = "active-pulse";
            statusTag = `<span class="status-tag">TEROKA SEKARANG ✦</span>`;
            onClickAction = `onclick="window.location.href='game.html?module=${mod.module_key}'"`;
        }

        let seqNum = mod.sequence_order.toString().padStart(2, '0');
        let desc = moduleDescriptions[mod.module_key] || 'Modul Silibus Sejarah Tamadun Islam.';

        const modCardHTML = `
            <div class="mod-card ${statusClass}" data-module-key="${mod.module_key}" ${onClickAction}>
                <div class="mod-top">
                    ${statusTag}
                    <span class="mod-num">${seqNum}</span>
                </div>
                <h4>${mod.title}</h4>
                <p>${desc}</p>
            </div>
        `;
        if (modulesContainer) modulesContainer.innerHTML += modCardHTML;
    });

    const badgesSection = document.getElementById('badges-container');
    if(badgesSection && data.badges) {
        badgesSection.innerHTML = '';
        data.badges.forEach(badge => {
            let statusClass = badge.is_earned == 1 ? 'unlocked' : 'locked';
            let statusText = badge.is_earned == 1 ? 'Dianugerahkan' : `Perlu ${badge.required_xp} XP`;
            
            const badgeHTML = `
                <div class="badge-item ${statusClass}">
                    <div class="badge-circle">${badge.icon_emblem}</div>
                    <div class="badge-text">
                        <h4>${badge.title}</h4>
                        <p>${statusText}</p>
                    </div>
                </div>
            `;
            badgesSection.innerHTML += badgeHTML;
        });
    }
}

// ==========================================
// PUSAT TELAAH AI (PENJANA RUMUSAN & FLASHCARDS SEBENAR)
// ==========================================
let currentAudioSummary = null;

function setupAIStudyHub() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const btnBrowse = document.getElementById('btn-browse-file');
    const btnTogglePaste = document.getElementById('btn-toggle-paste');
    const pasteBox = document.getElementById('paste-box');
    const pasteInput = document.getElementById('paste-input');
    const btnSubmitPaste = document.getElementById('btn-submit-paste');

    const processingUI = document.getElementById('ai-processing');
    const resultsUI = document.getElementById('ai-results');
    const btnNewUpload = document.getElementById('btn-new-upload');
    const btnAudioSummary = document.getElementById('btn-audio-summary');

    if (!btnBrowse) return;

    btnBrowse.addEventListener('click', () => fileInput.click());

    if (btnTogglePaste && pasteBox) {
        btnTogglePaste.addEventListener('click', () => {
            pasteBox.classList.toggle('hidden');
            if (!pasteBox.classList.contains('hidden') && pasteInput) {
                pasteInput.focus();
            }
        });
    }

    if (btnSubmitPaste) {
        btnSubmitPaste.addEventListener('click', () => {
            const text = pasteInput.value.trim();
            if (!text) {
                alert("Sila taip atau tampal nota anda terlebih dahulu.");
                return;
            }
            submitNoteText(text);
        });
    }

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            uploadFileToAI(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            uploadFileToAI(this.files[0]);
        }
    });

    if (btnNewUpload) {
        btnNewUpload.addEventListener('click', () => {
            if (currentAudioSummary) {
                currentAudioSummary.pause();
                currentAudioSummary = null;
            }
            resultsUI.classList.add('hidden');
            dropzone.classList.remove('hidden');
            fileInput.value = '';
            if (pasteInput) pasteInput.value = '';
            if (btnAudioSummary) {
                btnAudioSummary.innerText = "🔊 Dengar Rumusan TV3";
                btnAudioSummary.classList.remove('playing');
            }
        });
    }

    function uploadFileToAI(file) {
        dropzone.classList.add('hidden');
        processingUI.classList.remove('hidden');
        resultsUI.classList.add('hidden');

        const formData = new FormData();
        formData.append('file', file);

        fetch('api/ai_summarize.php', {
            method: 'POST',
            body: formData
        })
        .then(async res => {
            const resData = await res.json().catch(() => null);
            processingUI.classList.add('hidden');
            if (res.ok && resData && resData.status === 'success') {
                renderAIResults(resData);
            } else {
                alert("Makluman AI: " + (resData?.message || "Gagal memproses fail nota. Sila pastikan fail mengandungi teks."));
                dropzone.classList.remove('hidden');
            }
        })
        .catch(err => {
            console.error("Upload error:", err);
            processingUI.classList.add('hidden');
            alert("Ralat rangkaian semasa memproses fail.");
            dropzone.classList.remove('hidden');
        });
    }

    function submitNoteText(text) {
        dropzone.classList.add('hidden');
        processingUI.classList.remove('hidden');
        resultsUI.classList.add('hidden');

        fetch('api/ai_summarize.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: text,
                title: "Nota_Peribadi_Pelajar.txt"
            })
        })
        .then(async res => {
            const resData = await res.json().catch(() => null);
            processingUI.classList.add('hidden');
            if (res.ok && resData && resData.status === 'success') {
                renderAIResults(resData);
            } else {
                alert("Makluman AI: " + (resData?.message || "Gagal memproses teks."));
                dropzone.classList.remove('hidden');
            }
        })
        .catch(err => {
            console.error("Text error:", err);
            processingUI.classList.add('hidden');
            alert("Ralat rangkaian semasa memproses teks.");
            dropzone.classList.remove('hidden');
        });
    }

    function renderAIResults(resData) {
        const d = resData.data;
        resultsUI.classList.remove('hidden');

        // Kemaskini Header
        document.getElementById('res-file-name').innerText = resData.filename || 'Nota_Pelajar';
        document.getElementById('res-title').innerText = d.title || 'Rumusan Nota Pelajar';
        
        const xpBadge = document.getElementById('res-xp-badge');
        if (xpBadge) {
            xpBadge.innerText = (resData.xp_awarded ? `+${resData.xp_awarded}` : '+25') + ' XP Diperoleh! ✦';
            // Kemaskini jumlah XP pada UI profil
            const xpValEl = document.getElementById('dash-xp');
            if (xpValEl) {
                const cur = parseInt(xpValEl.innerText) || 0;
                xpValEl.innerText = (cur + 25) + " XP";
            }
        }

        // Rumusan & Key Points
        document.getElementById('res-summary-text').innerText = d.summary;

        const keyPointsList = document.getElementById('res-key-points');
        keyPointsList.innerHTML = '';
        (d.key_points || []).forEach(pt => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>•</strong> ${pt}`;
            keyPointsList.appendChild(li);
        });

        // Keywords
        const kwWrap = document.getElementById('res-keywords');
        kwWrap.innerHTML = '';
        (d.keywords || []).forEach(kw => {
            const tag = document.createElement('span');
            tag.className = 'keyword-tag';
            tag.innerText = `#${kw}`;
            kwWrap.appendChild(tag);
        });

        // Flashcards
        const fcGrid = document.getElementById('flashcard-container');
        fcGrid.innerHTML = '';
        (d.flashcards || []).forEach(fc => {
            const card = document.createElement('div');
            card.className = 'flashcard';
            card.innerHTML = `
                <div class="fc-q">${fc.q} <span style="font-size:0.75rem; color:var(--dash-gold); display:block; margin-top:8px;">[Tekan untuk jawapan]</span></div>
                <div class="fc-a">${fc.a}</div>
            `;
            card.addEventListener('click', () => card.classList.toggle('flipped'));
            fcGrid.appendChild(card);
        });

        // Setup Kuiz Uji Minda
        const quizSection = document.getElementById('ai-quiz-section');
        const quizContainer = document.getElementById('ai-quiz-container');
        if (quizSection && quizContainer) {
            if (d.quiz && d.quiz.length > 0) {
                quizSection.classList.remove('hidden');
                quizContainer.innerHTML = '';
                d.quiz.forEach((qItem, qIdx) => {
                    const card = document.createElement('div');
                    card.className = 'ai-quiz-card';
                    card.innerHTML = `<div class="ai-quiz-q">${qIdx + 1}. ${qItem.q}</div>`;

                    const optWrap = document.createElement('div');
                    qItem.options.forEach((opt, optIdx) => {
                        const optBtn = document.createElement('button');
                        optBtn.className = 'ai-quiz-opt';
                        optBtn.innerText = opt;
                        optBtn.addEventListener('click', () => {
                            Array.from(optWrap.children).forEach(b => b.disabled = true);
                            if (optIdx === qItem.correct) {
                                optBtn.classList.add('correct');
                                optBtn.innerText += " ✓ (Tepat!)";
                            } else {
                                optBtn.classList.add('wrong');
                                optWrap.children[qItem.correct].classList.add('correct');
                                optWrap.children[qItem.correct].innerText += " ✓ (Jawapan Sebenar)";
                            }
                        });
                        optWrap.appendChild(optBtn);
                    });

                    card.appendChild(optWrap);
                    quizContainer.appendChild(card);
                });
            } else {
                quizSection.classList.add('hidden');
            }
        }

        // Setup Butang Audio TV3
        if (btnAudioSummary) {
            btnAudioSummary.onclick = () => {
                if (currentAudioSummary && !currentAudioSummary.paused) {
                    currentAudioSummary.pause();
                    btnAudioSummary.innerText = "🔊 Dengar Rumusan TV3";
                    btnAudioSummary.classList.remove('playing');
                } else {
                    btnAudioSummary.innerText = "⏹ Berhenti Main Audio";
                    btnAudioSummary.classList.add('playing');
                    
                    const textToRead = d.summary.substring(0, 400);
                    const audioUrl = `api/tts.php?text=${encodeURIComponent(textToRead)}&voice=osman`;
                    
                    if (currentAudioSummary) {
                        currentAudioSummary.pause();
                    }
                    currentAudioSummary = new Audio(audioUrl);
                    currentAudioSummary.onended = () => {
                        btnAudioSummary.innerText = "🔊 Dengar Rumusan TV3";
                        btnAudioSummary.classList.remove('playing');
                    };
                    currentAudioSummary.onerror = () => {
                        btnAudioSummary.innerText = "🔊 Dengar Rumusan TV3";
                        btnAudioSummary.classList.remove('playing');
                    };
                    currentAudioSummary.play();
                }
            };
        }

        resultsUI.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Kawalan Menu Bar & Dropdown Dashboard Pelajar
function setupNavDropdowns() {
    const toggleBtn = document.getElementById('btn-mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                toggleBtn.classList.remove('active');
                navMenu.classList.remove('open');
            }
        });
    }

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