document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-register');
    const submitBtn = form.querySelector('button[type="submit"]');
    const feedbackBox = document.getElementById('form-feedback');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        submitBtn.disabled = true;
        feedbackBox.textContent = '';
        feedbackBox.className = 'form-feedback-msg';

        const fullName = document.getElementById('reg-fullname').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const passwordConfirm = document.getElementById('reg-password-confirm').value;

        if (!fullName || !email || !password || !passwordConfirm) {
            showFeedback('Sila lengkapkan semua medan yang diperlukan.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showFeedback('Format emel tidak sah. Sila gunakan emel yang betul.', 'error');
            return;
        }

        if (password.length < 8) {
            showFeedback('Kata laluan mesti mengandungi sekurang-kurangnya 8 aksara.', 'error');
            return;
        }

        if (password !== passwordConfirm) {
            showFeedback('Kata laluan dan pengesahan kata laluan tidak sepadan.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('fullname', fullName);
        formData.append('email', email);
        formData.append('password', password);

        fetch('api/register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showFeedback(data.message, data.status);
            if (data.status === 'success') {
                setTimeout(() => {
                    window.location.href = 'index.html#login';
                }, 2000);
            }
        })
        .catch(error => {
            showFeedback('Ralat rangkaian. Sila cuba lagi.', 'error');
        }).finally(() => { submitBtn.disabled = false; });
    });

    function showFeedback(message, type) {
        feedbackBox.textContent = message;
        feedbackBox.classList.add(type);
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});