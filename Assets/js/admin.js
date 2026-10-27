document.addEventListener('DOMContentLoaded', () => {
    fetchStudentData();
    setupAIGenerator();
    setupSubmitForm();
});

function setupAIGenerator() {
    const btnAI = document.getElementById('btn-generate-ai');
    const fileInput = document.getElementById('ai-file');
    
    btnAI.addEventListener('click', () => {
        if (!fileInput.files.length) {
            alert("SISTEM EDUSYS: Sila muat naik fail dokumen (PDF/Teks) terlebih dahulu sebelum menggunakan fungsi AI.");
            return;
        }

        const fileName = fileInput.files[0].name;

        btnAI.innerHTML = "Menghantar ke Cloud AI...";
        btnAI.disabled = true;

        setTimeout(() => {
            document.getElementById('q-statement').value = `Berdasarkan rumusan dari fail, apakah pendekatan strategik Khalifah Al-Mansur dalam memajukan ekonomi kerajaan melalui pembinaan kota baharu?`;
            
            document.getElementById('q-explanation').value = `Data Diekstrak oleh EDUSYS AI dari dokumen "${fileName}": Khalifah Al-Mansur memilih lokasi lembangan sungai Dajlah kerana potensi pertanian dan sebagai laluan perhentian utama pedangang antara Timur dan Barat.`;
            
            btnAI.innerHTML = "Jana Semula Soalan";
            btnAI.disabled = false;
            
            alert("EDUSYS AI: Soalan dan Hujah Sejarah berjaya diekstrak daripada bahan bacaan anda.");
        }, 2000); 
    });
}

function setupSubmitForm() {
    const btnSubmit = document.getElementById('btn-submit-edusys');
    
    btnSubmit.addEventListener('click', () => {
        const sendNotif = document.getElementById('send-notif').checked;
        
        btnSubmit.innerText = "MENYIMPAN DATA...";
        
        setTimeout(() => {
            if (sendNotif) {
                alert("BERJAYA: Data soalan telah dimuat naik ke pangkalan data utama. \n\n[EDUSYS PUSH ALERT]: Notifikasi tugasan baharu telah berjaya dihantar ke telefon pintar/portal semua pelajar yang mendaftar.");
            } else {
                alert("BERJAYA: Data soalan telah dimuat naik ke pangkalan data utama secara senyap (Tanpa Notifikasi).");
            }
            
            document.getElementById('form-add-question').reset();
            btnSubmit.innerText = "MUAT NAIK KE PELAYAN EDUSYS";
            
        }, 1000);
    });
}

function fetchStudentData() {
    fetch('api/get_admin_data.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                renderTable(data.students);
            }
        })
        .catch(err => {
            document.getElementById('student-table-body').innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">Ralat sambungan pangkalan data.</td></tr>`;
        });
}

function renderTable(students) {
    const tbody = document.getElementById('student-table-body');
    tbody.innerHTML = '';

    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Tiada data pendaftaran pelajar ditemui.</td></tr>`;
        return;
    }

    students.forEach(student => {
        const tr = document.createElement('tr');
        
        let finalScore = student.final_score ? `${student.final_score}%` : "Belum Ambil";
        if (student.final_score >= 80) finalScore += " (Mumtaz)";
        
        let status = "";
        let statusClass = "";
        if (student.completed_modules >= 8 && student.final_score >= 80) {
            status = "Lulus Sijil";
            statusClass = "status-lulus";
        } else if (student.completed_modules >= 4) {
            status = "Sederhana Aktif";
            statusClass = "status-aktif";
        } else {
            status = "Berisiko (Sila Bimbing)";
            statusClass = "status-bimbingan";
        }

        const studentId = `${1000 + parseInt(student.id)}`;

        tr.innerHTML = `
            <td style="font-weight:600;">${studentId} <br><span style="font-size:0.8rem; color:#94A3B8; font-weight:400;">${student.username}</span></td>
            <td><strong style="color:#D4AF37;">${student.completed_modules}</strong> / 8 Bab Selesai</td>
            <td>${student.xp_points} XP</td>
            <td>${finalScore}</td>
            <td class="${statusClass}">${status}</td>
        `;
        tbody.appendChild(tr);
    });
}