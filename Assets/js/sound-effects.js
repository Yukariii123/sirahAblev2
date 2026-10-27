// Assets/js/sound-effects.js
// SIRAHABLE V2 — SISTEM AUDIO DINYAHAKTIFKAN SEPENUHNYA
// Lagu latar belakang dan semua kesan bunyi telah dimatikan mengikut arahan pengguna.

(function (window) {
    'use strict';

    // Objek palsu (stub) senyap untuk mengelakkan ralat rujukan dalam modul kuiz atau game
    const silentAudioStub = {
        ctx: null,
        isMuted: true,
        audioActive: false,
        isBgmPlaying: false,
        isWarPlaying: false,
        isMarching: false,

        initContext: () => null,
        btnClick: () => {},
        btnHover: () => {},
        click: () => {},
        swordClash: () => {},
        goldCoins: () => {},
        pageTurn: () => {},
        woodTap: () => {},
        warHorn: () => {},
        warDrums: () => {},
        correct: () => {},
        wrong: () => {},
        victory: () => {},
        playChapterTheme: () => {},

        startBGM: () => {},
        stopBGM: () => {},
        toggleBGM: () => false,

        startWarAmbience: () => {},
        stopWarAmbience: () => {},
        toggleWarAmbience: () => false,

        startBattleMarchDrums: () => {},
        stopBattleMarchDrums: () => {},

        startAllBackground: () => {},
        stopAllBackground: () => {},
        toggleAllBackground: () => false,

        updateAllAudioUi: () => {},
        injectBgmWidget: () => {},
        toggleMute: () => true,
        setSfxVolume: () => {},
        setBgmVolume: () => {},
        setWarVolume: () => {}
    };

    window.SirahAudio = silentAudioStub;

    // Bersihkan sebarang widget lama jika pernah wujud dalam DOM
    document.addEventListener('DOMContentLoaded', () => {
        const oldWidget = document.getElementById('sirah-bgm-widget');
        if (oldWidget) oldWidget.remove();
        const oldToggle = document.getElementById('btn-audio-toggle');
        if (oldToggle) oldToggle.remove();
        const oldBgmBtn = document.getElementById('btn-nav-bgm-toggle');
        if (oldBgmBtn) oldBgmBtn.remove();
    });

})(window);
