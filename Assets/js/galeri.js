// Assets/js/galeri.js — SIRAHABLE V2 MUZIUM MAYA KHAZANAH ABBASIYAH
// Interaktiviti penuh: Bilik pameran 2D interaktif, kanta pembesar, titik panas hotspot & penapis koleksi

(function () {
    'use strict';

    // 1. DATASET ARTISAN KHAZANAH ABBASIYAH
    const ARTIFACTS_DATA = [
        {
            id: 'astrolabe',
            title: 'Astrolab Tembaga Emas Al-Asturlabi',
            titleAr: 'الأسطرلاب الفلكي الذهبي',
            category: 'astronomi',
            categoryName: 'Astronomi & Falak',
            year: 'Kurun ke-9 M (Era Khalifah Al-Ma\'mun)',
            origin: 'Bayt al-Hikmah, Madinat al-Salam (Baghdad)',
            creator: 'Maryam Al-Ijliya (Al-Asturlabiya) & Al-Khawarizmi',
            material: 'Tembaga Gangsa Bersadur Emas',
            image: 'Assets/images/artifacts/astrolabe.jpg',
            summary: 'Instrumen falak berketepatan tinggi yang digunakan untuk menentukan waktu solat, arah kiblat, ketinggian matahari, dan peta 48 buruj bintang.',
            article: 'Dicipta dan disempurnakan oleh cendekiawan wanita terkemuka Maryam Al-Ijliya di bawah naungan Khalifah Al-Ma\'mun di Baghdad. Astrolab ini mengintegrasikan fungsi pemerhatian bintang dengan perhitungan trigonometri sferikal, menjadikannya komputer analog terhebat zaman pertengahan yang memacu ekspedisi maritim dunia.',
            spmValue: 'Silibus Bab 4 (Intelektual & Bayt al-Hikmah) — Bukti kemajuan sains Islam yang membolehkan empayar menguasai ilmu maritim, penentuan waktu ibadat, dan navigasi dunia tanpa kompas moden.',
            hotspots: [
                { id: 1, top: '16%', left: '50%', title: 'Halaqah (Cincin Penggantung)', desc: 'Cincin tembaga berat untuk menggantung astrolab secara tegak lurus mengikut tarikan graviti bagi memastikan kejituan ukuran darjah altitud bintang.' },
                { id: 2, top: '48%', left: '46%', title: 'Al-Rete (Peta Buruj Berputar)', desc: 'Plat logam berukir filigri telus yang memetakan kedudukan bintang-bintang utama di langit Baghdad yang boleh diputar mengikut peredaran hari.' },
                { id: 3, top: '76%', left: '50%', title: 'Umm & Safihah (Skala Garis Lintang)', desc: 'Piring tembaga berukir garis ufuk dan azimut yang diselaraskan tepat untuk latitud kota Baghdad dan Makkah bagi penentuan arah kiblat.' }
            ]
        },
        {
            id: 'dinar',
            title: 'Dinar Emas Tulen Khalifah Al-Mansur',
            titleAr: 'الدينار العباسي الذهبي',
            category: 'ekonomi',
            categoryName: 'Mata Wang & Ekonomi',
            year: '762 Masihi (145 Hijrah)',
            origin: 'Dar al-Darb (Pusat Cetakan Diraja), Baghdad',
            creator: 'Khalifah Abu Ja\'far al-Mansur',
            material: 'Emas Tulen 24 Karat (4.25 Gram)',
            image: 'Assets/images/artifacts/dinar.jpg',
            summary: 'Mata wang rasmi daulah dengan ukiran khat Kufi awal melambangkan kedaulatan ekonomi berpusat dan kestabilan Baitulmal.',
            article: 'Ditempa bersempena pembinaan Kota Bulat Baghdad (Madinat al-Salam) pada 762 M. Dinar ini menjadi mata wang perdagangan antarabangsa utama yang diiktiraf di sepanjang Laluan Sutera sehingga ke Eropah dan Kepulauan Melayu, membuktikan kemakmuran sistem perbendaharaan Abbasiyah.',
            spmValue: 'Silibus Bab 3 (Sistem Ekonomi & Kewangan) — Menggambarkan peranan Dinar & Dirham dalam perdagangan maritim antarabangsa serta kecekapan pengurusan Baitulmal dalam mengutip zakat, jizyah, dan kharaj.',
            hotspots: [
                { id: 1, top: '48%', left: '50%', title: 'Kalimah Tauhid Khat Kufi', desc: 'Ukiran timbul pusat bertulis "La ilaha illa Allah Wahdahu La Syarika Lah" yang menegaskan identiti tauhid dan kedaulatan daulah Islam.' },
                { id: 2, top: '24%', left: '50%', title: 'Tarikh & Tempat Cetakan', desc: 'Ukiran bulat di margin luar menyatakan tahun cetakan 145 H dan kota Madinat al-Salam sebagai pusat kewangan rasmi khalifah.' },
                { id: 3, top: '78%', left: '50%', title: 'Piawaian Berat Emas (Mithqal)', desc: 'Ditempa tepat pada berat 4.25 gram emas tulen tanpa campuran logam murah, menjamin kepercayaan penuh pedagang asing.' }
            ]
        },
        {
            id: 'manuscript',
            title: 'Manuskrip Al-Jabr wa al-Muqabala',
            titleAr: 'مخطوطة كتاب الجبر والمقابلة',
            category: 'manuskrip',
            categoryName: 'Naskhah & Manuskrip',
            year: '820 Masihi',
            origin: 'Bayt al-Hikmah (House of Wisdom), Baghdad',
            creator: 'Muhammad bin Musa Al-Khawarizmi',
            material: 'Kertas Rag Tulen & Iluminasi Emas',
            image: 'Assets/images/artifacts/manuscript.jpg',
            summary: 'Naskhah agung yang mengasaskan cabang ilmu Algebra, konsep sifar (zero), dan algoritma moden yang diterjemahkan ke bahasa Latin.',
            article: 'Dihasilkan di bawah perintah Khalifah Al-Ma\'mun di perpustakaan Bayt al-Hikmah. Kitab ini bukan sekadar teori matematik, tetapi dicipta untuk menyelesaikan masalah praktikal undang-undang faraid, pembahagian harta pusaka, sistem perairan, dan perniagaan masyarakat Islam.',
            spmValue: 'Silibus Bab 4 (Ketokohan Intelektual Islam) — Memaparkan revolusi keilmuan Bayt al-Hikmah sebagai pusat penterjemahan dan penyelidikan saintifik terbesar dunia.',
            hotspots: [
                { id: 1, top: '48%', left: '35%', title: 'Rajah Geometri Sferikal', desc: 'Gambar rajah geometri asal yang membuktikan penyelesaian persamaan kuadratik secara visual sebelum dibuktikan dengan persamaan algebra.' },
                { id: 2, top: '22%', left: '48%', title: 'Iluminasi Daun Emas (Arabesque)', desc: 'Hiasan tepi daun emas tulen yang menunjukkan tahap kesenian penjilidan buku mewah era keemasan sains Khalifah Al-Ma\'mun.' },
                { id: 3, top: '65%', left: '65%', title: 'Pengiraan Faraid & Perdagangan', desc: 'Formula perkiraan pembahagian harta pusaka dan sistem sukatan dagang yang direka khusus untuk aplikasi harian masyarakat Islam.' }
            ]
        },
        {
            id: 'sword',
            title: 'Pedang Keluli Damsyik Bersadur Emas',
            titleAr: 'السيف الدمشقي الملكي المرصع',
            category: 'tentera',
            categoryName: 'Ketenteraan & Seni Bina',
            year: 'Kurun ke-9 M (Era Harun al-Rasyid)',
            origin: 'Bengkel Senjata Empayar, Syam & Baghdad',
            creator: 'Pandai Besi Diraja Abbasiyah',
            material: 'Keluli Wootz Damascus, Emas Filigri & Firus',
            image: 'Assets/images/artifacts/sword.jpg',
            summary: 'Pedang tempur elit berkekuatan tinggi dengan alunan corak "air bergelombang" pada bilah yang mampu menembusi perisai besi musuh.',
            article: 'Teknologi peleburan keluli Damsyik (Wootz steel) menggabungkan nanotiub karbon semula jadi, menghasilkan bilah yang sangat tajam, anjal, dan tidak mudah patah. Pedang ini menjadi simbol ketenteraan pengawal khalifah dan ekspedisi pertahanan sempadan Byzantium.',
            spmValue: 'Silibus Bab 2 & 5 (Sistem Ketenteraan & Pertahanan Daulah) — Menggambarkan kecanggihan angkatan tentera darat (Fursan) dan pembahagian kor tentera berkuda Abbasiyah.',
            hotspots: [
                { id: 1, top: '48%', left: '62%', title: 'Corak Alunan Keluli Wootz', desc: 'Struktur kristal mikro keluli berkarbon tinggi yang menghasilkan corak riak air legendaris serta ketajaman yang tahan berdekad.' },
                { id: 2, top: '64%', left: '20%', title: 'Hulu Bertatah Permata Firus', desc: 'Gagang bersalut emas dengan tatahan batu pirus (turquoise) dan lapis lazuli melambangkan darjat panglima tertinggi empayar.' },
                { id: 3, top: '38%', left: '82%', title: 'Bilah Melengkung Kavalri', desc: 'Reka bentuk bilah melengkung khas untuk serangan pantas pasukan berkuda (kavalri) yang mengoptimumkan daya potong.' }
            ]
        },
        {
            id: 'globe',
            title: 'Glob Samawi Logam Falak Baghdad',
            titleAr: 'الكرة السماوية النحاسية',
            category: 'astronomi',
            categoryName: 'Astronomi & Falak',
            year: 'Kurun ke-10 Masihi',
            origin: 'Balai Cerap Shammasiyyah, Baghdad',
            creator: 'Abd al-Rahman al-Sufi (Pengarang Suwar al-Kawakib)',
            material: 'Tembaga Gangsa Bersepuh Emas',
            image: 'Assets/images/artifacts/globe.jpg',
            summary: 'Glob astronomi tiga dimensi yang memetakan kedudukan 1,018 bintang dan 48 buruj astronomi mengikut pemerhatian balai cerap Baghdad.',
            article: 'Glob samawi ini merupakan pencapaian mercu tanda balai cerap Shammasiyyah yang dibina oleh Khalifah Al-Ma\'mun. Para ilmuwan Islam memperbetulkan kesilapan peta bintang Ptolemy dan menamakan bintang-bintang dengan nama Arab yang kekal diguna hingga hari ini.',
            spmValue: 'Silibus Bab 4 (Perkembangan Sains Falak) — Balai cerap terawal dan sumbangan ilmuwan Islam dalam memodenkan ilmu falak dunia serta kalendar takwim.',
            hotspots: [
                { id: 1, top: '34%', left: '54%', title: 'Buruj Al-Jauza\' (Orion) & Al-Thurayya', desc: 'Ukiran figura buruj astronomi lengkap dengan nama-nama bintang Arab klasik yang masih menjadi rujukan astronomi moden.' },
                { id: 2, top: '18%', left: '50%', title: 'Gelang Meridian Tembaga', desc: 'Gelang pembahagi 360 darjah yang membolehkan ahli falak mengira darjah kecondongan paksi bumi dan khatulistiwa samawi.' },
                { id: 3, top: '74%', left: '50%', title: 'Kaki Tripod Geometri Arabesque', desc: 'Tapak sokongan gangsa berat dengan seni ukiran geometri Islam yang memastikan glob stabil ketika mencatat cerapan malam.' }
            ]
        },
        {
            id: 'clock',
            title: 'Jam Air Gajah Automata Al-Jazari',
            titleAr: 'ساعة الفيل الهيدروليكية',
            category: 'kejuruteraan',
            categoryName: 'Robotik & Kejuruteraan',
            year: '1206 Masihi',
            origin: 'Diyarbakir & Baghdad',
            creator: 'Badi\' al-Zaman Al-Jazari (Bapa Robotik Moden)',
            material: 'Tembaga, Seramik & Sistem Hidraulik',
            image: 'Assets/images/artifacts/clock.jpg',
            summary: 'Keajaiban kejuruteraan mekanikal automata pertama di dunia yang menggabungkan prinsip hidraulik air, gear roda, dan simbol kepelbagaian tamadun.',
            article: 'Jam air berbentuk gajah ini berbunyi setiap setengah jam melalui sistem pelampung air tersembunyi yang melepaskan bola tembaga ke mulut naga, menggerakkan patung pemanah, dan membunyikan burung merak mekanikal. Ia menggabungkan keharmonian tamadun dunia dalam satu ciptaan.',
            spmValue: 'Silibus Bab 4 (Inovasi Kejuruteraan & Mekanikal) — Menunjukkan pencapaian agung umat Islam dalam bidang automata berabad-abad sebelum revolusi industri Eropah.',
            hotspots: [
                { id: 1, top: '22%', left: '50%', title: 'Menara Mahkota Automata', desc: 'Mekanisme burung merak mekanikal yang berputar dan berkicau setiap kali setengah jam berlalu menandakan peralihan waktu.' },
                { id: 2, top: '34%', left: '34%', title: 'Naga Hidraulik Pelepasan Bola', desc: 'Sistem tuas berputar yang menyambut bola tembaga dari puncak menara dan menurunkannya ke dalam pasu bunyi di bawah.' },
                { id: 3, top: '65%', left: '52%', title: 'Pelampung Air (Archimedes Sump)', desc: 'Tangki air tersembunyi di dalam perut gajah yang mengawal kadar penurunan masa secara sangat tepat menggunakan hukum apungan air.' }
            ]
        },
        {
            id: 'medical_manuscript',
            title: 'Manuskrip Anatomi & Bimaristan Baghdad',
            titleAr: 'مخطوطة التشريح الطبي بمستشفى بغداد',
            category: 'perubatan',
            categoryName: 'Perubatan & Kesihatan',
            year: 'Kurun ke-9 hingga 10 M',
            origin: 'Bimaristan Al-Adudi, Baghdad',
            creator: 'Abu Bakr Al-Razi (Rhazes) & Al-Zahrawi',
            material: 'Kertas Kapas Iluminasi Emas & Alat Bedah Gangsa',
            image: 'Assets/images/artifacts/medical_manuscript.jpg',
            summary: 'Naskhah perintis anatomi manusia dan pembedahan klinikal terawal bersama alatan bedah tembaga dan balang kaca herba bimaristan.',
            article: 'Bimaristan (hospital) di Baghdad merupakan institusi rawatan moden terawal dunia yang memisahkan wad penyakit mengikut kategori serta melatih doktor melalui ujian klinikal. Manuskrip ini mendokumentasikan sistem saraf, peredaran darah, teknik jahitan luka dengan tali usus sutera, serta formulasi lebih 800 ramuan ubat-ubatan herba.',
            spmValue: 'Silibus Bab 4 (Intelektual Islam) — Menyerlahkan ketokohan sarjana perubatan seperti Al-Razi (pakar hospital & cacar) dan Ibnu Sina, serta sumbangan tamadun Islam mendahului perubatan Barat selama ratusan tahun.',
            hotspots: [
                { id: 1, top: '38%', left: '68%', title: 'Gambarajah Anatomi Vaskular', desc: 'Rajah teliti sistem peredaran darah, jantung, otak dan otot yang menjadi panduan bedah sebelum era mikroskop.' },
                { id: 2, top: '82%', left: '60%', title: 'Peralatan Bedah Tembaga Diraja', desc: 'Skalpel bedah, pinset hemostatik, dan jarum jahitan tembaga yang direka khas untuk operasi katarak mata dan pembedahan dalaman.' },
                { id: 3, top: '75%', left: '88%', title: 'Balang Kaca Farmasi Bimaristan', desc: 'Balang kaca hijau bertulis khat herba ubat (Adwiyat al-Ayn) untuk menyimpan ekstrak minyak pati dan antiseptik semula jadi.' }
            ]
        },
        {
            id: 'lusterware_bowl',
            title: 'Mangkuk Seramik Berkilau Lusterware Basrah',
            titleAr: 'وعاء الخزف ذو البريق المعدني البصري',
            category: 'seni',
            categoryName: 'Seni Kraf & Perdagangan',
            year: 'Kurun ke-9 Masihi',
            origin: 'Bengkel Seramik Diraja, Basrah & Baghdad',
            creator: 'Tukang Kraf Logam & Seramik Daulah',
            material: 'Tembikar Kalsit, Glasir Timah & Pigmen Logam Kilau',
            image: 'Assets/images/artifacts/lusterware_bowl.jpg',
            summary: 'Karya agung seramik teknik "Lusterware" yang memantulkan kilauan emas metalik dengan lingkaran kaligrafi khat Kufi doa keberkatan.',
            article: 'Teknik "Lusterware" adalah inovasi revolusioner ciptaan tukang seramik Abbasiyah di Basrah dan Baghdad pada abad ke-9 bagi menghasilkan kesan kilauan seperti emas tulen pada tembikar tanah liat. Mangkuk ini dihiasi kaligrafi Arab Kufi yang mendoakan "Barakah" (Keberkatan) dan "al-Mulk lillah" (Kerajaan milik Allah), dieksport ke China dan Eropah melalui pelabuhan Basrah.',
            spmValue: 'Silibus Bab 3 & 4 (Kemajuan Ekonomi & Kesenian) — Bukti keagungan industri pembuatan dan seni reka Islam serta perdagangan maritim antarabangsa melalui Lautan Hindi dan Laluan Sutera Laut.',
            hotspots: [
                { id: 1, top: '35%', left: '50%', title: 'Lingkaran Khat Kufi Bibir Mangkuk', desc: 'Inskripsi tulisan khat Kufi timbul yang memuatkan doa kesejahteraan dan pengiktirafan kekuasaan Allah SWT.' },
                { id: 2, top: '55%', left: '50%', title: 'Motif Arabesque Geometri & Flora', desc: 'Ukiran daun palmet berulang yang melambangkan konsep tauhid dan keindahan infiniti dalam seni Islam.' },
                { id: 3, top: '72%', left: '48%', title: 'Glasir Kilau Logam (Metallic Luster)', desc: 'Lapisan oksida perak dan tembaga yang dibakar dalam relau asap rendah oksigen menghasilkan pantulan pelangi berkilau seperti emas.' }
            ]
        },
        {
            id: 'royal_seal',
            title: 'Cincin Mohor Diraja Harun al-Rasyid',
            titleAr: 'خاتم الفص العقيقي للخليفة هارون الرشيد',
            category: 'pentadbiran',
            categoryName: 'Pentadbiran & Piagam',
            year: 'Kurun ke-8 hingga 9 M',
            origin: 'Diwan al-Khatam (Jabatan Mohor), Baghdad',
            creator: 'Pandai Emas Diraja Abbasiyah',
            material: 'Emas 22 Karat, Akik Karnelian & Lilin Meteraian',
            image: 'Assets/images/artifacts/royal_seal.jpg',
            summary: 'Mohor rasmi khalifah bertatah batu akik merah berukir khat Kufi digunakan untuk memeterai warkah diplomatik dan surat rasmi daulah.',
            article: 'Mohor ini merupakan lambang autoriti tertinggi Khalifah Harun al-Rasyid. Di bawah sistem pentadbiran Abbasiyah, setiap titah, pelantikan gabenor wilayah, dan warkah diplomatik antarabangsa (termasuk surat masyhur kepada Maharaja Charlemagne dari Perancis) wajib dimeterai dengan cap cincin ini melalui Diwan al-Khatam bagi mengelakkan sebarang pemalsuan.',
            spmValue: 'Silibus Bab 2 & 3 (Sistem Pentadbiran & Hubungan Luar) — Menggambarkan struktur birokrasi berpusat, peranan Diwan al-Rasa\'il & Diwan al-Khatam, serta diplomasi berwibawa era Khalifah Harun al-Rasyid.',
            hotspots: [
                { id: 1, top: '48%', left: '33%', title: 'Batu Akik Karnelian Berukir Khat', desc: 'Batu permata akik asli yang diukir timbul secara terbalik dengan teks: "Al-Wathiq Billah Harun al-Rashid Amir al-Mu\'minin".' },
                { id: 2, top: '56%', left: '72%', title: 'Meteraian Lilin Merah Diraja', desc: 'Cetakan lilin lebah merah pada piagam perkamen kulit yang mengesahkan ketulenan perintah rasmi khalifah.' },
                { id: 3, top: '48%', left: '16%', title: 'Ikatan Renda Emas Filigri Halus', desc: 'Ukiran filigri renda emas 22 karat membuktikan kemuncak seni pertukangan barangan kemas di ibu kota Baghdad.' }
            ]
        },
        {
            id: 'optics_lens',
            title: 'Kamera Pinhole & Kanta Kitab al-Manazir',
            titleAr: 'حجرة التصوير المظلمة وعدسات كتاب المناظر',
            category: 'sains',
            categoryName: 'Sains Fizik & Optik',
            year: 'Kurun ke-11 Masihi (1021 M)',
            origin: 'Basrah & Kaherah (Tradisi Keilmuan Abbasiyah)',
            creator: 'Al-Hasan Ibnu al-Haitham (Alhazen)',
            material: 'Kotak Tembaga, Kanta Kristal Kuarza & Manuskrip',
            image: 'Assets/images/artifacts/optics_lens.jpg',
            summary: 'Aparatus "Al-Bayt al-Muzlim" (Camera Obscura) dan kanta cembung yang membuktikan cahaya bergerak lurus dan mengasaskan fotografi dunia.',
            article: 'Dicipta oleh sarjana serba boleh Al-Hasan Ibnu al-Haitham. Melalui karya agungnya "Kitab al-Manazir", beliau meruntuhkan teori optik Yunani purba dan membuktikan secara eksperimen bahawa penglihatan berlaku apabila sinaran cahaya memantul daripada objek ke dalam mata. Penemuan konsep kamera obscura dan refraksi kanta melahirkan teknologi kamera dan mikroskop moden.',
            spmValue: 'Silibus Bab 4 (Intelektual Islam) — Bukti kaedah saintifik empirikal moden (Scientific Method) dipelopori oleh ilmuwan Islam berabad-abad sebelum Zaman Renaissance Barat.',
            hotspots: [
                { id: 1, top: '52%', left: '42%', title: 'Bilik Gelap Kamera (Al-Bayt al-Muzlim)', desc: 'Kubu tembaga bersekat dengan lubang halus (aperture) yang memproyeksikan imej luar secara terbalik ke atas skrin dalaman.' },
                { id: 2, top: '64%', left: '18%', title: 'Kanta Cembung Kristal Kuarza', desc: 'Kanta kristal digilap licin untuk membias dan memfokuskan alur cahaya bagi eksperimen sudut biasan (refraction).' },
                { id: 3, top: '64%', left: '70%', title: 'Rajah Geometri Kitab al-Manazir', desc: 'Gambar rajah pembiasan sinaran cahaya dan sudut kon visual yang dilukis tangan oleh Ibnu al-Haitham dengan jangka lukis tembaga.' }
            ]
        }
    ];

    let currentArtifactIndex = 0;
    let activeFilter = 'all';
    let searchQuery = '';

    // 2. INISIALISASI HALAMAN
    document.addEventListener('DOMContentLoaded', () => {
        initAmbientCanvas();
        renderArtifactsGrid();
        setupFilterListeners();
        setupSearchListener();
        setupModalEvents();
        setupNavbarScroll();
    });

    // 3. RENDERING KAD KHAZANAH (ARTIFACTS GRID)
    function renderArtifactsGrid() {
        const gridContainer = document.getElementById('artifacts-grid');
        if (!gridContainer) return;

        // Tapis mengikut kategori & carian
        const filtered = ARTIFACTS_DATA.filter(item => {
            const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
            const matchesSearch = !searchQuery || 
                item.title.toLowerCase().includes(searchQuery) ||
                item.creator.toLowerCase().includes(searchQuery) ||
                item.origin.toLowerCase().includes(searchQuery) ||
                item.summary.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #94A3B8;">
                    <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
                    <h3 style="font-family: 'Cinzel', serif; color: #FFF; margin: 0 0 8px;">Tiada Khazanah Dijumpai</h3>
                    <p style="font-size: 0.9rem;">Sila cuba kata kunci carian lain atau pilih kategori Semua Koleksi.</p>
                </div>
            `;
            return;
        }

        gridContainer.innerHTML = filtered.map((item, idx) => {
            const originalIndex = ARTIFACTS_DATA.findIndex(a => a.id === item.id);
            return `
                <div class="artifact-card" data-index="${originalIndex}">
                    <div class="artifact-card-media">
                        <img src="${item.image}" alt="${item.title}" class="artifact-card-img" loading="lazy">
                        <div class="artifact-card-vignette"></div>
                        <span class="card-category-pill">${item.categoryName}</span>
                        <span class="card-year-pill">${item.year.split('(')[0].trim()}</span>
                    </div>

                    <div class="artifact-card-body">
                        <p class="card-title-arabic">${item.titleAr}</p>
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-desc">${item.summary}</p>

                        <div class="card-specs-row">
                            <div class="spec-cell">
                                <span class="spec-lbl">Tokoh / Pereka</span>
                                <span class="spec-val" title="${item.creator}">${item.creator.split('&')[0].trim()}</span>
                            </div>
                            <div class="spec-cell">
                                <span class="spec-lbl">Lokasi Asal</span>
                                <span class="spec-val" title="${item.origin}">${item.origin.split('(')[0].trim()}</span>
                            </div>
                        </div>

                        <button type="button" class="card-inspect-btn">
                            <span>🔍</span> TELITI KHAZANAH 360°
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Pasang event listener klik pada setiap kad
        gridContainer.querySelectorAll('.artifact-card').forEach(card => {
            const index = parseInt(card.getAttribute('data-index'), 10);
            card.addEventListener('click', () => {
                openArtifactModal(index);
            });

            // Efek Tilt interaktif pada kursor
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotateX = (-y / rect.height) * 8;
                const rotateY = (x / rect.width) * 8;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });
        });
    }

    // 4. PENAPIS & CARIAN
    function setupFilterListeners() {
        const filterBtns = document.querySelectorAll('.museum-cat-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.getAttribute('data-category') || btn.getAttribute('data-cat') || 'all';
                renderArtifactsGrid();
            });
        });
    }

    function setupSearchListener() {
        const searchInput = document.getElementById('search-artifacts');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase().trim();
                renderArtifactsGrid();
            });
        }
    }

    // 5. MODAL INTERAKTIF INSPEKTOR 360°
    function openArtifactModal(index) {
        currentArtifactIndex = index;
        const item = ARTIFACTS_DATA[index];
        if (!item) return;

        const modalBackdrop = document.getElementById('museum-modal');
        if (!modalBackdrop) return;

        // Kemas kini data visual & teks modal
        const imgEl = document.getElementById('modal-img');
        const titleEl = document.getElementById('dossier-title');
        const titleArEl = document.getElementById('dossier-title-ar');
        const catEl = document.getElementById('dossier-category');
        const yearEl = document.getElementById('dossier-year');
        const originEl = document.getElementById('dossier-origin');
        const creatorEl = document.getElementById('dossier-creator');
        const materialEl = document.getElementById('dossier-material');
        const articleEl = document.getElementById('dossier-article');
        const spmEl = document.getElementById('dossier-spm');
        const hotspotsContainer = document.getElementById('hotspots-layer');

        if (imgEl) {
            imgEl.src = item.image;
            imgEl.alt = item.title;
            imgEl.style.transform = 'scale(1) rotate(0deg)';
        }
        if (titleEl) titleEl.textContent = item.title;
        if (titleArEl) titleArEl.textContent = item.titleAr;
        if (catEl) catEl.textContent = item.categoryName;
        if (yearEl) yearEl.textContent = item.year;
        if (originEl) originEl.textContent = item.origin;
        if (creatorEl) creatorEl.textContent = item.creator;
        if (materialEl) materialEl.textContent = item.material;
        if (articleEl) articleEl.textContent = item.article;
        if (spmEl) spmEl.textContent = item.spmValue;

        // Reset info kad hotspot
        const hcb = document.getElementById('hotspot-info-box');
        if (hcb) hcb.classList.remove('active');

        // Jana Titik Panas Hotspot Interaktif
        if (hotspotsContainer) {
            hotspotsContainer.innerHTML = item.hotspots.map((hs, idx) => `
                <div class="hotspot-pin" style="top: ${hs.top}; left: ${hs.left};" data-hs="${idx}" title="${hs.title}">
                    ${hs.id}
                </div>
            `).join('');

            // Pasang event klik pada titik panas
            hotspotsContainer.querySelectorAll('.hotspot-pin').forEach(pin => {
                pin.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const hsIdx = parseInt(pin.getAttribute('data-hs'), 10);
                    const hsData = item.hotspots[hsIdx];
                    showHotspotDetail(hsData, pin);
                });
            });
        }

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function showHotspotDetail(hsData, activePin) {
        const hcb = document.getElementById('hotspot-info-box');
        const hcbTitle = document.getElementById('hcb-title');
        const hcbDesc = document.getElementById('hcb-desc');
        const imgEl = document.getElementById('modal-img');

        if (hcb && hcbTitle && hcbDesc) {
            hcbTitle.innerHTML = `<span>📍</span> ${hsData.title}`;
            hcbDesc.textContent = hsData.desc;
            hcb.classList.add('active');
        }

        // Highlight pin aktif
        document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
        if (activePin) activePin.classList.add('active');

        // Zoom visual sedikit ke arah titik panas
        if (imgEl && hsData) {
            imgEl.style.transform = 'scale(1.18)';
            setTimeout(() => {
                imgEl.style.transform = 'scale(1.08)';
            }, 300);
        }
    }

    function setupModalEvents() {
        const modalBackdrop = document.getElementById('museum-modal');
        const closeBtn = document.getElementById('btn-close-modal');
        const prevBtn = document.getElementById('btn-prev-artifact');
        const nextBtn = document.getElementById('btn-next-artifact');
        const zoomInBtn = document.getElementById('btn-zoom-in');
        const zoomOutBtn = document.getElementById('btn-zoom-out');
        const rotateBtn = document.getElementById('btn-rotate-view');

        const closeModal = () => {
            if (modalBackdrop) modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) closeModal();
            });
        }

        // Kekunci Keyboard (Escape, ArrowLeft, ArrowRight)
        window.addEventListener('keydown', (e) => {
            if (!modalBackdrop || !modalBackdrop.classList.contains('active')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateArtifact(-1);
            if (e.key === 'ArrowRight') navigateArtifact(1);
        });

        // Butang Navigasi Artifak
        if (prevBtn) prevBtn.addEventListener('click', () => navigateArtifact(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => navigateArtifact(1));

        // Butang Kawalan Zoom & Rotate Chamber
        let currentScale = 1.0;
        let currentRotation = 0;

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                currentScale = Math.min(1.6, currentScale + 0.15);
                applyChamberTransform();
            });
        }
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                currentScale = Math.max(0.9, currentScale - 0.15);
                applyChamberTransform();
            });
        }
        if (rotateBtn) {
            rotateBtn.addEventListener('click', () => {
                currentRotation += 90;
                applyChamberTransform();
            });
        }

        function applyChamberTransform() {
            const imgEl = document.getElementById('modal-img');
            if (imgEl) {
                imgEl.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
            }
        }
    }

    function navigateArtifact(dir) {
        let newIndex = currentArtifactIndex + dir;
        if (newIndex < 0) newIndex = ARTIFACTS_DATA.length - 1;
        if (newIndex >= ARTIFACTS_DATA.length) newIndex = 0;
        openArtifactModal(newIndex);
    }

    // 6. NAVBAR SCROLL EFFECT
    function setupNavbarScroll() {
        const navbar = document.getElementById('galeri-navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        });
    }

    // 7. PARTIKEL DEBU EMAS MUZIUM
    function initAmbientCanvas() {
        const canvas = document.getElementById('museum-canvas');
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
                this.size = Math.random() * 2 + 0.6;
                this.speedY = Math.random() * 0.25 + 0.08;
                this.speedX = (Math.random() - 0.5) * 0.15;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.color = Math.random() > 0.4 ? '212, 175, 55' : '56, 189, 248';
            }
            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                if (this.y < 0) this.y = canvas.height;
                if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
            }
            draw() {
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 40; i++) {
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

})();
