/**
 * SIRAHABLE — Settings Page Manager
 * Handles client-side validation for changing a password.
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-change-password');
    const feedbackBox = document.getElementById('form-feedback');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitBtn.disabled = true;
        feedbackBox.textContent = '';
        feedbackBox.className = 'form-feedback-msg';

        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const newPasswordConfirm = document.getElementById('new-password-confirm').value;

        // --- Client-side Validation ---
        if (!currentPassword || !newPassword || !newPasswordConfirm) {
            showFeedback('Sila lengkapkan semua medan kata laluan.', 'error');
            submitBtn.disabled = false;
            return;
        }

        if (newPassword.length < 8) {
            showFeedback('Kata laluan baharu mesti sekurang-kurangnya 8 aksara.', 'error');
            submitBtn.disabled = false;
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            showFeedback('Kata laluan baharu dan pengesahan tidak sepadan.', 'error');
            submitBtn.disabled = false;
            return;
        }

        // --- Send data to PHP backend ---
        fetch('api/change_password.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            showFeedback(data.message, data.status);
            if (data.status === 'success') {
                form.reset(); // Clear form on success
            }
        })
        .catch(error => {
            showFeedback('Ralat rangkaian. Sila cuba lagi.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
        });
    });

    function showFeedback(message, type) {
        feedbackBox.textContent = message;
        feedbackBox.classList.add(type);
    }
});