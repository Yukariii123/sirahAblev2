/**
 * SIRAHABLE — Achievements Gallery Manager
 * Fetches and displays all available badges and the student's progress.
 */
document.addEventListener('DOMContentLoaded', () => {
    const achievementsManager = new AchievementsManager();
    achievementsManager.init();
});

class AchievementsManager {
    constructor() {
        this.gridContainer = document.getElementById('achievements-grid');
    }

    async init() {
        if (!this.gridContainer) return;
        await this.fetchAndRenderAchievements();
    }

    async fetchAndRenderAchievements() {
        try {
            const response = await fetch('api/get_achievements.php');
            const result = await response.json();

            if (result.status === 'success') {
                this.renderCards(result.data);
            } else {
                if (result.action === 'redirect') window.location.href = result.location;
                else this.gridContainer.innerHTML = `<p>Gagal memuatkan data pencapaian: ${result.message}</p>`;
            }
        } catch (error) {
            console.error('Network error:', error);
            this.gridContainer.innerHTML = '<p>Ralat rangkaian semasa memuatkan data pencapaian.</p>';
        }
    }

    renderCards(data) {
        this.gridContainer.innerHTML = ''; // Clear any placeholders

        data.badges.forEach(badge => {
            const isUnlocked = badge.unlocked_at !== null;
            const cardClass = isUnlocked ? 'unlocked' : 'locked';

            let statusHTML = '';
            if (isUnlocked) {
                const unlockDate = new Date(badge.unlocked_at).toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });
                statusHTML = `<div class="badge-status unlocked-tag">DIANUGERAHKAN PADA ${unlockDate}</div>`;
            } else if (badge.required_xp > 0) {
                const progressPercent = Math.min((data.currentUserXP / badge.required_xp) * 100, 100);
                statusHTML = `
                    <div class="badge-status locked-tag">
                        ${data.currentUserXP} / ${badge.required_xp} MATA ILMU
                    </div>
                    <div class="badge-progress-bar">
                        <div class="badge-progress-fill" style="width: ${progressPercent}%;"></div>
                    </div>
                `;
            } else {
                statusHTML = `<div class="badge-status locked-tag">TERKUNCI</div>`;
            }

            const cardHTML = `
                <div class="badge-showcase-card ${cardClass}">
                    <div class="badge-icon-large">${badge.icon_svg || '◆'}</div>
                    <h3 class="badge-title">${badge.title}</h3>
                    <p class="badge-description">${badge.description}</p>
                    <div class="badge-status-container">
                        ${statusHTML}
                    </div>
                </div>
            `;

            this.gridContainer.innerHTML += cardHTML;
        });
    }
}