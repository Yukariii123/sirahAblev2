/**
 * SIRAHABLE — 2.5D Adventure Engine (EDUCATIONAL GAMIFICATION & INCLUSIVE LEARNING EDITION)
 * Dilengkapi 5 Mini-Game Interaktif Silibus, Sistem Pembayang (Scaffolding), dan Mod Belajar Inklusif.
 */

// ==========================================
// 1. DATA KANDUNGAN PENDIDIKAN (5 BAB SILIBUS ABBASIYAH)
// ==========================================
const CHAPTERS_DATA = {
    1: {
        id: 1, title: "BAB 1 – KEBANGKITAN DINASTI ABBASIYAH", theme: "rise",
        splashDesc: "Menjejaki bayang revolusi di bumi padang pasir Khurasan (750 M)...",
        skyColor: ["#2B1B10", "#4A3525", "#8B6B4A"], worldWidth: 3400,
        entities: [
            {
                id: "c1_npc_1", type: "npc", x: 600, role: "Perisik Revolusi", name: "Abu Muslim",
                story: {
                    title: "Gerakan Bawah Tanah",
                    text: "Sshh... perlahankan suaramu. Kebangkitan sedang bermula di Khurasan. Atas nama keturunan bapa saudara Nabi (Al-Abbas), kami telah menyatukan golongan Mawali dan rakyat yang tertindas oleh pentadbiran Umayyah.",
                    question: "Apakah strategi utama yang digunakan oleh pengasas Bani Abbasiyah pada peringkat awal untuk menjatuhkan kerajaan Umayyah?",
                    hint: "Fikirkan tentang bagaimana pergerakan rahsia digerakkan secara senyap di wilayah Khurasan sebelum melancarkan tentera terbuka.",
                    options: [
                        { text: "Menggerakkan kempen sulit dan penyatuan golongan Mawali (Revolusi)", correct: true },
                        { text: "Memenangi pilihan raya secara aman", correct: false },
                        { text: "Membeli keseluruhan wilayah Umayyah menggunakan emas", correct: false },
                        { text: "Berundur dan membina kerajaan baharu di Eropah", correct: false }
                    ],
                    explanation: "Tepat! Mereka menggunakan kempen rahsia yang bermula di Khurasan bagi membela hak golongan Mawali sebelum melancarkan serangan terbuka secara besar-besaran."
                }
            },
            {
                id: "c1_npc_2", type: "npc", x: 1300, role: "Ahli Sejarah", name: "Ibn Kathir",
                story: {
                    title: "Khalifah Pertama Abbasiyah (750 M)",
                    text: "Akhirnya pada tahun 750 M, kerajaan Umayyah tumbang dalam Pertempuran Zab. Bermulalah era pemerintahan Bani Abbasiyah yang meletakkan pusat pentadbiran awal mereka di Kufah dan Al-Anbar.",
                    question: "Siapakah tokoh yang telah diisytiharkan sebagai Khalifah pertama bagi kerajaan Abbasiyah?",
                    hint: "Beliau bergelar 'As-Saffah' yang memimpin fasa peralihan kuasa pertama di Kufah.",
                    options: [
                        { text: "Abu al-Abbas As-Saffah", correct: true },
                        { text: "Harun al-Rashid", correct: false },
                        { text: "Umar Abdul Aziz", correct: false },
                        { text: "Abu Ja'far al-Mansur", correct: false }
                    ],
                    explanation: "Fakta yang betul! Abu al-Abbas As-Saffah adalah pengasas dan khalifah pertama yang meletakkan asas kukuh kerajaan Abbasiyah."
                }
            },
            {
                id: "c1_obj_1", type: "object", x: 2000, name: "Peta Strategik", icon: "PETA",
                story: {
                    title: "Perpindahan Pusat Kuasa ke Iraq",
                    text: "Peta ini menunjukkan peralihan laluan kuasa dari Damsyik (Syria) ke Kufah (Iraq). Dinasti baharu ini menyedari bahawa Iraq adalah lokasi yang lebih subur dan strategik untuk mengawal perdagangan antara Timur dan Barat.",
                    rewardXP: 10
                }
            },
            {
                id: "c1_mg_1", type: "minigame", x: 2700, name: "Mohor Garis Masa", icon: "GARIS MASA",
                gameType: "timeline",
                story: {
                    title: "Mini-Game 1: Susunan Garis Masa Revolusi Abbasiyah",
                    text: "Susun 4 peristiwa penting kebangkitan Khilafah Abbasiyah mengikut turutan masa yang tepat dari fasa awal hingga pengisytiharan khalifah."
                }
            }
        ]
    },
    2: {
        id: 2, title: "BAB 2 – MADINAT AL-SALAM (KOTA BAGHDAD)", theme: "baghdad",
        splashDesc: "Melangkah masuk ke Kota Kedamaian, mercu tanda kejuruteraan Islam (762 M)...",
        skyColor: ["#071426", "#0D5C46", "#D4AF37"], worldWidth: 3400,
        entities: [
            {
                id: "c2_npc_1", type: "npc", x: 600, role: "Arkitek Diraja", name: "Hajjaj bin Artat",
                story: {
                    title: "Pembinaan Kota Bulat (762 M)",
                    text: "Atas titah Khalifah Abu Ja'far al-Mansur, saya merancang kota ini dalam bentuk bulatan yang sempurna. Ia mengambil masa 4 tahun dan ribuan pekerja untuk menyiapkannya. Kami memanggilnya Madinat al-Salam (Kota Kedamaian).",
                    question: "Apakah keunikan utama seni bina Kota Baghdad yang menjadikannya antara kota paling terancang pada zaman pertengahan?",
                    hint: "Reka bentuk kota ini mempunyai titik tengah yang menempatkan istana dan masjid, dikelilingi tembok melingkar.",
                    options: [
                        { text: "Reka bentuk Kota Bulat sepusat dengan Istana dan Masjid Agung di tengah", correct: true },
                        { text: "Dibina melayang di atas permukaan air sungai Dajlah", correct: false },
                        { text: "Mempunyai piramid besar sebagai pusat pentadbiran", correct: false },
                        { text: "Hanya menggunakan bongkah ais dari utara", correct: false }
                    ],
                    explanation: "Benar! Bentuk bulat dengan empat pintu gerbang utama memagari istana dan pusat ibadah, menjadikannya sangat kukuh dan terancang dari segi keselamatan."
                }
            },
            {
                id: "c2_obj_1", type: "object", x: 1300, name: "Pelan 4 Pintu Gerbang", icon: "PELAN",
                story: {
                    title: "Empat Penjuru Dunia",
                    text: "Empat pintu gerbang utama dinamakan Pintu Kufah, Pintu Basrah, Pintu Khurasan, dan Pintu Syam. Reka bentuk ini melambangkan keterbukaan ekonomi Abbasiyah menerima kafilah dagang dari seluruh pelusuk dunia.",
                    rewardXP: 10
                }
            },
            {
                id: "c2_npc_2", type: "npc", x: 2000, role: "Saudagar Basrah", name: "Pedagang Basrah",
                story: {
                    title: "Pusat Ekonomi Antarabangsa",
                    text: "Alhamdulillah, perniagaan sangat maju! Lembah subur di antara Sungai Dajlah (Tigris) dan Furat (Euphrates) membolehkan kapal dagang berlabuh terus, membawa rempah dari India dan sutera dari China.",
                    question: "Bagaimanakah kedudukan geografi Baghdad membantu ia muncul sebagai pusat ekonomi antarabangsa?",
                    hint: "Ingat kembali dua batang sungai agung yang mengalir di bumi Iraq.",
                    options: [
                        { text: "Terletak di lembah subur di antara Sungai Dajlah (Tigris) dan Sungai Furat", correct: true },
                        { text: "Tersembunyi di dalam gua pergunungan yang sukar dicapai musuh", correct: false },
                        { text: "Terletak jauh di tengah gurun pasir Sahara yang tandus", correct: false },
                        { text: "Hanya dikelilingi oleh lautan luas tanpa tanah daratan", correct: false }
                    ],
                    explanation: "Tepat. Sistem Sungai Dajlah dan Furat membolehkan pengangkutan kapal air berjalan lancar, selain membekalkan sistem pengairan pertanian yang subur."
                }
            },
            {
                id: "c2_mg_1", type: "minigame", x: 2700, name: "Pelan Madinat al-Salam", icon: "KOTA",
                gameType: "build_city",
                story: {
                    title: "Mini-Game 2: Seni Bina Kota Bulat Madinat al-Salam",
                    text: "Bantu Khalifah Al-Mansur menyusun komponen utama Kota Bulat: Pusat Istana/Masjid serta 4 Pintu Gerbang utama ke arah mata angin yang betul."
                }
            }
        ]
    },
    3: {
        id: 3, title: "BAB 3 – ERA KEGEMILANGAN & BAYT AL-HIKMAH", theme: "golden",
        splashDesc: "Menyingkap khazanah intelek di perpustakaan terulung dunia...",
        skyColor: ["#0A1D37", "#1E3B5C", "#E2C044"], worldWidth: 3800,
        entities: [
            {
                id: "c3_npc_1", type: "npc", x: 600, role: "Ketua Penterjemah", name: "Hunayn ibn Ishaq",
                story: {
                    title: "Pusat Penyelidikan Bayt al-Hikmah",
                    text: "Selamat datang ke Bayt al-Hikmah. Khalifah Harun al-Rashid mengasaskannya dan Al-Ma'mun memperluaskannya. Kami menterjemah manuskrip Yunani, Parsi dan India ke Bahasa Arab, dan menimbang naskhah dengan emas!",
                    question: "Apakah peranan utama institusi Bayt al-Hikmah yang mencetuskan Zaman Keemasan Tamadun Islam?",
                    hint: "Ia berfungsi sebagai perpustakaan agung, biro penterjemahan dan akademi penyelidikan pelbagai disiplin sains.",
                    options: [
                        { text: "Pusat penterjemahan, penyelidikan sains dan arkib khazanah ilmu sedunia", correct: true },
                        { text: "Pusat latihan seni mempertahankan diri untuk tentera berkuda semata-mata", correct: false },
                        { text: "Kubu pertahanan terakhir bagi melindungi keluarga diraja", correct: false },
                        { text: "Penjara bagi kurungan sarjana-sarjana dari luar", correct: false }
                    ],
                    explanation: "Fakta yang cemerlang! Bayt al-Hikmah berfungsi sebagai institusi akademik agung yang menghimpunkan ilmuwan pelbagai bangsa dan agama."
                }
            },
            {
                id: "c3_obj_1", type: "object", x: 1300, name: "Astrolab Tembaga", icon: "ASTROLAB",
                story: {
                    title: "Inovasi Ilmu Falak & Astrolab",
                    text: "Satu instrumen canggih ciptaan sarjana astronomi Islam untuk mengukur kedudukan bintang, mengira waktu solat, menentukan arah kiblat dengan tepat, dan menjadi panduan pelayar lautan.",
                    rewardXP: 10
                }
            },
            {
                id: "c3_npc_2", type: "npc", x: 2000, role: "Bapa Matematik", name: "Al-Khwarizmi",
                story: {
                    title: "Kelahiran Ilmu Algebra & Sifar",
                    text: "Melalui cerapan angka dari tamadun timur, saya merangka sistem perpuluhan, angka sifar (0), dan menyusun formula pengiraan yang kini dikenali sebagai 'Al-Jabr' (Algebra).",
                    question: "Selain penemuan ilmu Algebra, apakah sumbangan besar Al-Khwarizmi dalam bidang sains?",
                    hint: "Karyanya membetulkan peta dunia Claudius Ptolemy dan menyusun sifir falak (Zij).",
                    options: [
                        { text: "Melukis peta dunia yang tepat dan memperkenalkan angka sifar ke dunia", correct: true },
                        { text: "Mencipta teleskop optik gergasi pertama", correct: false },
                        { text: "Membina kapal selam untuk meneroka lautan", correct: false },
                        { text: "Mendakwa bahawa bentuk bumi adalah leper", correct: false }
                    ],
                    explanation: "Hebat! Buku-buku beliau mengenai algebra dan algoritma telah menjadi rujukan utama universiti Eropah berabad-abad lamanya."
                }
            },
            {
                id: "c3_obj_2", type: "object", x: 2700, name: "Manuskrip Al-Hawi", icon: "PERUBATAN",
                story: {
                    title: "Sumbangan Abu Bakar Al-Razi (Perubatan)",
                    text: "Karya agung 'Al-Hawi Fi Al-Tibb' merakamkan kajian awal mengenai perbezaan penyakit cacar dan campak, serta memperkenalkan penggunaan benang jahitan luka dan alkohol klinikal.",
                    rewardXP: 10
                }
            },
            {
                id: "c3_mg_1", type: "minigame", x: 3400, name: "Makmal Bayt al-Hikmah", icon: "BAYT AL-HIKMAH",
                gameType: "bayt_hikmah",
                story: {
                    title: "Mini-Game 3: Makmal Sarjana & Falak Bayt al-Hikmah",
                    text: "Uji kepakaran anda: Padankan 4 sarjana Islam dengan sumbangan agung mereka, kemudian laraskan jarum Astrolab ke arah Kiblat yang tepat."
                }
            }
        ]
    },
    4: {
        id: 4, title: "BAB 4 – PERGOLAKAN POLITIK & KEMEROSOTAN", theme: "decline",
        splashDesc: "Mengharungi zaman kekelaman di mana kuasa pusat mula retak...",
        skyColor: ["#0A0D14", "#1F1924", "#4A2E15"], worldWidth: 3400,
        entities: [
            {
                id: "c4_npc_1", type: "npc", x: 600, role: "Panglima Samarra", name: "Tentera Pengawal",
                story: {
                    title: "Campur Tangan Tentera",
                    text: "Kami, barisan tentera pengawal berbangsa Turki yang ditubuhkan sejak zaman Khalifah Al-Mu'tasim di Samarra, kini mengawal penuh urusan istana. Khalifah hanyalah lambang; kamilah yang menentukan jatuh bangun takhta!",
                    question: "Apakah kesan buruk daripada campur tangan melampau pegawai tentera dalam urusan pentadbiran khalifah?",
                    hint: "Pergolakan ini dikenali sebagai Fitnah Samarra yang melenyapkan kewibawaan mutlak seorang khalifah.",
                    options: [
                        { text: "Institusi Khalifah hilang wibawa dan mencetuskan perebutan kuasa dalaman", correct: true },
                        { text: "Ekonomi negara melonjak naik dengan mendadak", correct: false },
                        { text: "Khalifah mendapat sokongan mutlak seluruh wilayah", correct: false },
                        { text: "Tiada musuh luar berani mendekati empayar", correct: false }
                    ],
                    explanation: "Tepat. Perebutan kuasa antara jeneral tentera menyebabkan banyak pembunuhan khalifah dan melemahkan teras pertahanan kerajaan Abbasiyah."
                }
            },
            {
                id: "c4_obj_1", type: "object", x: 1300, name: "Cop Mohor Retak", icon: "MOHOR",
                story: {
                    title: "Pemisahan Wilayah Naungan",
                    text: "Kelemahan kerajaan pusat menyebabkan wilayah-wilayah naungan seperti Parsi, Mesir, dan Afrika Utara mula mengisytiharkan pemerintahan sendiri dan tidak lagi menyalurkan cukai ke Baghdad.",
                    rewardXP: 10
                }
            },
            {
                id: "c4_npc_2", type: "npc", x: 2000, role: "Wazir Istana", name: "Pegawai Kewangan",
                story: {
                    title: "Kemelesetan Ekonomi & Baitulmal",
                    text: "Baitulmal semakin susut! Kos menyara tentera upahan sangat tinggi, manakala hasil pertanian di Iraq rosak akibat sistem pengairan yang tidak diselenggara kesan daripada konflik berpanjangan.",
                    question: "Pernyataan di atas merujuk kepada faktor kemerosotan empayar dari sudut apa?",
                    hint: "Ia berkait rapat dengan pengurusan perbendaharaan negara dan pendapatan hasil mahsul.",
                    options: [
                        { text: "Kemerosotan Ekonomi dan kelemahan tadbir urus sumber Baitulmal", correct: true },
                        { text: "Kemerosotan dalam sistem ketenteraan laut antarabangsa", correct: false },
                        { text: "Kekurangan jumlah ulama dan sarjana agama", correct: false },
                        { text: "Pencemaran udara akibat kilang perindustrian", correct: false }
                    ],
                    explanation: "Pemberontakan dan kelemahan kutipan cukai telah menguras perbendaharaan negara hingga melumpuhkan pembangunan dan kestabilan empayar."
                }
            },
            {
                id: "c4_obj_2", type: "object", x: 2600, name: "Diari Gabenor", icon: "CATATAN",
                story: {
                    title: "Konflik Mazhab & Perpecahan Sosial",
                    text: "Tercatat di sini tentang perbalahan ideologi antara pelbagai kelompok mazhab dan bangsa yang merosakkan perpaduan masyarakat majmuk di kota Baghdad.",
                    rewardXP: 10
                }
            },
            {
                id: "c4_mg_1", type: "minigame", x: 3000, name: "Dilema Wazir", icon: "DILEMA",
                gameType: "dilemma",
                story: {
                    title: "Mini-Game 4: Dilema Wazir (Simulasi Keputusan Sejarah)",
                    text: "Sebagai penasihat khalifah, buat keputusan pentadbiran terbaik untuk menangani ketidakstabilan empayar dan krisis Baitulmal."
                }
            }
        ]
    },
    5: {
        id: 5, title: "BAB 5 – PENGEPUNGAN BAGHDAD (1258 M)", theme: "fall",
        splashDesc: "Saksikan detik noktah dan tangisan sejarah sebuah peradaban...",
        skyColor: ["#140505", "#3A0A0A", "#8B1E1E"], worldWidth: 3400,
        entities: [
            {
                id: "c5_npc_1", type: "npc", x: 600, role: "Utusan Merah", name: "Tentera Hulagu",
                story: {
                    title: "Ancaman dari Timur (1258 M)",
                    text: "Dengar sini penduduk Baghdad! Panglima Hulagu Khan telah meruntuhkan kota-kota di Parsi. Kini bala tentera Mongol berdiri di luar pintu gerbang kota kamu. Serah diri atau musnah!",
                    question: "Apakah kesilapan pertahanan utama pentadbiran Khalifah Al-Musta'sim semasa menghadapi ancaman tentera Mongol?",
                    hint: "Kelemahan ketenteraan dan rasa terlalu selamat menyebabkan persiapan mempertahankan tembok kota terabai.",
                    options: [
                        { text: "Gagal menyediakan pertahanan yang cukup dan terpedaya dengan tipu muslihat wazirnya", correct: true },
                        { text: "Berjaya mengalahkan tentera Mongol dengan serangan armada laut", correct: false },
                        { text: "Menyerahkan kota secara aman dan berundur ke Eropah", correct: false },
                        { text: "Menawarkan Hulagu Khan separuh benua Afrika untuk berundur", correct: false }
                    ],
                    explanation: "Benar. Kelemahan ketenteraan serta pengkhianatan wazir (Ibn al-Alqami) telah membuka jalan mudah kepada kejatuhan kubu Baghdad."
                }
            },
            {
                id: "c5_obj_1", type: "object", x: 1300, name: "Tembok Kota Runtuh", icon: "🧱",
                story: {
                    title: "Pengepungan Selama 12 Hari",
                    text: "Kubu Kota Kedamaian akhirnya dibolosi pada 10 Februari 1258 M. Api membakar istana, menandakan tamatnya riwayat khilafah Abbasiyah di Baghdad selepas lebih lima abad berkuasa.",
                    rewardXP: 10
                }
            },
            {
                id: "c5_npc_2", type: "npc", x: 2000, role: "Saksi Tragedi", name: "Penduduk Terselamat",
                story: {
                    title: "Air Mata Sungai Dajlah",
                    text: "(Menangis) Ribuan ilmuwan dibunuh, khazanah Bayt al-Hikmah dimusnahkan, dan berjuta-juta manuskrip agung dicampak ke dalam Sungai Dajlah sehingga airnya bertukar hitam pekat kerana dakwat ilmu.",
                    question: "Sebagai pelajar sejarah dan tamadun Islam, apakah iktibar terpenting daripada peristiwa kejatuhan Baghdad?",
                    hint: "Fikirkan tentang nilai perpaduan ummah dan kesedaran memelihara pertahanan serta integriti negara.",
                    options: [
                        { text: "Perpecahan umat dan kelemahan pertahanan akan meruntuhkan sesebuah tamadun", correct: true },
                        { text: "Buku dan khazanah sains tidak patut disimpan di dalam perpustakaan", correct: false },
                        { text: "Sebuah tamadun hanya boleh diselamatkan dengan menyorok dari musuh", correct: false },
                        { text: "Kekayaan ekonomi sahaja sudah mencukupi tanpa perpaduan rakyat", correct: false }
                    ],
                    explanation: "Iktibar ini mendidik kita bahawa kelangsungan tamadun memerlukan perpaduan yang utuh, kepimpinan berintegriti, dan penguasaan sains serta pertahanan."
                }
            },
            {
                id: "c5_obj_2", type: "object", x: 2600, name: "Manuskrip Terbakar", icon: "MANUSKRIP",
                story: {
                    title: "Legasi Abadi Abbasiyah",
                    text: "Walaupun Baghdad tumbang, obor tamadun Islam tidak terpadam. Naskhah-naskhah yang berjaya diselamatkan telah mengalir ke Andalus dan Eropah, lantas menyalakan era Renaissance dunia moden.",
                    rewardXP: 20
                }
            },
            {
                id: "c5_mg_1", type: "minigame", x: 3000, name: "Peti Penyelamat", icon: "PENYELAMAT",
                gameType: "save_manuscripts",
                story: {
                    title: "Mini-Game 5: Misi Menyelamatkan Khazanah Manuskrip Baghdad",
                    text: "Kumpulkan manuskrip agung sains yang terapung sebelum lenyap di Sungai Dajlah, dan lengkapkan refleksi iktibar sejarah tamadun."
                }
            }
        ]
    }
};

// ==========================================
// 2. FAKTA AJAIB KANAK-KANAK (TAHUKAH ADIK?)
// ==========================================
const CHAPTER_FUN_FACTS = {
    1: {
        title: "Rahsia Panji Hitam Khurasan",
        text: "Tahukah adik? Khalifah Abbasiyah memilih warna HITAM sebagai lambang rasmi empayar mereka kerana melambangkan keadilan, kerendahan hati, dan mencontohi panji perjuangan datuk Nabi Muhammad SAW!",
        quote: "Perjuangan yang ikhlas membawa kebangkitan yang agung."
    },
    2: {
        title: "Kota Donat Gergasi Baghdad",
        text: "Tahukah adik? Kota Baghdad dibina dalam bentuk bulatan yang sangat sempurna seperti donat gergasi! Ia ada 4 pintu gerbang menghadap 4 penjuru dunia dan parit air yang sangat dalam supaya musuh tidak boleh menceroboh.",
        quote: "Seni bina Islam mengutamakan keselamatan dan keharmonian alam."
    },
    3: {
        title: "Buku Ditimbang dengan Emas Tulen!",
        text: "Tahukah adik? Di perpustakaan Bayt al-Hikmah (Rumah Kebijaksanaan), jika seseorang berjaya menulis atau menterjemah sebuah buku sains yang bernilai, Khalifah Al-Ma'mun akan menimbang buku itu dan memberinya EMAS TULEN seberat buku tersebut!",
        quote: "Ilmu pengetahuan lebih berharga daripada intan dan permata."
    },
    4: {
        title: "Menara Aiskrim Kon Samarra",
        text: "Tahukah adik? Masjid Agung Samarra mempunyai menara azan yang berbentuk lingkaran spiral gergasi seperti aiskrim kon terbalik! Tangganya melingkar di luar dan dipanggil Menara Malwiyyah setinggi 52 meter.",
        quote: "Kreativiti kejuruteraan Islam tiada batasannya."
    },
    5: {
        title: "Penyelamat Khazanah Obor Ilmu",
        text: "Tahukah adik? Sebelum Baghdad diserang, para ilmuwan sempat menyelamatkan ribuan manuskrip penting ke dalam peti kayu kalis air dan menyorokkannya di dalam gua. Manuskrip inilah yang menyalakan era sains moden di dunia hari ini!",
        quote: "Walau kota runtuh, obor ilmu tidak akan pernah terpadam."
    }
};

// ==========================================
// 3. FUNGSI RAWAK (SHUFFLE ARRAY)
// ==========================================
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// ==========================================
// 4. ENGINE PERMAINAN 2.5D SIRAHABLE (EDISI KANAK-KANAK)
// ==========================================
class SirahAdventureEngine {
    constructor(canvasId) {
        this.ensureModalsExist();

        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.currentChapter = 1;
        this.cameraX = 0;
        this.lives = 3;
        this.xp = 0;
        this.isPaused = false; 

        // Mod Pembelajaran Inklusif (Study Mode: Tanpa penalti nyawa untuk murid pelbagai aras)
        this.isStudyMode = false;
        this.attemptCount = 0; // Untuk kiraan scaffolding / hint

        // Karakter Kanak-Kanak ('aiman' atau 'sarah')
        this.character = localStorage.getItem('sirahable_kid_char') || 'aiman';

        // Mekanik Fizik Pemain & Melompat
        this.player = { 
            x: 120, y: 540, width: 44, height: 80, speed: 6.5, vx: 0, vy: 0, 
            direction: 1, isWalking: false, isGrounded: true, animTimer: 0 
        };
        this.jumpForce = -13.5;
        this.gravity = 0.65;

        // Dinar Emas Terkumpul
        this.dinarCount = parseInt(localStorage.getItem('sirahable_dinar_count') || '0', 10);
        this.coins = [];

        // Sahabat Kembara: Maskot Kucing Baghdad ("Si Bulus")
        this.pet = {
            x: 65, y: 585, vx: 0, dir: 1, animTimer: 0,
            meowBubble: null, meowTimer: 0, isJumping: false
        };

        // Sistem Penilaian 3 Bintang Bab
        this.chapterErrors = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        // Sistem Efek Zarah (Floating Text & Asap Lompatan)
        this.floatingTexts = [];
        this.dustParticles = [];
        this.confettiParticles = [];

        // Sistem Audio Web Audio Synth Ceria
        this.soundEnabled = localStorage.getItem('sirahable_game_sfx') !== 'false';
        this.audioCtx = null;

        this.keys = { left: false, right: false }; 
        this.activeInteractive = null;
        this.currentActiveEntity = null;
        this.isModalOpen = false;
        
        this.completedEntities = new Set();
        this.typewriterInterval = null;

        // Platform Peti Kayu & Kawalan Toast Debounce
        this.crates = [];
        this._lastToastMsg = null;
        this._lastToastTime = 0;

        this.init();
    }

    ensureModalsExist() {
        if (!document.getElementById('minigame-modal')) {
            const mg = document.createElement('div');
            mg.id = 'minigame-modal';
            mg.className = 'modal-backdrop hidden';
            mg.innerHTML = `
                <div class="dialogue-panel glass-panel minigame-card">
                    <div class="panel-header">
                        <div>
                            <span class="gold-badge" id="minigame-badge">CABARAN SARJANA TAMADUN</span>
                            <h2 id="minigame-title">Mini-Game</h2>
                        </div>
                        <button id="btn-close-minigame" class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">✕ Keluar Misi</button>
                    </div>
                    <div class="panel-body" id="minigame-body"></div>
                </div>
            `;
            document.body.appendChild(mg);
        }
    }

    init() {
        this.loadSessionXP();
        this.setupKeyboard();
        this.setupKidCharacter();
        this.setupSoundToggle();
        this.setupFunFact();
        this.setupChestModal();
        this.setupStudyModeToggle();
        this.setupCloseMinigameBtn();
        this.setupQuestTracker();
        this.updateDinarHUD();
        this.updateStarsHUD();
        this.loadChapter(this.currentChapter);
        this.gameLoop();
    }

    // ==========================================
    // ENJIN AUDIO SINTESIS CERIA (WEB AUDIO API)
    // ==========================================
    initAudioContext() {
        if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) this.audioCtx = new AudioContextClass();
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    playTone(freq, type = 'sine', duration = 0.15, delay = 0, vol = 0.2) {
        if (!this.soundEnabled) return;
        try {
            this.initAudioContext();
            if (!this.audioCtx) return;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            const now = this.audioCtx.currentTime + delay;

            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(vol, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {
            // Audio context fallback
        }
    }

    playCoinChime() {
        this.playTone(1046.5, 'triangle', 0.15, 0, 0.25); // C6
        this.playTone(1567.98, 'triangle', 0.25, 0.08, 0.25); // G6
    }

    playJumpSound() {
        if (!this.soundEnabled) return;
        try {
            this.initAudioContext();
            if (!this.audioCtx) return;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            const now = this.audioCtx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(520, now + 0.18);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(now);
            osc.stop(now + 0.18);
        } catch (e) {}
    }

    playFanfare() {
        // Nada kegembiraan trumpet ceria bila buka peti emas
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            this.playTone(freq, 'triangle', 0.28, idx * 0.11, 0.3);
        });
        setTimeout(() => {
            this.playTone(1046.5, 'sine', 0.5, 0, 0.35);
            this.playTone(1318.51, 'sine', 0.5, 0, 0.3); // E6
        }, 480);
    }

    playMeow() {
        if (!this.soundEnabled) return;
        try {
            this.initAudioContext();
            if (!this.audioCtx) return;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            const now = this.audioCtx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(450, now);
            osc.frequency.linearRampToValueAtTime(780, now + 0.14);
            osc.frequency.exponentialRampToValueAtTime(380, now + 0.32);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(now);
            osc.stop(now + 0.32);
        } catch (e) {}
    }

    playChestPop() {
        this.playTone(200, 'square', 0.08, 0, 0.2);
        this.playTone(360, 'sine', 0.18, 0.05, 0.25);
    }

    // ==========================================
    // SISTEM KARAKTER KANAK-KANAK (AIMAN & SARAH)
    // ==========================================
    setupKidCharacter() {
        const btn = document.getElementById('btn-character-toggle');
        const icon = document.getElementById('char-avatar-icon');
        const label = document.getElementById('char-name-label');

        const updateUI = () => {
            if (icon) icon.innerText = (this.character === 'sarah') ? '👧' : '👦';
            if (label) label.innerText = (this.character === 'sarah') ? 'Adik Sarah' : 'Adik Aiman';
        };
        updateUI();

        if (btn) {
            btn.onclick = () => {
                this.character = (this.character === 'aiman') ? 'sarah' : 'aiman';
                localStorage.setItem('sirahable_kid_char', this.character);
                updateUI();
                this.showToast(`Karakter ditukar: ${this.character === 'sarah' ? 'Adik Sarah 👧' : 'Adik Aiman 👦'}!`);
                this.playTone(880, 'sine', 0.15, 0, 0.2);
            };
        }
    }

    // ==========================================
    // SISTEM TOGGLE AUDIO / BUNYI
    // ==========================================
    setupSoundToggle() {
        const btn = document.getElementById('btn-sound-toggle');
        const icon = document.getElementById('sound-icon');

        const updateUI = () => {
            if (icon) icon.innerText = this.soundEnabled ? '🔊' : '🔇';
        };
        updateUI();

        if (btn) {
            btn.onclick = () => {
                this.soundEnabled = !this.soundEnabled;
                localStorage.setItem('sirahable_game_sfx', this.soundEnabled ? 'true' : 'false');
                updateUI();
                if (this.soundEnabled) {
                    this.initAudioContext();
                    this.playCoinChime();
                    this.showToast("Kesan Bunyi: Diaktifkan 🔊");
                } else {
                    this.showToast("Kesan Bunyi: Dinyahaktifkan 🔇");
                }
            };
        }
    }

    // ==========================================
    // SISTEM FAKTA MENARIK (TAHUKAH ADIK?)
    // ==========================================
    setupFunFact() {
        const btn = document.getElementById('btn-fun-fact');
        const closeBtn = document.getElementById('btn-close-fun-fact');
        const okBtn = document.getElementById('btn-fun-fact-ok');
        const modal = document.getElementById('fun-fact-modal');

        if (btn) btn.onclick = () => this.showFunFact(this.currentChapter);
        if (closeBtn) closeBtn.onclick = () => modal.classList.add('hidden');
        if (okBtn) okBtn.onclick = () => modal.classList.add('hidden');
    }

    showFunFact(chNum) {
        const modal = document.getElementById('fun-fact-modal');
        const title = document.getElementById('fun-fact-title');
        const text = document.getElementById('fun-fact-text');
        const quote = document.getElementById('fun-fact-quote');

        const fact = CHAPTER_FUN_FACTS[chNum] || CHAPTER_FUN_FACTS[1];
        if (title) title.innerText = fact.title;
        if (text) text.innerText = fact.text;
        if (quote) quote.innerText = `"${fact.quote}"`;

        if (modal) modal.classList.remove('hidden');
        this.playMeow();
        this.pet.meowBubble = "Tahukah adik? 💡";
        this.pet.meowTimer = 120;
    }

    // ==========================================
    // SISTEM PANDUAN MISI & QUEST TRACKER
    // ==========================================
    setupQuestTracker() {
        const toggleBtn = document.getElementById('btn-toggle-quest-list');
        const list = document.getElementById('quest-dropdown-list');
        if (toggleBtn && list) {
            toggleBtn.onclick = (e) => {
                e.stopPropagation();
                list.classList.toggle('hidden');
            };
            document.addEventListener('click', (e) => {
                if (!e.target.closest('#quest-tracker')) {
                    list.classList.add('hidden');
                }
            });
        }
    }

    updateQuestTracker() {
        if (!this.chapterData || !this.chapterData.entities) return;
        const total = this.chapterData.entities.length;
        let completed = 0;
        for (const ent of this.chapterData.entities) {
            if (this.completedEntities.has(ent.id)) completed++;
        }
        const pct = Math.round((completed / total) * 100);

        const summary = document.getElementById('quest-summary');
        if (summary) {
            summary.innerText = `Misi: ${completed}/${total} Selesai (${pct}%)`;
        }

        const list = document.getElementById('quest-dropdown-list');
        if (list) {
            list.innerHTML = '';
            this.chapterData.entities.forEach((ent, idx) => {
                const isDone = this.completedEntities.has(ent.id);
                const item = document.createElement('div');
                item.className = `quest-item ${isDone ? 'completed' : 'pending'}`;
                item.innerHTML = `
                    <span class="quest-check">${isDone ? '✓' : (idx + 1)}</span>
                    <span class="quest-name">${ent.name}</span>
                    <span class="quest-tag">${ent.type === 'minigame' ? 'Mini-Game' : 'Modul'}</span>
                `;
                list.appendChild(item);
            });
        }
    }

    initCrates(chNum) {
        // Platform peti kayu di sepanjang dunia untuk aktiviti melompat & ambil dinar
        this.crates = [
            { x: 920, y: 560, width: 55, height: 60 },
            { x: 1720, y: 560, width: 55, height: 60 },
            { x: 2500, y: 560, width: 55, height: 60 }
        ];
    }

    // ==========================================
    // SISTEM PETI KHASANAH & CONFETTI 🎉
    // ==========================================
    setupChestModal() {
        const chestWrapper = document.getElementById('chest-box-wrapper');
        const btnOpen = document.getElementById('btn-open-chest');
        const btnContinue = document.getElementById('btn-chest-continue');

        const openChest = () => {
            if (this.isChestOpened) return;
            this.isChestOpened = true;

            if (chestWrapper) chestWrapper.classList.add('opened');
            const emoji = document.getElementById('chest-emoji');
            if (emoji) emoji.innerText = '🏆';

            this.playChestPop();
            this.playFanfare();
            this.startConfetti();

            const rewards = document.getElementById('chest-rewards');
            if (rewards) rewards.classList.remove('hidden');

            const msg = document.getElementById('chest-message');
            if (msg) msg.innerText = "Khazanah berjaya dibuka! Tahniah adik!";

            if (btnOpen) btnOpen.classList.add('hidden');
            if (btnContinue) btnContinue.classList.remove('hidden');
        };

        if (chestWrapper) chestWrapper.onclick = openChest;
        if (btnOpen) btnOpen.onclick = openChest;
        if (btnContinue) {
            btnContinue.onclick = () => {
                const modal = document.getElementById('chest-modal');
                if (modal) modal.classList.add('hidden');
                if (typeof this._onChestCloseCallback === 'function') {
                    this._onChestCloseCallback();
                    this._onChestCloseCallback = null;
                }
            };
        }
    }

    triggerTreasureChest(title, dinarBonus = 5, xpBonus = 30, stars = 3, onContinue = null) {
        this.isChestOpened = false;
        this._onChestCloseCallback = onContinue;

        const modal = document.getElementById('chest-modal');
        const chestTitle = document.getElementById('chest-title');
        const chestWrapper = document.getElementById('chest-box-wrapper');
        const emoji = document.getElementById('chest-emoji');
        const msg = document.getElementById('chest-message');
        const rewards = document.getElementById('chest-rewards');
        const btnOpen = document.getElementById('btn-open-chest');
        const btnContinue = document.getElementById('btn-chest-continue');

        if (chestTitle) chestTitle.innerText = title || "Peti Khazanah Abbasiyah";
        if (chestWrapper) chestWrapper.classList.remove('opened');
        if (emoji) emoji.innerText = '🎁';
        if (msg) msg.innerText = "Klik peti emas ini untuk buka hadiah misteri!";
        if (rewards) rewards.classList.add('hidden');
        if (btnOpen) btnOpen.classList.remove('hidden');
        if (btnContinue) btnContinue.classList.add('hidden');

        const rewardDinar = document.getElementById('reward-dinar-text');
        const rewardXp = document.getElementById('reward-xp-text');
        const rewardBadge = document.getElementById('reward-badge-text');

        if (rewardDinar) rewardDinar.innerText = `+${dinarBonus} Dinar`;
        if (rewardXp) rewardXp.innerText = `+${xpBonus} XP`;
        if (rewardBadge) rewardBadge.innerText = `${stars} Bintang Emas!`;

        this.addDinar(dinarBonus, `Peti Emas: +${dinarBonus} Dinar!`);
        this.addXP(xpBonus, `Peti Emas: +${xpBonus} XP!`);

        if (modal) modal.classList.remove('hidden');
    }

    startConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth || 500;
        canvas.height = canvas.parentElement.clientHeight || 450;
        
        this.confettiParticles = [];
        const colors = ['#FFD700', '#FF6B6B', '#4ECCA3', '#48DBFB', '#FFA502', '#A29BFE', '#FFFFFF'];
        for (let i = 0; i < 70; i++) {
            this.confettiParticles.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 60,
                y: canvas.height / 2 - 20,
                vx: (Math.random() - 0.5) * 14,
                vy: -Math.random() * 12 - 4,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                vRot: (Math.random() - 0.5) * 12,
                alpha: 1
            });
        }
        
        let frames = 0;
        const runConfetti = () => {
            if (!this.confettiParticles || this.confettiParticles.length === 0) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frames++;
            for (let p of this.confettiParticles) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.35; // gravity
                p.rotation += p.vRot;
                if (frames > 45) p.alpha -= 0.015;
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
                ctx.restore();
            }
            this.confettiParticles = this.confettiParticles.filter(p => p.alpha > 0 && p.y < canvas.height + 50);
            if (this.confettiParticles.length > 0) {
                requestAnimationFrame(runConfetti);
            }
        };
        runConfetti();
    }

    // ==========================================
    // SISTEM DINAR EMAS & BINTANG BAB
    // ==========================================
    generateChapterCoins(chNum) {
        this.coins = [];
        const worldWidth = this.chapterData.worldWidth || 3400;
        const totalCoins = 16;
        const step = (worldWidth - 500) / totalCoins;

        for (let i = 0; i < totalCoins; i++) {
            const x = 320 + i * step + (Math.random() * 50 - 25);
            // Sebahagian syiling di tanah (y: 565), sebahagian terapung di udara perlukan lompatan (y: 470, 440)
            const y = (i % 3 === 0) ? 460 : (i % 3 === 1 ? 490 : 570);
            this.coins.push({ id: `c_${chNum}_${i}`, x: Math.floor(x), y, collected: false });
        }
    }

    checkCoinCollection() {
        const px = this.player.x;
        const py = this.player.y + 40; // pusat badan pemain

        for (let coin of this.coins) {
            if (coin.collected) continue;
            const dx = Math.abs(px - coin.x);
            const dy = Math.abs(py - coin.y);

            if (dx < 34 && dy < 45) {
                coin.collected = true;
                this.addDinar(1, null);
                this.addFloatingText("+1 Dinar ✨", coin.x, coin.y - 10, "#FFD700");
                this.playCoinChime();
                this.addXP(2, "Kutip Dinar Emas (+2 XP)");
                break;
            }
        }
    }

    addDinar(amount, msg = null) {
        this.dinarCount += amount;
        localStorage.setItem('sirahable_dinar_count', this.dinarCount.toString());
        this.updateDinarHUD();
        if (msg) this.showToast(msg);
    }

    updateDinarHUD() {
        const val = document.getElementById('hud-dinar-val');
        if (val) val.innerText = this.dinarCount;
    }

    getChapterStars(chNum) {
        const errors = this.chapterErrors[chNum] || 0;
        if (errors === 0) return 3;
        if (errors === 1) return 2;
        return 1;
    }

    updateStarsHUD() {
        const stars = this.getChapterStars(this.currentChapter);
        for (let i = 1; i <= 3; i++) {
            const el = document.getElementById(`star-${i}`);
            if (el) {
                if (i <= stars) el.classList.add('active');
                else el.classList.remove('active');
            }
        }
    }

    // ==========================================
    // MEKANIK LOMPAT (JUMP PHYSICS)
    // ==========================================
    jump() {
        if (this.player.isGrounded && !this.isModalOpen && !this.isPaused) {
            this.player.vy = this.jumpForce;
            this.player.isGrounded = false;
            this.playJumpSound();
            this.spawnDust(this.player.x, 620);
        }
    }

    spawnDust(x, y) {
        for (let i = 0; i < 6; i++) {
            this.dustParticles.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y - 5,
                vx: (Math.random() - 0.5) * 3,
                vy: -Math.random() * 2,
                size: Math.random() * 4 + 2,
                alpha: 0.8
            });
        }
    }

    addFloatingText(text, x, y, color = '#FFD700') {
        this.floatingTexts.push({ text, x, y, color, vy: -1.2, alpha: 1.0 });
    }

    updateParticles() {
        // Floating Text update
        for (let ft of this.floatingTexts) {
            ft.y += ft.vy;
            ft.alpha -= 0.02;
        }
        this.floatingTexts = this.floatingTexts.filter(ft => ft.alpha > 0);

        // Dust particle update
        for (let p of this.dustParticles) {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.035;
        }
        this.dustParticles = this.dustParticles.filter(p => p.alpha > 0);
    }

    // ==========================================
    // SAHABAT MASKOT KUCING BAGHDAD (SI BULUS)
    // ==========================================
    updatePet() {
        const targetX = this.player.x - (this.player.direction * 52);
        const dx = targetX - this.pet.x;
        this.pet.vx = dx * 0.12;

        if (Math.abs(this.pet.vx) > 0.4) {
            this.pet.dir = this.pet.vx > 0 ? 1 : -1;
            this.pet.animTimer += 0.2;
        } else {
            this.pet.animTimer += 0.05;
        }

        this.pet.x += this.pet.vx;

        // Lompat seiring jika pemain di udara
        if (!this.player.isGrounded) {
            const jumpHeight = Math.max(0, 540 - this.player.y) * 0.75;
            this.pet.y = 585 - jumpHeight;
        } else {
            this.pet.y = 585;
        }

        // Semak tanda seru / meow jika dekat dengan misi belum selesai
        if (this.activeInteractive && !this.completedEntities.has(this.activeInteractive.id)) {
            if (!this.pet.meowBubble) {
                this.pet.meowBubble = "Meow! 🐾";
                this.pet.meowTimer = 100;
            }
        }

        if (this.pet.meowTimer > 0) {
            this.pet.meowTimer--;
            if (this.pet.meowTimer <= 0) this.pet.meowBubble = null;
        }
    }

    // ==========================================
    // SKRIN TAMAT PERMAINAN (END GAME SPLASH)
    // ==========================================
    showEndGameSplash() {
        const splash = document.getElementById('end-game-splash');
        const dinarEl = document.getElementById('end-dinar-count');
        const xpEl = document.getElementById('end-xp-count');

        if (dinarEl) dinarEl.innerText = this.dinarCount;
        if (xpEl) xpEl.innerText = this.xp;

        if (splash) splash.classList.remove('hidden');
        this.playFanfare();
        this.startConfetti();
    }

    setupStudyModeToggle() {
        const btn = document.getElementById('btn-toggle-study-mode');
        if (!btn) return;
        btn.addEventListener('click', () => {
            this.isStudyMode = !this.isStudyMode;
            if (this.isStudyMode) {
                btn.innerText = "MOD SANTAI (AKTIF)";
                btn.style.background = "rgba(78, 204, 163, 0.3)";
                btn.style.borderColor = "#4ECCA3";
                this.showToast("Mod Santai Diaktifkan: Bebas penalti nyawa untuk pembelajaran tenang.");
            } else {
                btn.innerText = "MOD PENGEMBARAAN";
                btn.style.background = "";
                btn.style.borderColor = "";
                this.showToast("Mod Cabaran Aktif: Memerlukan tumpuan ketepatan fakta.");
            }
            this.updateLivesHUD();
        });
    }

    setupCloseMinigameBtn() {
        const btn = document.getElementById('btn-close-minigame');
        if (btn) btn.onclick = () => this.closeModal();
    }

    loadSessionXP() {
        fetch('api/get_dashboard.php')
            .then(res => res.json())
            .then(data => { if (data.status === 'success') { this.xp = data.user.xp_points; this.updateHUD(); } })
            .catch(() => this.updateHUD());
    }

    setupKeyboard() {
        const handleKeyDown = (e) => {
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault(); 
            }
            if (this.isModalOpen || this.isPaused) return;
            const code = e.code || e.key;

            // Berjalan Kiri & Kanan
            if (code === 'KeyA' || code === 'ArrowLeft' || code === 'a' || code === 'A') this.keys.left = true;
            if (code === 'KeyD' || code === 'ArrowRight' || code === 'd' || code === 'D') this.keys.right = true;
            
            // Mekanik Lompat (Space, W, ArrowUp)
            if ((code === 'Space' || code === 'KeyW' || code === 'ArrowUp' || code === 'w' || code === 'W') && !e.repeat) {
                this.jump();
            }

            // Interaksi (E atau Enter)
            if ((code === 'KeyE' || code === 'Enter' || code === 'e' || code === 'E') && !e.repeat) {
                if (this.activeInteractive && !this.completedEntities.has(this.activeInteractive.id)) {
                    this.triggerInteraction(this.activeInteractive);
                }
            }
        };

        const handleKeyUp = (e) => {
            const code = e.code || e.key;
            if (code === 'KeyA' || code === 'ArrowLeft' || code === 'a' || code === 'A') this.keys.left = false;
            if (code === 'KeyD' || code === 'ArrowRight' || code === 'd' || code === 'D') this.keys.right = false;
        };

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('keyup', handleKeyUp);

        window.addEventListener('blur', () => {
            this.keys.left = false;
            this.keys.right = false;
        });

        // Sentuhan pada prompt interaksi (Mesra Kanak-Kanak / Tablet)
        const promptEl = document.getElementById('interaction-prompt');
        if (promptEl) {
            promptEl.onclick = () => {
                if (this.activeInteractive && !this.completedEntities.has(this.activeInteractive.id)) {
                    this.triggerInteraction(this.activeInteractive);
                }
            };
        }
    }

    loadChapter(chNum) {
        this.currentChapter = chNum;
        this.chapterData = CHAPTERS_DATA[chNum];
        this.player.x = 120;
        this.player.y = 540;
        this.player.vy = 0;
        this.player.isGrounded = true;
        this.cameraX = 0;

        // Reset kedudukan maskot
        this.pet.x = 65;
        this.pet.y = 585;

        // Jana syiling dinar emas & platform peti kayu untuk bab ini
        this.generateChapterCoins(chNum);
        this.initCrates(chNum);
        this.updateStarsHUD();
        this.updateQuestTracker();
        
        const hudTitle = document.getElementById('hud-chapter-title');
        if(hudTitle) hudTitle.innerText = this.chapterData.title;
        
        this.isPaused = true; 
        const splash = document.getElementById('chapter-splash');
        
        if (splash) {
            document.getElementById('splash-title').innerText = this.chapterData.title;
            document.getElementById('splash-desc').innerText = this.chapterData.splashDesc;
            splash.classList.remove('hidden');

            setTimeout(() => {
                splash.classList.add('hidden');
                this.isPaused = false; 
            }, 2500);
        } else {
            this.isPaused = false;
        }
    }

    update() {
        if (this.isModalOpen || this.isPaused) {
            this.player.isWalking = false;
            return; 
        }

        if (this.keys.left) { this.player.vx = -this.player.speed; this.player.direction = -1; this.player.isWalking = true; }
        else if (this.keys.right) { this.player.vx = this.player.speed; this.player.direction = 1; this.player.isWalking = true; }
        else { this.player.vx = 0; this.player.isWalking = false; }

        this.player.x += this.player.vx;
        this.player.animTimer += 0.15;

        // Kemaskini Fizik Lompatan & Platform Peti Kayu
        this.player.y += this.player.vy;
        
        let groundLevel = 540;
        const playerFootX = this.player.x;
        for (const crate of this.crates) {
            if (playerFootX >= crate.x - 18 && playerFootX <= crate.x + crate.width + 18) {
                const crateTop = crate.y - 80;
                if (this.player.y <= crateTop + 14 && this.player.vy >= 0) {
                    groundLevel = Math.min(groundLevel, crateTop);
                }
            }
        }

        if (!this.player.isGrounded) {
            this.player.vy += this.gravity;
            if (this.player.y >= groundLevel) {
                this.player.y = groundLevel;
                this.player.vy = 0;
                this.player.isGrounded = true;
                this.spawnDust(this.player.x, groundLevel + 80);
            }
        } else {
            if (this.player.y < groundLevel) {
                this.player.isGrounded = false;
            }
        }

        if (this.player.x < 40) this.player.x = 40;

        // Semak kutipan Dinar & Zarah
        this.checkCoinCollection();
        this.updatePet();
        this.updateParticles();
        
        // Pengendalian Sempadan Pintu Gerbang Kota (Bebas Spam Toast)
        const gateX = this.chapterData.worldWidth - 140;
        let isChapterComplete = true;
        let remainingMissions = 0;
        for (const ent of this.chapterData.entities) {
            if (!this.completedEntities.has(ent.id)) {
                isChapterComplete = false;
                remainingMissions++;
            }
        }

        if (!isChapterComplete) {
            if (this.player.x > gateX - 60) {
                this.player.x = gateX - 60;
                this.player.vx = 0;
                this.player.isWalking = false;

                // Si Bulus memberi panduan
                this.pet.meowBubble = "Pintu berkunci! 🔒";
                this.pet.meowTimer = 90;

                this.showToast(`🔒 Pintu Gerbang Terkunci! Selesaikan ${remainingMissions} lagi misi di bab ini.`);
            }
        } else {
            // Semua misi bab selesai! Pintu gerbang dibuka dengan portal bercahaya
            if (this.player.x >= gateX - 25) {
                if (this.currentChapter < 5) {
                    this.isPaused = true;
                    this.triggerTreasureChest(`Tahniah! Tamat Bab ${this.currentChapter}`, 10, 50, this.getChapterStars(this.currentChapter), () => {
                        this.loadChapter(this.currentChapter + 1);
                    });
                } else {
                    this.isPaused = true;
                    this.player.x = gateX - 25;
                    this.showEndGameSplash();
                }
            }
        }

        this.cameraX = this.player.x - this.width / 3;
        if (this.cameraX < 0) this.cameraX = 0;
        if (this.cameraX > this.chapterData.worldWidth - this.width) this.cameraX = this.chapterData.worldWidth - this.width;

        this.checkProximity();
    }

    checkProximity() {
        let nearby = null;
        for (const ent of this.chapterData.entities) {
            if (Math.abs(this.player.x - ent.x) < 70) { nearby = ent; break; }
        }
        this.activeInteractive = nearby;
        
        const prompt = document.getElementById('interaction-prompt');
        const promptText = document.getElementById('prompt-text');

        if (nearby && !this.completedEntities.has(nearby.id)) {
            prompt.classList.remove('hidden');
            if (promptText) {
                if (nearby.type === 'npc') promptText.innerText = `Bercakap dengan ${nearby.name} (E)`;
                else if (nearby.type === 'minigame') promptText.innerText = `Mulakan ${nearby.name} (E)`;
                else promptText.innerText = `Periksa ${nearby.name} (E)`;
            }
        } else {
            if (prompt) prompt.classList.add('hidden');
        }
    }

    // ==========================================
    // SISTEM LATAR BELAKANG DINAMIK (MENGIKUT TEMA BAB)
    // ==========================================
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.renderSky();
        this.renderDistantCity(0.2);
        this.renderMainCity(0.6);
        this.renderDecorations();
        this.renderCityGate();
        this.renderEntities();
        this.renderCoins();
        this.renderPet();
        this.renderPlayer();
        this.renderFloatingEffects();
        this.renderGround();
        this.renderAtmosphere();
        this.renderQuestNavigator();
    }

    renderSky() {
        const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
        const [c1, c2, c3] = this.chapterData.skyColor;
        grad.addColorStop(0, c1); grad.addColorStop(0.6, c2); grad.addColorStop(1, c3);
        this.ctx.fillStyle = grad; this.ctx.fillRect(0, 0, this.width, this.height);
    }

    renderDistantCity(parallax) {
        this.ctx.save();
        const offsetX = -(this.cameraX * parallax);
        const theme = this.chapterData.theme;
        
        if (theme === 'rise') this.ctx.fillStyle = "#1F150D";
        else if (theme === 'golden') this.ctx.fillStyle = "#0E2442";
        else if (theme === 'fall') this.ctx.fillStyle = "#2A0808";
        else if (theme === 'decline') this.ctx.fillStyle = "#141018";
        else this.ctx.fillStyle = "#0E2442";

        for (let i = 0; i < 30; i++) {
            const x = i * 220 + (offsetX % 220) - 200;
            
            if (theme === 'rise') {
                this.ctx.beginPath();
                this.ctx.moveTo(x, 620);
                this.ctx.lineTo(x + 110, 450 + (i%3)*20);
                this.ctx.lineTo(x + 220, 620);
                this.ctx.fill();
            } else if (theme === 'fall' || theme === 'decline') {
                this.ctx.fillRect(x + 20, 480 + (i%2)*30, 120, 160);
                this.ctx.fillRect(x + 155, 420 + (i%3)*40, 20, 200);
            } else {
                this.ctx.beginPath(); this.ctx.arc(x + 80, 480, 60, Math.PI, 0); this.ctx.rect(x + 20, 480, 120, 160); this.ctx.fill();
                this.ctx.fillRect(x + 155, 380, 20, 260);
            }
        }
        this.ctx.restore();
    }

    renderMainCity(parallax) {
        this.ctx.save();
        const offsetX = -(this.cameraX * parallax);
        const theme = this.chapterData.theme;

        for (let i = 0; i < 40; i++) {
            const x = i * 280 + (offsetX % 280) - 200;
            
            if (theme === 'rise') {
                this.ctx.fillStyle = "#4A3525"; this.ctx.fillRect(x, 460, 240, 180);
                this.ctx.fillStyle = "#634731"; this.ctx.fillRect(x + 10, 465, 220, 10);
                this.ctx.fillStyle = "#1A100A"; this.ctx.fillRect(x + 80, 550, 80, 90);
            } 
            else if (theme === 'golden') {
                this.ctx.fillStyle = "#1E3B5C"; this.ctx.fillRect(x, 400, 240, 240); 
                this.ctx.fillStyle = "#D4AF37"; this.ctx.fillRect(x + 10, 405, 220, 8);
                this.ctx.beginPath(); this.ctx.arc(x + 120, 400, 100, Math.PI, 0); this.ctx.fill();
                this.ctx.fillStyle = "#050A14";
                this.ctx.beginPath(); this.ctx.arc(x + 120, 540, 50, Math.PI, 0); this.ctx.rect(x + 70, 540, 100, 100); this.ctx.fill();
            }
            else if (theme === 'decline') {
                this.ctx.fillStyle = "#1E1A22"; this.ctx.fillRect(x, 420, 240, 220);
                this.ctx.fillStyle = "#444"; this.ctx.fillRect(x + 10, 425, 220, 6);
                this.ctx.fillStyle = "#000";
                this.ctx.beginPath(); this.ctx.arc(x + 120, 560, 40, Math.PI, 0); this.ctx.rect(x + 80, 560, 80, 80); this.ctx.fill();
            }
            else if (theme === 'fall') {
                this.ctx.fillStyle = "#1A0A0A"; this.ctx.fillRect(x, 420 + (i%3)*15, 240, 220); 
                this.ctx.fillStyle = "#3A0505"; this.ctx.fillRect(x + 10, 425 + (i%3)*15, 220, 6);
                this.ctx.fillStyle = (i%2 === 0) ? "#FF4500" : "#050505";
                this.ctx.beginPath(); this.ctx.arc(x + 120, 560, 40, Math.PI, 0); this.ctx.rect(x + 80, 560, 80, 80); this.ctx.fill();
            }
            else {
                this.ctx.fillStyle = "#1A365D"; this.ctx.fillRect(x, 420, 240, 220);
                this.ctx.fillStyle = "#D4AF37"; this.ctx.fillRect(x + 10, 425, 220, 6);
                this.ctx.fillStyle = "#050A14";
                this.ctx.beginPath(); this.ctx.arc(x + 120, 560, 40, Math.PI, 0); this.ctx.rect(x + 80, 560, 80, 80); this.ctx.fill();
            }
        }
        this.ctx.restore();
    }

    renderGround() {
        const groundY = 620;
        const theme = this.chapterData.theme;
        
        if (theme === 'rise') this.ctx.fillStyle = "#362518";
        else if (theme === 'fall') this.ctx.fillStyle = "#140505";
        else if (theme === 'decline') this.ctx.fillStyle = "#181414";
        else this.ctx.fillStyle = "#1A2638";

        this.ctx.fillRect(0, groundY, this.width, this.height - groundY);
        this.ctx.fillStyle = (theme === 'fall') ? "#8B1E1E" : "#D4AF37"; 
        this.ctx.fillRect(0, groundY, this.width, 3);
    }

    renderEntities() {
        for (const ent of this.chapterData.entities) {
            const screenX = ent.x - this.cameraX;
            if (screenX < -100 || screenX > this.width + 100) continue;
            const isDone = this.completedEntities.has(ent.id);

            if (ent.type === 'npc') {
                this.ctx.save();
                this.ctx.fillStyle = isDone ? "#4A5568" : "#0D5C46"; this.ctx.fillRect(screenX - 18, 540, 36, 80);
                this.ctx.fillStyle = "#D4AF37"; this.ctx.beginPath(); this.ctx.arc(screenX, 528, 16, 0, Math.PI * 2); this.ctx.fill();
                this.ctx.fillStyle = "#FFF"; this.ctx.font = "bold 12px Plus Jakarta Sans"; this.ctx.textAlign = "center"; this.ctx.fillText(ent.name, screenX, 498);
                if (!isDone) {
                    this.ctx.fillStyle = "rgba(212, 175, 55, 0.2)";
                    this.ctx.fillRect(screenX - 26, 467, 52, 18);
                    this.ctx.strokeStyle = "#D4AF37";
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(screenX - 26, 467, 52, 18);
                    this.ctx.fillStyle = "#F5E08C";
                    this.ctx.font = "bold 10px Plus Jakarta Sans";
                    this.ctx.fillText("BICARA", screenX, 480);
                }
                this.ctx.restore();
            } else if (ent.type === 'minigame') {
                this.ctx.save();
                this.ctx.strokeStyle = isDone ? "#4A5568" : "#D4AF37";
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(screenX, 580, 18, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.fillStyle = isDone ? "rgba(74, 85, 104, 0.4)" : "rgba(212, 175, 55, 0.2)";
                this.ctx.fill();
                this.ctx.fillStyle = isDone ? "#A0AEC0" : "#D4AF37";
                this.ctx.font = "bold 16px Plus Jakarta Sans";
                this.ctx.textAlign = "center";
                this.ctx.fillText("◆", screenX, 586);
                this.ctx.fillStyle = isDone ? "#94A3B8" : "#F5E08C";
                this.ctx.font = "bold 12px Plus Jakarta Sans";
                this.ctx.fillText(ent.name, screenX, 545);
                if (!isDone) {
                    this.ctx.fillStyle = "#4ECCA3"; this.ctx.font = "bold 10px Plus Jakarta Sans";
                    this.ctx.fillText("[ CABARAN ]", screenX, 528);
                }
                this.ctx.restore();
            } else {
                this.ctx.save();
                this.ctx.strokeStyle = isDone ? "#4A5568" : "#D4AF37";
                this.ctx.lineWidth = 1.5;
                this.ctx.strokeRect(screenX - 16, 565, 32, 32);
                this.ctx.fillStyle = isDone ? "rgba(74, 85, 104, 0.3)" : "rgba(212, 175, 55, 0.15)";
                this.ctx.fillRect(screenX - 16, 565, 32, 32);
                this.ctx.fillStyle = isDone ? "#A0AEC0" : "#D4AF37";
                this.ctx.font = "bold 14px Plus Jakarta Sans";
                this.ctx.textAlign = "center";
                this.ctx.fillText("◈", screenX, 586);
                this.ctx.fillStyle = "#F5E08C"; this.ctx.font = "bold 11px Plus Jakarta Sans";
                this.ctx.fillText(ent.name, screenX, 550);
                this.ctx.restore();
            }
        }
    }

    renderCoins() {
        const t = performance.now() * 0.003;
        this.ctx.save();
        for (let coin of this.coins) {
            if (coin.collected) continue;
            const screenX = coin.x - this.cameraX;
            if (screenX < -50 || screenX > this.width + 50) continue;

            const floatY = coin.y + Math.sin(t * 3.5 + coin.x * 0.05) * 4;
            const scaleX = Math.cos(t * 2.8 + coin.x * 0.02);

            this.ctx.save();
            this.ctx.translate(screenX, floatY);
            this.ctx.scale(Math.abs(scaleX) < 0.18 ? 0.18 : scaleX, 1);

            this.ctx.shadowColor = "rgba(255, 215, 0, 0.7)";
            this.ctx.shadowBlur = 8;

            // Bingkai Luar Emas
            this.ctx.fillStyle = "#FFD700";
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 13, 0, Math.PI * 2);
            this.ctx.fill();

            // Lapisan Dalam Dinar
            this.ctx.fillStyle = "#D4AF37";
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
            this.ctx.fill();

            // Muka Syiling Berkilau
            this.ctx.fillStyle = "#FFF2A3";
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 8, 0, Math.PI * 2);
            this.ctx.fill();

            // Lambang Bintang Abbasiyah
            this.ctx.fillStyle = "#8B6508";
            this.ctx.font = "bold 9px Cinzel, serif";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText("✦", 0, 0);

            this.ctx.restore();
        }
        this.ctx.restore();
    }

    renderPet() {
        const screenX = this.pet.x - this.cameraX;
        const screenY = this.pet.y;
        if (screenX < -100 || screenX > this.width + 100) return;

        this.ctx.save();
        this.ctx.translate(screenX, screenY);
        if (this.pet.dir === -1) this.ctx.scale(-1, 1);

        const tailWiggle = Math.sin(this.pet.animTimer * 4) * 0.25;

        // Ekor Kucing Melentik
        this.ctx.save();
        this.ctx.translate(-14, -8);
        this.ctx.rotate(-0.5 + tailWiggle);
        this.ctx.strokeStyle = "#E67E22";
        this.ctx.lineWidth = 4.5;
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.quadraticCurveTo(-12, -10, -8, -20);
        this.ctx.stroke();
        this.ctx.restore();

        // Kaki Putih Comel
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.beginPath();
        this.ctx.ellipse(-8, 5, 5, 3, 0, 0, Math.PI * 2);
        this.ctx.ellipse(8, 5, 5, 3, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Badan Gebu Kucing (Oren Ginger)
        this.ctx.fillStyle = "#E67E22";
        this.ctx.beginPath();
        this.ctx.ellipse(0, -5, 16, 12, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Dada Putih Gebu
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.beginPath();
        this.ctx.ellipse(4, -4, 9, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Kepala Kucing
        this.ctx.fillStyle = "#E67E22";
        this.ctx.beginPath();
        this.ctx.arc(8, -18, 12, 0, Math.PI * 2);
        this.ctx.fill();

        // Telinga Luar
        this.ctx.fillStyle = "#D35400";
        this.ctx.beginPath();
        this.ctx.moveTo(2, -26);
        this.ctx.lineTo(6, -34);
        this.ctx.lineTo(10, -26);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(11, -26);
        this.ctx.lineTo(16, -34);
        this.ctx.lineTo(19, -24);
        this.ctx.fill();

        // Telinga Dalam (Merah Jambu)
        this.ctx.fillStyle = "#FFB6C1";
        this.ctx.beginPath();
        this.ctx.moveTo(4, -26);
        this.ctx.lineTo(6, -31);
        this.ctx.lineTo(9, -26);
        this.ctx.fill();

        // Tarbus Merah Abbasiyah di Atas Kepala Kucing
        this.ctx.fillStyle = "#C0392B";
        this.ctx.fillRect(7, -33, 6, 6);
        this.ctx.fillStyle = "#F1C40F";
        this.ctx.beginPath();
        this.ctx.arc(10, -34, 1.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Mata Kucing (Comel & Berkedip)
        const isCatBlinking = (Math.sin(this.pet.animTimer * 0.35) > 0.95);
        if (!isCatBlinking) {
            this.ctx.fillStyle = "#2C3E50";
            this.ctx.beginPath();
            this.ctx.arc(6, -18, 2.5, 0, Math.PI * 2);
            this.ctx.arc(12, -18, 2.5, 0, Math.PI * 2);
            this.ctx.fill();

            // Kilauan Cahaya Mata
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(5.5, -19, 1, 0, Math.PI * 2);
            this.ctx.arc(11.5, -19, 1, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = "#2C3E50";
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.moveTo(4, -18); this.ctx.lineTo(8, -18);
            this.ctx.moveTo(10, -18); this.ctx.lineTo(14, -18);
            this.ctx.stroke();
        }

        // Hidung Pink Kecil
        this.ctx.fillStyle = "#FF9999";
        this.ctx.beginPath();
        this.ctx.arc(9, -14, 1.2, 0, Math.PI * 2);
        this.ctx.fill();

        // Misai Kucing
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(11, -14); this.ctx.lineTo(19, -15);
        this.ctx.moveTo(11, -13); this.ctx.lineTo(18, -11);
        this.ctx.stroke();

        this.ctx.restore();

        // Belon Kata Si Bulus
        if (this.pet.meowBubble) {
            this.ctx.save();
            this.ctx.translate(screenX, screenY - 45);
            this.ctx.fillStyle = "rgba(6, 13, 26, 0.92)";
            this.ctx.strokeStyle = "#FFD700";
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.roundRect(-42, -22, 84, 22, 10);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.fillStyle = "#FFD700";
            this.ctx.font = "bold 11px Plus Jakarta Sans, sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.pet.meowBubble, 0, -8);
            this.ctx.restore();
        }
    }

    renderPlayer() {
        const screenX = this.player.x - this.cameraX;
        const screenY = this.player.y;
        this.ctx.save();
        this.ctx.translate(screenX, screenY);
        if (this.player.direction === -1) this.ctx.scale(-1, 1);

        const isAiman = (this.character === 'aiman');
        const isBlinking = (Math.sin(this.player.animTimer * 0.25) > 0.95);

        if (isAiman) {
            // === ADIK AIMAN (Jubah Zamrud & Songkok Khilafah Emas) ===
            // Jubah Utama
            this.ctx.fillStyle = "#0D5C46";
            this.ctx.fillRect(-18, 0, 36, 80);

            // Jalur Sulaman Emas Tengah & Kolar
            this.ctx.fillStyle = "#D4AF37";
            this.ctx.fillRect(-3, 0, 6, 80);
            this.ctx.fillRect(-12, 0, 24, 6);

            // Beg Sandang Kembara Cilik
            this.ctx.fillStyle = "#795548";
            this.ctx.fillRect(8, 22, 11, 15);
            this.ctx.strokeStyle = "#5D4037";
            this.ctx.lineWidth = 1.5;
            this.ctx.strokeRect(8, 22, 11, 15);
            this.ctx.beginPath();
            this.ctx.moveTo(-14, 0);
            this.ctx.lineTo(8, 24);
            this.ctx.stroke();

            // Muka Ceria Aiman
            this.ctx.fillStyle = "#FDEDEC";
            this.ctx.beginPath();
            this.ctx.arc(0, -12, 14, 0, Math.PI * 2);
            this.ctx.fill();

            // Songkok/Serban Putih Abbasiyah
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(0, -17, 15, Math.PI, 0);
            this.ctx.fill();
            this.ctx.fillStyle = "#D4AF37";
            this.ctx.fillRect(-14, -18, 28, 4);

            // Bulan Sabit Mini pada Songkok
            this.ctx.fillStyle = "#D4AF37";
            this.ctx.font = "bold 9px Cinzel";
            this.ctx.textAlign = "center";
            this.ctx.fillText("☾", 0, -20);
        } else {
            // === ADIK SARAH (Jubah Ungu Diraja & Hijab Reben Emas) ===
            // Jubah Labuh Ungu
            this.ctx.fillStyle = "#5B2C6F";
            this.ctx.fillRect(-18, 0, 36, 80);

            // Sulaman Emas Bunga Bawah Jubah
            this.ctx.fillStyle = "#F5B041";
            this.ctx.fillRect(-18, 72, 36, 5);
            this.ctx.fillRect(-3, 0, 6, 72);

            // Beg Kembara Cantik
            this.ctx.fillStyle = "#A04000";
            this.ctx.fillRect(8, 24, 10, 14);
            this.ctx.strokeStyle = "#6E2C00";
            this.ctx.lineWidth = 1.2;
            this.ctx.strokeRect(8, 24, 10, 14);

            // Muka Ceria Sarah
            this.ctx.fillStyle = "#FDEDEC";
            this.ctx.beginPath();
            this.ctx.arc(0, -12, 14, 0, Math.PI * 2);
            this.ctx.fill();

            // Tudung/Hijab Moden Labuh
            this.ctx.fillStyle = "#F5EEF8";
            this.ctx.beginPath();
            this.ctx.arc(0, -14, 16.5, Math.PI * 0.85, Math.PI * 2.15);
            this.ctx.fill();

            // Reben Emas Kepala
            this.ctx.fillStyle = "#D4AF37";
            this.ctx.fillRect(-14, -17, 28, 3.5);
            this.ctx.beginPath();
            this.ctx.arc(10, -16, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Mata Animasi Berkedip & Senyuman Comel
        if (!isBlinking) {
            this.ctx.fillStyle = "#1A252F";
            this.ctx.beginPath();
            this.ctx.arc(3, -13, 2.5, 0, Math.PI * 2);
            this.ctx.arc(9, -13, 2.5, 0, Math.PI * 2);
            this.ctx.fill();

            // Kilauan Mata Kartun
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(2.5, -14, 0.9, 0, Math.PI * 2);
            this.ctx.arc(8.5, -14, 0.9, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = "#1A252F";
            this.ctx.lineWidth = 1.4;
            this.ctx.beginPath();
            this.ctx.moveTo(1, -13); this.ctx.lineTo(5, -13);
            this.ctx.moveTo(7, -13); this.ctx.lineTo(11, -13);
            this.ctx.stroke();
        }

        // Senyuman Comel
        this.ctx.strokeStyle = "#C0392B";
        this.ctx.lineWidth = 1.2;
        this.ctx.beginPath();
        this.ctx.arc(6, -9, 3, 0.1 * Math.PI, 0.9 * Math.PI);
        this.ctx.stroke();

        // Animasi Kaki (Berjalan atau Melompat)
        if (!this.player.isGrounded) {
            // Posisi Kaki Melipat Ketika di Udara (Lompat)
            this.ctx.fillStyle = "#09382B";
            this.ctx.fillRect(-12, 73, 9, 8);
            this.ctx.fillRect(3, 71, 9, 8);
        } else if (this.player.isWalking) {
            const legOffset = Math.sin(this.player.animTimer) * 8;
            this.ctx.fillStyle = isAiman ? "#09382B" : "#341740";
            this.ctx.fillRect(-14, 76, 10, 8 + legOffset);
            this.ctx.fillRect(4, 76, 10, 8 - legOffset);
        }

        this.ctx.restore();
    }

    renderFloatingEffects() {
        this.ctx.save();

        // 1. Teks Terapung (+1 Dinar ✨)
        for (let ft of this.floatingTexts) {
            const screenX = ft.x - this.cameraX;
            this.ctx.save();
            this.ctx.font = "bold 13px Plus Jakarta Sans, sans-serif";
            this.ctx.fillStyle = ft.color;
            this.ctx.globalAlpha = Math.max(0, ft.alpha);
            this.ctx.shadowColor = ft.color;
            this.ctx.shadowBlur = 6;
            this.ctx.textAlign = "center";
            this.ctx.fillText(ft.text, screenX, ft.y);
            this.ctx.restore();
        }

        // 2. Debu Asap Lompatan
        for (let p of this.dustParticles) {
            const screenX = p.x - this.cameraX;
            this.ctx.save();
            this.ctx.fillStyle = "rgba(220, 200, 170, " + Math.max(0, p.alpha) + ")";
            this.ctx.beginPath();
            this.ctx.arc(screenX, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }

        this.ctx.restore();
    }

    renderAtmosphere() {
        const t = performance.now() * 0.001;
        const theme = this.chapterData.theme;
        
        if (theme === 'fall') this.ctx.fillStyle = "rgba(255, 69, 0, 0.4)";
        else if (theme === 'rise') this.ctx.fillStyle = "rgba(210, 180, 140, 0.3)";
        else if (theme === 'golden') this.ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        else this.ctx.fillStyle = "rgba(212, 175, 55, 0.1)";

        for (let i = 0; i < 25; i++) {
            let px, py;
            if (theme === 'fall') {
                px = (Math.sin(t + i * 2) * 600 + this.width / 2);
                py = 720 - ((t * 100 + i * 50) % 720);
            } else if (theme === 'rise') {
                px = ((t * 150 + i * 80) % this.width);
                py = (Math.cos(t + i * 1.5) * 200 + this.height / 2);
            } else {
                px = (Math.sin(t + i * 2) * 600 + this.width / 2);
                py = (Math.cos(t + i * 1.5) * 300 + this.height / 2);
            }
            this.ctx.beginPath(); this.ctx.arc(px, py, 2.5, 0, Math.PI * 2); this.ctx.fill();
        }
    }

    renderDecorations() {
        const t = performance.now() * 0.002;
        this.ctx.save();

        // 1. Lukis Pokok Kurma Abbasiyah di Latar Belakang (setiap ~700px di dunia)
        const treePositions = [450, 1250, 2050, 2850];
        for (let tx of treePositions) {
            const screenX = tx - this.cameraX;
            if (screenX < -150 || screenX > this.width + 150) continue;

            this.ctx.save();
            // Batang Pokok Melengkung Semulajadi
            this.ctx.fillStyle = "#5C3A21";
            this.ctx.beginPath();
            this.ctx.moveTo(screenX - 8, 620);
            this.ctx.quadraticCurveTo(screenX - 14, 520, screenX - 6, 430);
            this.ctx.lineTo(screenX + 6, 430);
            this.ctx.quadraticCurveTo(screenX + 14, 520, screenX + 8, 620);
            this.ctx.closePath();
            this.ctx.fill();

            // Cincin Batang Pokok
            this.ctx.strokeStyle = "#3E2413";
            this.ctx.lineWidth = 1.5;
            for (let ringY = 460; ringY < 610; ringY += 22) {
                this.ctx.beginPath();
                this.ctx.moveTo(screenX - 9, ringY);
                this.ctx.lineTo(screenX + 9, ringY + 2);
                this.ctx.stroke();
            }

            // Daun Pelepah Kurma Hijau Bergoyang Mengikut Angin
            const sway = Math.sin(t + tx * 0.01) * 8;
            const fronds = [-48, -24, 0, 24, 48];
            for (let fAngle of fronds) {
                this.ctx.save();
                this.ctx.translate(screenX, 430);
                this.ctx.rotate((fAngle * Math.PI / 180) + (sway * 0.015));
                this.ctx.fillStyle = "#27AE60";
                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.quadraticCurveTo(25, -28, 65, -12);
                this.ctx.quadraticCurveTo(35, 10, 0, 0);
                this.ctx.fill();
                this.ctx.restore();
            }
            this.ctx.restore();
        }

        // 2. Lukis Platform Peti Kayu Interaktif (Crates)
        for (let crate of this.crates) {
            const screenX = crate.x - this.cameraX;
            if (screenX < -100 || screenX > this.width + 100) continue;

            this.ctx.save();
            // Bayang bawah peti
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
            this.ctx.beginPath();
            this.ctx.ellipse(screenX + crate.width / 2, 620, crate.width / 2 + 6, 6, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Badan Peti Kayu
            this.ctx.fillStyle = "#8B5A2B";
            this.ctx.fillRect(screenX, crate.y, crate.width, crate.height);

            // Bingkai Kayu Gelap
            this.ctx.strokeStyle = "#4A2F13";
            this.ctx.lineWidth = 2.5;
            this.ctx.strokeRect(screenX, crate.y, crate.width, crate.height);

            // Palang X Kayu
            this.ctx.beginPath();
            this.ctx.moveTo(screenX + 4, crate.y + 4);
            this.ctx.lineTo(screenX + crate.width - 4, crate.y + crate.height - 4);
            this.ctx.moveTo(screenX + crate.width - 4, crate.y + 4);
            this.ctx.lineTo(screenX + 4, crate.y + crate.height - 4);
            this.ctx.stroke();

            // Jalur Pengikat Tembaga & Paku Emas
            this.ctx.fillStyle = "#D4AF37";
            this.ctx.fillRect(screenX, crate.y, crate.width, 5);
            this.ctx.fillRect(screenX, crate.y + crate.height - 5, crate.width, 5);
            this.ctx.beginPath();
            this.ctx.arc(screenX + 5, crate.y + 2.5, 1.8, 0, Math.PI * 2);
            this.ctx.arc(screenX + crate.width - 5, crate.y + 2.5, 1.8, 0, Math.PI * 2);
            this.ctx.arc(screenX + 5, crate.y + crate.height - 2.5, 1.8, 0, Math.PI * 2);
            this.ctx.arc(screenX + crate.width - 5, crate.y + crate.height - 2.5, 1.8, 0, Math.PI * 2);
            this.ctx.fill();

            // Petunjuk Lompat Mesra Kanak-Kanak
            this.ctx.fillStyle = "rgba(255, 215, 0, 0.85)";
            this.ctx.font = "bold 9px Plus Jakarta Sans, sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText("▲ LOMPAT", screenX + crate.width / 2, crate.y - 8);

            this.ctx.restore();
        }

        this.ctx.restore();
    }

    renderCityGate() {
        const gateX = this.chapterData.worldWidth - 140;
        const screenX = gateX - this.cameraX;
        if (screenX < -220 || screenX > this.width + 220) return;

        const t = performance.now() * 0.002;
        let isChapterComplete = true;
        let completedCount = 0;
        const totalCount = this.chapterData.entities.length;
        for (const ent of this.chapterData.entities) {
            if (this.completedEntities.has(ent.id)) completedCount++;
            else isChapterComplete = false;
        }

        this.ctx.save();

        // 1. Tiang & Menara Gerbang Batu (Kiri & Kanan)
        const wallColor = (this.chapterData.theme === 'fall') ? "#2A0E0E" : "#24334A";
        const trimColor = (this.chapterData.theme === 'fall') ? "#8B1E1E" : "#D4AF37";

        // Tiang Kiri
        this.ctx.fillStyle = wallColor;
        this.ctx.fillRect(screenX - 60, 360, 38, 260);
        this.ctx.fillStyle = trimColor;
        this.ctx.fillRect(screenX - 62, 355, 42, 8);
        this.ctx.fillRect(screenX - 62, 470, 42, 5);

        // Tiang Kanan
        this.ctx.fillStyle = wallColor;
        this.ctx.fillRect(screenX + 40, 360, 38, 260);
        this.ctx.fillStyle = trimColor;
        this.ctx.fillRect(screenX + 38, 355, 42, 8);
        this.ctx.fillRect(screenX + 38, 470, 42, 5);

        // Kubah Emas di Puncak Menara Kiri & Kanan
        this.ctx.fillStyle = trimColor;
        this.ctx.beginPath();
        this.ctx.arc(screenX - 41, 355, 18, Math.PI, 0);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(screenX + 59, 355, 18, Math.PI, 0);
        this.ctx.fill();

        // Bendera Hitam Abbasiyah Berkibar di Tiang Menara
        const flagSway = Math.sin(t * 4) * 5;
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(screenX - 41, 337); this.ctx.lineTo(screenX - 41, 312);
        this.ctx.moveTo(screenX + 59, 337); this.ctx.lineTo(screenX + 59, 312);
        this.ctx.stroke();

        this.ctx.fillStyle = "#111111"; // Panji Hitam Abbasiyah
        this.ctx.beginPath();
        this.ctx.moveTo(screenX - 41, 313);
        this.ctx.lineTo(screenX - 15, 318 + flagSway);
        this.ctx.lineTo(screenX - 41, 326);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(screenX + 59, 313);
        this.ctx.lineTo(screenX + 85, 318 + flagSway);
        this.ctx.lineTo(screenX + 59, 326);
        this.ctx.fill();

        // 2. Lengkungan Gerbang Utama (Center Arch)
        this.ctx.fillStyle = wallColor;
        this.ctx.fillRect(screenX - 22, 360, 62, 55);
        this.ctx.fillStyle = trimColor;
        this.ctx.fillRect(screenX - 22, 355, 62, 8);

        // Obor Api Baghdad di Kedua-dua Tiang
        const flameOffset = Math.sin(t * 9) * 3;
        const drawTorch = (tx, ty) => {
            this.ctx.fillStyle = "#4A2F13";
            this.ctx.fillRect(tx - 3, ty, 6, 15);
            this.ctx.fillStyle = "#E67E22";
            this.ctx.beginPath();
            this.ctx.arc(tx, ty - 4 + flameOffset * 0.5, 6, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = "#F39C12";
            this.ctx.beginPath();
            this.ctx.arc(tx, ty - 5 + flameOffset * 0.7, 4, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = "#FFF";
            this.ctx.beginPath();
            this.ctx.arc(tx, ty - 6 + flameOffset * 0.8, 2, 0, Math.PI * 2);
            this.ctx.fill();
        };
        drawTorch(screenX - 41, 465);
        drawTorch(screenX + 59, 465);

        // 3. KEADAAN PINTU GERBANG (TERKUNCI vs TERBUKA)
        if (!isChapterComplete) {
            // TERKUNCI: Jeriji Besi (Portcullis) Menutup Laluan
            this.ctx.fillStyle = "#101620";
            this.ctx.fillRect(screenX - 22, 415, 62, 205);

            this.ctx.strokeStyle = "#5A677D";
            this.ctx.lineWidth = 3;
            // Batang jeriji menegak
            for (let bx = screenX - 16; bx <= screenX + 34; bx += 10) {
                this.ctx.beginPath();
                this.ctx.moveTo(bx, 415);
                this.ctx.lineTo(bx, 620);
                this.ctx.stroke();
            }
            // Batang jeriji melintang
            for (let by = 445; by <= 600; by += 28) {
                this.ctx.beginPath();
                this.ctx.moveTo(screenX - 22, by);
                this.ctx.lineTo(screenX + 40, by);
                this.ctx.stroke();
            }

            // Perisai Magis Tenaga Kemerahan
            const shieldAlpha = 0.2 + Math.sin(t * 3) * 0.1;
            this.ctx.fillStyle = `rgba(231, 76, 60, ${shieldAlpha})`;
            this.ctx.fillRect(screenX - 22, 415, 62, 205);

            // Ikon Mangga Kunci Emas Terapung di Tengah Gerbang
            const lockY = 515 + Math.sin(t * 3.5) * 4;
            this.ctx.save();
            this.ctx.shadowColor = "rgba(255, 215, 0, 0.8)";
            this.ctx.shadowBlur = 12;
            this.ctx.fillStyle = "#FFD700";
            this.ctx.font = "bold 24px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText("🔒", screenX + 9, lockY);
            this.ctx.restore();

            // Papan Tanda Kayu di Atas Gerbang
            this.ctx.save();
            this.ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
            this.ctx.strokeStyle = "#E74C3C";
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.roundRect(screenX - 65, 380, 148, 26, 6);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.fillStyle = "#FCA5A5";
            this.ctx.font = "bold 10px Plus Jakarta Sans, sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText(`🔒 PINTU TERKUNCI (${completedCount}/${totalCount})`, screenX + 9, 397);
            this.ctx.restore();
        } else {
            // TERBUKA: Portal Kemenangan Bersinar Keemasan!
            const portalGlow = this.ctx.createLinearGradient(screenX - 22, 415, screenX + 40, 620);
            portalGlow.addColorStop(0, "rgba(78, 204, 163, 0.85)");
            portalGlow.addColorStop(0.5, "rgba(255, 215, 0, 0.95)");
            portalGlow.addColorStop(1, "rgba(72, 219, 251, 0.9)");

            this.ctx.save();
            this.ctx.shadowColor = "#FFD700";
            this.ctx.shadowBlur = 24;
            this.ctx.fillStyle = portalGlow;
            this.ctx.fillRect(screenX - 22, 415, 62, 205);

            // Pusaran Cahaya Portal
            this.ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
            this.ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                const py = 450 + ((t * 80 + i * 50) % 150);
                this.ctx.beginPath();
                this.ctx.arc(screenX + 9, py, 14 + i * 4, 0, Math.PI * 2);
                this.ctx.stroke();
            }

            // Sepanduk Kemenangan di Atas Gerbang
            this.ctx.fillStyle = "rgba(10, 30, 20, 0.95)";
            this.ctx.strokeStyle = "#FFD700";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.roundRect(screenX - 70, 375, 158, 28, 8);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.fillStyle = "#FFD700";
            this.ctx.font = "bold 11px Plus Jakarta Sans, sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText("✨ PINTU TERBUKA! LALU DI SINI ➔", screenX + 9, 393);
            this.ctx.restore();
        }

        this.ctx.restore();
    }

    renderQuestNavigator() {
        if (!this.chapterData || !this.chapterData.entities) return;

        // Cari sasaran terdekat yang belum selesai
        let target = null;
        let targetDistance = Infinity;
        let isChapterComplete = true;

        for (const ent of this.chapterData.entities) {
            if (!this.completedEntities.has(ent.id)) {
                isChapterComplete = false;
                const dist = ent.x - this.player.x;
                if (Math.abs(dist) < Math.abs(targetDistance)) {
                    targetDistance = dist;
                    target = ent;
                }
            }
        }

        // Jika semua entiti selesai, sasaran seterusnya ialah Pintu Gerbang Kota
        const gateX = this.chapterData.worldWidth - 140;
        if (isChapterComplete) {
            target = { name: "Pintu Gerbang Kota (Tamat Bab)", x: gateX, type: "gate" };
            targetDistance = gateX - this.player.x;
        }

        if (!target) return;

        const distMeters = Math.max(1, Math.round(Math.abs(targetDistance) / 10));
        const isRight = targetDistance > 0;
        const isVeryClose = Math.abs(targetDistance) < 70;

        // Paparkan lencana panduan terapung di bawah skrin
        this.ctx.save();
        const badgeWidth = 360;
        const badgeHeight = 34;
        const badgeX = (this.width - badgeWidth) / 2;
        const badgeY = 672;

        this.ctx.fillStyle = isChapterComplete ? "rgba(13, 37, 24, 0.94)" : "rgba(11, 20, 38, 0.92)";
        this.ctx.strokeStyle = isChapterComplete ? "#4ECCA3" : "#D4AF37";
        this.ctx.lineWidth = 1.6;
        this.ctx.beginPath();
        this.ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 17);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.textAlign = "center";
        this.ctx.font = "bold 12px Plus Jakarta Sans, sans-serif";

        if (isVeryClose && !isChapterComplete) {
            this.ctx.fillStyle = "#4ECCA3";
            this.ctx.fillText(`⚡ Berdekatan: ${target.name}! Tekan [ E ] untuk mula`, this.width / 2, badgeY + 21);
        } else if (isChapterComplete) {
            this.ctx.fillStyle = "#FFD700";
            this.ctx.fillText(`🏆 SEMUA SELESAI! Teruskan mara ke Pintu Gerbang Kota ➔`, this.width / 2, badgeY + 21);
        } else {
            this.ctx.fillStyle = "#F5E08C";
            if (isRight) {
                this.ctx.fillText(`🧭 Misi Seterusnya: ${target.name} ( ➔ ${distMeters}m )`, this.width / 2, badgeY + 21);
            } else {
                this.ctx.fillText(`🧭 ( ⬅ ${distMeters}m ) Misi Seterusnya: ${target.name}`, this.width / 2, badgeY + 21);
            }
        }

        this.ctx.restore();
    }

    // ==========================================
    // 4. PENGENDALIAN PENCERITAAN & KEPUTUSAN
    // ==========================================
    triggerInteraction(entity) {
        if (entity.gameType) return this.launchMiniGame(entity);

        this.isModalOpen = true;
        this.keys.left = false;
        this.keys.right = false;
        this.currentActiveEntity = entity;
        this.attemptCount = 0;

        const modal = document.getElementById('dialogue-modal');
        const title = document.getElementById('dialogue-title');
        const narration = document.getElementById('dialogue-narration');
        const storyActions = document.getElementById('story-actions');
        const decisionBlock = document.getElementById('decision-block');
        const feedbackCard = document.getElementById('academic-feedback');
        const hintBox = document.getElementById('dialogue-hint-box');

        if(!modal || !title || !narration) return this.closeModal();

        title.innerText = entity.story.title;
        narration.classList.add('typewriter-cursor');
        
        storyActions.classList.remove('hidden');
        decisionBlock.classList.add('hidden');
        feedbackCard.classList.add('hidden');
        if (hintBox) hintBox.classList.add('hidden');
        document.getElementById('btn-story-continue').classList.add('hidden');

        if(this.typewriterInterval) clearInterval(this.typewriterInterval);
        let charIndex = 0;
        narration.innerHTML = "";
        const fullText = `"${entity.story.text}"`;

        this.typewriterInterval = setInterval(() => {
            narration.innerHTML += fullText.charAt(charIndex);
            charIndex++;
            if (charIndex >= fullText.length) {
                clearInterval(this.typewriterInterval);
                narration.classList.remove('typewriter-cursor');
                document.getElementById('btn-story-continue').classList.remove('hidden');
            }
        }, 18);

        // Suara Pembaca Melayu Beremosi & Bertaraf Filem
        this.stopAudio();
        this.updateVoiceLabel();

        const btnToggleVoice = document.getElementById('btn-toggle-voice');
        if (btnToggleVoice) {
            btnToggleVoice.onclick = (e) => {
                e.stopPropagation();
                const curVoice = this.getVoiceChoice();
                const nextVoice = (curVoice === 'osman') ? 'yasmin' : 'osman';
                this.setVoiceChoice(nextVoice);
                if (this._gameAudio) {
                    this.speakText(entity.story.text, btnListen);
                }
            };
        }

        const btnListen = document.getElementById('btn-listen-speech');
        if (btnListen) {
            this.setButtonAudioState(btnListen, 'idle');
            btnListen.onclick = (e) => {
                e.stopPropagation();
                this.speakText(entity.story.text, btnListen);
            };
        }

        document.getElementById('btn-story-continue').onclick = () => {
            this.stopAudio();
            if (entity.story.question) this.displayQuestion(entity.story);
            else this.completeInteraction(entity, entity.story.rewardXP || 10);
        };

        modal.classList.remove('hidden');
    }

    getVoiceChoice() {
        return localStorage.getItem('sirahable_game_voice') || 'osman';
    }

    setVoiceChoice(v) {
        localStorage.setItem('sirahable_game_voice', v);
        this.updateVoiceLabel();
    }

    updateVoiceLabel() {
        const label = document.getElementById('voice-name-label');
        if (label) {
            const v = this.getVoiceChoice();
            label.innerText = (v === 'yasmin') ? 'Suara: Yasmin (Wanita)' : 'Suara: Osman (Lelaki)';
        }
    }

    stopAudio() {
        if (this._gameAudio) {
            try {
                this._gameAudio.pause();
                this._gameAudio.currentTime = 0;
                this._gameAudio.src = '';
            } catch(e) {}
            this._gameAudio = null;
        }
        if ('speechSynthesis' in window) {
            try { window.speechSynthesis.cancel(); } catch(e) {}
        }
        if (this._activeAudioBtn) {
            this.setButtonAudioState(this._activeAudioBtn, 'idle');
            this._activeAudioBtn = null;
        }
    }

    setButtonAudioState(btn, state) {
        if (!btn) return;
        btn.classList.remove('is-playing', 'is-loading');
        const iconSpan = btn.querySelector('.audio-status-icon') || btn.querySelector('span:first-child');
        const textSpan = btn.querySelector('.audio-status-text') || btn.querySelector('span:last-child');

        if (state === 'loading') {
            btn.classList.add('is-loading');
            if (iconSpan) iconSpan.innerText = '⏳';
            if (textSpan) textSpan.innerText = 'MEMUATKAN SUARA...';
        } else if (state === 'playing') {
            btn.classList.add('is-playing');
            if (iconSpan) iconSpan.innerText = '⏹️';
            if (textSpan) textSpan.innerText = 'BERHENTI SUARA';
        } else {
            if (iconSpan) iconSpan.innerText = '🔊';
            if (textSpan) textSpan.innerText = (btn.id === 'btn-listen-feedback') ? 'Dengar Ulasan' : 'DENGAR PENCERITAAN';
        }
    }

    speakText(text, btnElement) {
        if (!text || !text.trim()) return;

        // Jika butang yang sama ditekan semasa sedang bercerita -> hentikan
        if (this._gameAudio && this._activeAudioBtn === btnElement) {
            this.stopAudio();
            return;
        }

        this.stopAudio();

        const btn = btnElement || document.getElementById('btn-listen-speech');
        this._activeAudioBtn = btn;
        this.setButtonAudioState(btn, 'loading');

        const voice = this.getVoiceChoice();
        const cleanText = text.trim();

        // Enjin Edge-TTS Melayu Neural beremosi (kadar kelajuan bercerita santai & berwibawa)
        const url = `api/tts.php?text=${encodeURIComponent(cleanText)}&voice=${voice}&rate=-3%`;
        const audio = new Audio(url);
        this._gameAudio = audio;

        audio.oncanplay = () => {
            if (this._gameAudio === audio) {
                this.setButtonAudioState(btn, 'playing');
            }
        };

        audio.onended = () => {
            this.setButtonAudioState(btn, 'idle');
            this._gameAudio = null;
            this._activeAudioBtn = null;
        };

        const fallback = () => {
            try {
                this.setButtonAudioState(btn, 'playing');
                const utt = new SpeechSynthesisUtterance(cleanText);
                utt.lang = 'ms-MY';
                utt.rate = 0.92;
                utt.pitch = 1.0;
                const voices = window.speechSynthesis.getVoices();
                const myVoice = voices.find(v => v.lang && (v.lang === 'ms-MY' || v.lang.startsWith('ms')));
                if (myVoice) utt.voice = myVoice;
                utt.onend = () => {
                    this.setButtonAudioState(btn, 'idle');
                    this._activeAudioBtn = null;
                };
                utt.onerror = () => {
                    this.setButtonAudioState(btn, 'idle');
                    this._activeAudioBtn = null;
                };
                window.speechSynthesis.speak(utt);
            } catch(e) {
                this.setButtonAudioState(btn, 'idle');
                this._activeAudioBtn = null;
            }
        };

        audio.onerror = () => {
            console.warn("TTS server audio error, falling back to browser synthesis");
            fallback();
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.setButtonAudioState(btn, 'playing');
            }).catch(err => {
                console.warn("Audio autoplay policy or error:", err);
                fallback();
            });
        }
    }

    displayQuestion(story) {
        document.getElementById('story-actions').classList.add('hidden');
        const decisionBlock = document.getElementById('decision-block');
        const questionText = document.getElementById('question-text');
        const optionsGrid = document.getElementById('options-container');

        questionText.innerText = story.question;
        optionsGrid.innerHTML = '';

        const shuffledOptions = shuffleArray([...story.options]);
        const labels = ['A', 'B', 'C', 'D'];

        shuffledOptions.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="opt-label">${labels[index]}.</span> <span>${opt.text}</span>`;
            
            btn.onclick = () => {
                this.evaluateAnswer(opt, btn, shuffledOptions, story);
            };
            optionsGrid.appendChild(btn);
        });

        decisionBlock.classList.remove('hidden');
    }

    evaluateAnswer(selectedOpt, clickedBtn, allOptions, story) {
        try {
            const optionsGrid = document.getElementById('options-container');
            const allBtns = optionsGrid.querySelectorAll('.option-btn');
            const feedbackCard = document.getElementById('academic-feedback');
            const fbStatus = document.getElementById('feedback-status');
            const fbExp = document.getElementById('feedback-explanation');
            const btnClose = document.getElementById('btn-close-dialogue');
            const hintBox = document.getElementById('dialogue-hint-box');
            const hintText = document.getElementById('dialogue-hint-text');

            if (selectedOpt.correct) {
                if (window.SirahAudio) window.SirahAudio.correct();
                this.playCoinChime();
                allBtns.forEach(b => b.disabled = true);
                fbStatus.innerHTML = "FAKTA TEPAT! <span style='color:#FFD700'>+2 Dinar</span> <span style='color:#4ECCA3'>+10 XP</span>";
                fbStatus.style.color = "#4ECCA3";
                clickedBtn.classList.add('correct');
                this.addDinar(2, null);
                this.addXP(10, "Jawapan Tepat (+10 XP, +2 Dinar)");
                this.addFloatingText("+2 Dinar 🪙", this.player.x, this.player.y - 20, "#FFD700");
                if (hintBox) hintBox.classList.add('hidden');

                fbExp.innerText = story.explanation;
                feedbackCard.classList.remove('hidden');
                setTimeout(() => {
                    feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);

                const btnListenFb = document.getElementById('btn-listen-feedback');
                if (btnListenFb) {
                    this.setButtonAudioState(btnListenFb, 'idle');
                    btnListenFb.onclick = (e) => {
                        e.stopPropagation();
                        const fullFb = "Fakta tepat! " + story.explanation;
                        this.speakText(fullFb, btnListenFb);
                    };
                }

                btnClose.innerText = "Teruskan Pengembaraan →";
                btnClose.onclick = () => {
                    this.stopAudio();
                    this.completeInteraction(this.currentActiveEntity, 0);
                };
            } else {
                if (window.SirahAudio) window.SirahAudio.wrong();
                this.playTone(180, 'sawtooth', 0.22, 0, 0.2);
                this.chapterErrors[this.currentChapter] = (this.chapterErrors[this.currentChapter] || 0) + 1;
                this.updateStarsHUD();

                // Konsep Scaffolding: Jika salah pada percubaan pertama, beri hint & peluang cuba lagi
                if (this.attemptCount === 0 && story.hint) {
                    this.attemptCount++;
                    clickedBtn.classList.add('wrong');
                    clickedBtn.disabled = true;

                    if (hintBox && hintText) {
                        hintText.innerText = story.hint;
                        hintBox.classList.remove('hidden');
                    }
                    this.showToast("Kurang tepat. Teliti petunjuk pembayang dan cuba lagi!");
                    return; // Beri peluang pilih semula pilihan lain
                }

                // Salah kali kedua atau tiada hint
                allBtns.forEach(b => b.disabled = true);
                fbStatus.innerText = "Pembetulan Fakta Sejarah";
                fbStatus.style.color = "#FF6B6B";
                clickedBtn.classList.add('wrong');
                
                allOptions.forEach((opt, idx) => {
                    if (opt.correct && allBtns[idx]) allBtns[idx].classList.add('correct');
                });

                if (!this.isStudyMode) {
                    this.lives = Math.max(0, this.lives - 1);
                    this.updateLivesHUD();
                }

                fbExp.innerText = story.explanation;
                feedbackCard.classList.remove('hidden');
                setTimeout(() => {
                    feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);

                const btnListenFb = document.getElementById('btn-listen-feedback');
                if (btnListenFb) {
                    this.setButtonAudioState(btnListenFb, 'idle');
                    btnListenFb.onclick = (e) => {
                        e.stopPropagation();
                        const fullFb = "Pembetulan fakta sejarah. " + story.explanation;
                        this.speakText(fullFb, btnListenFb);
                    };
                }

                if (this.lives <= 0 && !this.isStudyMode) {
                    fbStatus.innerText = "NYAWA TAMAT!";
                    fbExp.innerText = "Anda telah kehabisan 3 nyawa. Ulangkaji semula bab ini atau hidupkan Mod Santai untuk terus belajar.";
                    btnClose.innerText = "Mula Semula Bab ↺";
                    btnClose.onclick = () => {
                        this.lives = 3;
                        this.updateLivesHUD();
                        this.completedEntities.clear(); 
                        this.closeModal();
                        this.loadChapter(this.currentChapter); 
                    };
                } else {
                    btnClose.innerText = "Faham & Teruskan →";
                    btnClose.onclick = () => this.completeInteraction(this.currentActiveEntity, 0);
                }
            }
        } catch (error) {
            console.error("Ralat Logik Jawapan:", error);
            this.closeModal();
        }
    }

    // ==========================================
    // 5. SISTEM MINI-GAME PENDIDIKAN (5 BAB PENUH)
    // ==========================================
    launchMiniGame(entity) {
        this.isModalOpen = true;
        this.keys.left = false;
        this.keys.right = false;
        this.currentActiveEntity = entity;

        const modal = document.getElementById('minigame-modal');
        const title = document.getElementById('minigame-title');
        const body = document.getElementById('minigame-body');

        if (!modal || !title || !body) return this.closeModal();

        title.innerText = entity.story.title;
        body.innerHTML = '';

        if (entity.gameType === 'timeline') {
            this.setupTimelineMiniGame(entity, body);
        } else if (entity.gameType === 'build_city') {
            this.setupCityBuilderMiniGame(entity, body);
        } else if (entity.gameType === 'bayt_hikmah') {
            this.setupBaytHikmahMiniGame(entity, body);
        } else if (entity.gameType === 'dilemma') {
            this.setupDilemmaMiniGame(entity, body);
        } else if (entity.gameType === 'save_manuscripts') {
            this.setupRescueManuscriptsMiniGame(entity, body);
        } else {
            this.closeModal();
        }

        modal.classList.remove('hidden');
    }

    // --- MINI-GAME 1: KRONOLOGI REVOLUSI (BAB 1) ---
    setupTimelineMiniGame(entity, container) {
        const events = [
            { id: 1, year: "747 M", text: "Kempen Rahsia: Gerakan sulit digerakkan di Khurasan menyatukan golongan Mawali." },
            { id: 2, year: "749 M", text: "Pemberontakan Terbuka: Pasukan Abbasiyah mara menawan Kufah dari Umayyah." },
            { id: 3, year: "750 M", text: "Pertempuran Sungai Zab: Kemenangan mutlak yang menumbangkan Dinasti Umayyah." },
            { id: 4, year: "750 M", text: "Pengisytiharan Khalifah: Abu al-Abbas As-Saffah dilantik sebagai Khalifah pertama." }
        ];

        // Rawakkan susunan awal
        let currentOrder = shuffleArray([...events]);

        container.innerHTML = `
            <p class="mg-intro-sub">
                Gunakan butang <strong>▲</strong> atau <strong>▼</strong> pada setiap kad untuk menyusun 4 fasa kebangkitan Abbasiyah mengikut turutan tahun yang betul (dari fasa awal ke pengisytiharan khalifah):
            </p>
            <div class="mg-timeline-container" id="mg1-timeline-list"></div>
            <div id="mg1-feedback" class="feedback-card hidden" style="margin-bottom:15px;"></div>
            <div class="action-buttons-group">
                <button class="btn-primary" id="btn-check-mg1">Semak Susunan Kronologi</button>
            </div>
        `;

        const renderList = () => {
            const listEl = document.getElementById('mg1-timeline-list');
            listEl.innerHTML = '';
            currentOrder.forEach((ev, idx) => {
                const item = document.createElement('div');
                item.className = 'mg-timeline-item';
                item.innerHTML = `
                    <div class="mg-item-left">
                        <div class="mg-num-badge">${idx + 1}</div>
                        <div>
                            <div class="mg-item-title">${ev.text}</div>
                            <div class="mg-item-era">Fasa Tarikh: ${ev.year}</div>
                        </div>
                    </div>
                    <div class="mg-reorder-ctrls">
                        <button class="btn-reorder" data-idx="${idx}" data-dir="-1" title="Naikkan">▲</button>
                        <button class="btn-reorder" data-idx="${idx}" data-dir="1" title="Turunkan">▼</button>
                    </div>
                `;
                listEl.appendChild(item);
            });

            // Butang naik / turun
            listEl.querySelectorAll('.btn-reorder').forEach(b => {
                b.onclick = () => {
                    const idx = parseInt(b.dataset.idx);
                    const dir = parseInt(b.dataset.dir);
                    const targetIdx = idx + dir;
                    if (targetIdx >= 0 && targetIdx < currentOrder.length) {
                        const temp = currentOrder[idx];
                        currentOrder[idx] = currentOrder[targetIdx];
                        currentOrder[targetIdx] = temp;
                        renderList();
                    }
                };
            });
        };

        renderList();

        document.getElementById('btn-check-mg1').onclick = () => {
            const isCorrect = currentOrder.every((ev, idx) => ev.id === (idx + 1));
            const fb = document.getElementById('mg1-feedback');
            fb.classList.remove('hidden');

            if (isCorrect) {
                fb.innerHTML = `
                    <h4 style="color:#4ECCA3;">✦ TEPAT! KRONOLOGI LENGKAP (+30 XP)</h4>
                    <p style="color:#FFF;">Tahniah! Anda telah membuktikan kefahaman bahawa gerakan bermula secara rahsia di Khurasan, diikuti Pertempuran Zab (750 M) dan pengisytiharan Abu al-Abbas As-Saffah di Kufah.</p>
                `;
                this.addXP(30, "Misi Garis Masa Selesai! (+30 XP)");
                this.completedEntities.add(entity.id);
                setTimeout(() => this.closeModal(), 2200);
            } else {
                fb.innerHTML = `
                    <h4 style="color:#FF6B6B;">Susunan Belum Tepat</h4>
                    <p style="color:var(--color-text-muted);"><em>Petunjuk:</em> Kempen rahsia Khurasan (747 M) adalah yang terawal, manakala pengisytiharan Khalifah di Kufah adalah fasa terakhir kebangkitan.</p>
                `;
            }
        };
    }

    // --- MINI-GAME 2: ARKITEK KOTA BULAT (BAB 2) ---
    setupCityBuilderMiniGame(entity, container) {
        const slotsData = {
            center: { name: "Pusat Kota", correctId: "palace", label: "Pusat Bulatan" },
            top: { name: "Pintu Syam (Utara)", correctId: "syam", label: "Pintu Utara" },
            right: { name: "Pintu Khurasan (Timur)", correctId: "khurasan", label: "Pintu Timur" },
            bottom: { name: "Pintu Basrah (Selatan)", correctId: "basrah", label: "Pintu Selatan" },
            left: { name: "Pintu Kufah (Barat)", correctId: "kufah", label: "Pintu Barat" }
        };

        const parts = [
            { id: "palace", name: "Istana Emas & Masjid Agung", label: "ISTANA" },
            { id: "syam", name: "Pintu Syam (Laluan Damsyik)", label: "UTARA" },
            { id: "khurasan", name: "Pintu Khurasan (Laluan Timur)", label: "TIMUR" },
            { id: "basrah", name: "Pintu Basrah (Laluan Teluk)", label: "SELATAN" },
            { id: "kufah", name: "Pintu Kufah (Laluan Hijaz)", label: "BARAT" }
        ];

        let selectedPartId = null;
        let placedSlots = { center: null, top: null, right: null, bottom: null, left: null };

        container.innerHTML = `
            <p class="mg-intro-sub">
                Pilih binaan daripada palet di sebelah kanan, kemudian klik slot yang betul pada pelan <strong>Kota Bulat Madinat al-Salam</strong>:
            </p>
            <div class="mg-city-builder">
                <!-- Peta Bulatan -->
                <div class="mg-circle-stage">
                    <div class="mg-ring-outer"></div>
                    <div class="mg-gate-slot mg-gate-top" data-slot="top">Utara</div>
                    <div class="mg-gate-slot mg-gate-right" data-slot="right">Timur</div>
                    <div class="mg-gate-slot mg-gate-bottom" data-slot="bottom">Selatan</div>
                    <div class="mg-gate-slot mg-gate-left" data-slot="left">Barat</div>
                    <div class="mg-center-zone" data-slot="center">Pusat Bulatan</div>
                </div>

                <!-- Palet Binaan -->
                <div class="mg-parts-palette" id="mg2-parts-list"></div>
            </div>
            <div id="mg2-feedback" class="feedback-card hidden" style="margin-bottom:15px;"></div>
            <div class="action-buttons-group">
                <button class="btn-primary" id="btn-check-mg2">Sahkan Pelan Kota Baghdad</button>
            </div>
        `;

        const renderPalette = () => {
            const pList = document.getElementById('mg2-parts-list');
            pList.innerHTML = '';
            parts.forEach(p => {
                const isUsed = Object.values(placedSlots).includes(p.id);
                const item = document.createElement('div');
                item.className = `mg-palette-item ${selectedPartId === p.id ? 'selected' : ''} ${isUsed ? 'used' : ''}`;
                item.innerHTML = `<span style="font-weight:800; color:var(--color-gold); font-size:0.75rem; border:1px solid rgba(212,175,55,0.4); padding:2px 6px; border-radius:4px;">${p.label}</span> <span>${p.name}</span>`;
                item.onclick = () => {
                    if (isUsed) return;
                    selectedPartId = p.id;
                    renderPalette();
                };
                pList.appendChild(item);
            });
        };

        renderPalette();

        // Klik pada slot bulatan
        container.querySelectorAll('[data-slot]').forEach(slotEl => {
            slotEl.onclick = () => {
                const slotKey = slotEl.dataset.slot;
                if (!selectedPartId) {
                    this.showToast("Pilih binaan di senarai kanan terlebih dahulu!");
                    return;
                }
                placedSlots[slotKey] = selectedPartId;
                const partObj = parts.find(p => p.id === selectedPartId);
                slotEl.classList.add('filled');
                slotEl.innerHTML = `<strong style="color:var(--color-gold); font-size:0.75rem;">${partObj.label}</strong><br>${partObj.name.split(' ')[0]}`;
                selectedPartId = null;
                renderPalette();
            };
        });

        document.getElementById('btn-check-mg2').onclick = () => {
            const isAllFilled = Object.values(placedSlots).every(v => v !== null);
            const fb = document.getElementById('mg2-feedback');
            fb.classList.remove('hidden');

            if (!isAllFilled) {
                fb.innerHTML = `<h4 style="color:#FF6B6B;">Pelan Belum Lengkap</h4><p>Sila tempatkan kesemua 5 komponen sebelum menyemak.</p>`;
                return;
            }

            const isCorrect = Object.keys(slotsData).every(k => placedSlots[k] === slotsData[k].correctId);
            if (isCorrect) {
                fb.innerHTML = `
                    <h4 style="color:#4ECCA3;">✦ TAHNIAH ARKITEK KOTA! (+30 XP)</h4>
                    <p style="color:#FFF;">Reka bentuk sempurna! Istana & Masjid di tengah melambangkan syiar Islam, manakala 4 pintu gerbang memudahkan kawalan ketenteraan dan perdagangan dunia.</p>
                `;
                this.addXP(30, "Misi Reka Bentuk Baghdad Berjaya! (+30 XP)");
                this.completedEntities.add(entity.id);
                setTimeout(() => this.closeModal(), 2400);
            } else {
                fb.innerHTML = `
                    <h4 style="color:#FF6B6B;">Kedudukan Kurang Tepat</h4>
                    <p><em>Petunjuk:</em> Istana Emas mesti berada di Pusat Kota. Pintu Syam menghadap Utara (Syria), Pintu Khurasan di Timur, Pintu Basrah di Selatan, dan Pintu Kufah di Barat.</p>
                `;
            }
        };
    }

    // --- MINI-GAME 3: MAKMAAL BAYT AL-HIKMAH & ASTROLAB (BAB 3) ---
    setupBaytHikmahMiniGame(entity, container) {
        let leftSel = null, rightSel = null;
        let pairsMatched = 0;
        let astrolabeAligned = false;

        container.innerHTML = `
            <p class="mg-intro-sub">
                <strong>Fasa 1:</strong> Padankan sarjana di lajur kiri dengan disiplin ilmu/karya di lajur kanan:
            </p>
            <div class="mg-match-grid">
                <div class="mg-column" id="mg3-col-left">
                    <button class="mg-btn" data-key="algebra">Muhammad bin Musa Al-Khwarizmi</button>
                    <button class="mg-btn" data-key="medicine">Abu Bakar Al-Razi (Rhazes)</button>
                    <button class="mg-btn" data-key="trans">Hunayn ibn Ishaq</button>
                    <button class="mg-btn" data-key="astro">Al-Battani & Sind ibn Ali</button>
                </div>
                <div class="mg-column" id="mg3-col-right">
                    <button class="mg-btn" data-target="medicine">Kitab Al-Hawi (Kajian Penyakit Cacar/Campak)</button>
                    <button class="mg-btn" data-target="algebra">Asas Algebra (Al-Jabr) & Angka Sifar</button>
                    <button class="mg-btn" data-target="astro">Cerapan Falak & Kalendar Takwim Suria</button>
                    <button class="mg-btn" data-target="trans">Biro Penterjemahan Manuskrip Yunani & Parsi</button>
                </div>
            </div>

            <!-- Fasa 2: Astrolab -->
            <div class="mg-astrolabe-box hidden" id="mg3-astrolabe-section">
                <h4 style="color:var(--color-gold-bright); font-family:var(--font-heading);">Fasa 2: Kalibrasi Astrolab Tembaga ke Arah Kiblat</h4>
                <p style="font-size:0.85rem; color:var(--color-text-muted); margin-top:4px;">
                    Putar jarum Astrolab sehingga menghala ke sudut Kiblat Mekah (Sasaran: 210°):
                </p>
                <div class="mg-astrolabe-dial">
                    <div class="mg-needle" id="astrolabe-needle" style="transform: rotate(30deg);"></div>
                </div>
                <div style="font-size:0.9rem; font-weight:bold; color:var(--color-gold);" id="needle-angle-text">Sudut Semasa: 30°</div>
                <div style="margin-top:10px; display:flex; justify-content:center; gap:10px;">
                    <button class="btn-secondary" id="btn-turn-needle">Putar Jarum (+45°)</button>
                    <button class="btn-primary" id="btn-lock-kiblat">Kunci Arah Kiblat</button>
                </div>
            </div>

            <div id="mg3-feedback" class="feedback-card hidden" style="margin-top:15px;"></div>
        `;

        const leftBtns = container.querySelectorAll('#mg3-col-left .mg-btn');
        const rightBtns = container.querySelectorAll('#mg3-col-right .mg-btn');

        leftBtns.forEach(b => b.onclick = () => {
            if (b.classList.contains('matched')) return;
            leftBtns.forEach(btn => btn.classList.remove('selected'));
            b.classList.add('selected');
            leftSel = b;
            checkMatch();
        });

        rightBtns.forEach(b => b.onclick = () => {
            if (b.classList.contains('matched')) return;
            rightBtns.forEach(btn => btn.classList.remove('selected'));
            b.classList.add('selected');
            rightSel = b;
            checkMatch();
        });

        const checkMatch = () => {
            if (leftSel && rightSel) {
                if (leftSel.dataset.key === rightSel.dataset.target) {
                    leftSel.classList.add('matched');
                    rightSel.classList.add('matched');
                    leftSel = null; rightSel = null;
                    pairsMatched++;

                    if (pairsMatched === 4) {
                        this.showToast("Padanan sarjana sempurna! Beralih ke Fasa 2...");
                        document.getElementById('mg3-astrolabe-section').classList.remove('hidden');
                        document.getElementById('mg3-astrolabe-section').scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    leftSel.classList.remove('selected');
                    rightSel.classList.remove('selected');
                    leftSel = null; rightSel = null;
                    this.showToast("Padanan kurang tepat. Sila rujuk karya sarjana berkenaan.");
                }
            }
        };

        // Astrolabe Needle Rotation
        let currentAngle = 30;
        const needleEl = document.getElementById('astrolabe-needle');
        const angleText = document.getElementById('needle-angle-text');

        document.getElementById('btn-turn-needle').onclick = () => {
            currentAngle = (currentAngle + 45) % 360;
            needleEl.style.transform = `rotate(${currentAngle}deg)`;
            angleText.innerText = `Sudut Semasa: ${currentAngle}°`;
        };

        document.getElementById('btn-lock-kiblat').onclick = () => {
            const fb = document.getElementById('mg3-feedback');
            fb.classList.remove('hidden');
            // Sudut 210° adalah Kiblat Baghdad (atau toleransi 195°-225°)
            if (currentAngle === 210) {
                fb.innerHTML = `
                    <h4 style="color:#4ECCA3;">✦ KALIBRASI SEMPURNA! (+30 XP)</h4>
                    <p style="color:#FFF;">Tahniah Sarjana! Anda berjaya menguasai khazanah ilmu Bayt al-Hikmah dan mengaplikasikan instrumen Astrolab bagi menentukan arah kiblat umat Islam.</p>
                `;
                this.addXP(30, "Misi Sarjana Falak Berjaya! (+30 XP)");
                this.completedEntities.add(entity.id);
                setTimeout(() => this.closeModal(), 2400);
            } else {
                fb.innerHTML = `
                    <h4 style="color:#FF6B6B;">Arah Belum Tepat</h4>
                    <p>Sasaran Kiblat dari Baghdad ialah <strong>210°</strong> (Barat Daya). Teruskan memutar jarum!</p>
                `;
            }
        };
    }

    // --- MINI-GAME 4: DILEMA WAZIR ISTANA (BAB 4) ---
    setupDilemmaMiniGame(entity, container) {
        let currentStep = 1;
        let score = 0;

        const scenarios = [
            {
                step: 1,
                title: "Dilema 1: Ancaman Campur Tangan Tentera Samarra",
                situation: "Panglima tentera upahan Turki di Samarra semakin mendominasi istana dan menuntut kuasa melantik khalifah boneka. Apakah langkah pentadbiran terbaik?",
                choices: [
                    {
                        text: "Akur sepenuhnya kepada tuntutan tentera agar tidak berlaku pertumpahan darah serta-merta.",
                        correct: false,
                        analysis: "Pilihan ini terbukti melemahkan institusi khalifah dan mencetuskan Fitnah Samarra yang berpanjangan."
                    },
                    {
                        text: "Menyusun semula struktur pentadbiran, mengukuhkan kesetiaan gabenor wilayah, dan menegakkan undang-undang syura secara tegas.",
                        correct: true,
                        analysis: "Tepat! Pemimpin yang bijak mesti mengimbangi kuasa ketenteraan dengan integriti kepimpinan agar kedaulatan negara terpelihara."
                    }
                ]
            },
            {
                step: 2,
                title: "Dilema 2: Kemelesetan Hasil Perbendaharaan Baitulmal",
                situation: "Kutipan cukai merosot kerana tanah pertanian di Iraq rosak akibat konflik, manakala beban perbelanjaan tentera semakin membengkak. Bagaimana menyelamatkan ekonomi?",
                choices: [
                    {
                        text: "Membaik pulih sistem terusan pengairan Sungai Dajlah dan mengaudit perbelanjaan Baitulmal secara telus.",
                        correct: true,
                        analysis: "Tepat! Pembangunan sektor pertanian dan ketelusan audit adalah teras pemulihan ekonomi mampan dalam tamadun Islam."
                    },
                    {
                        text: "Mengenakan cukai yang tinggi secara paksa ke atas rakyat jelata dan petani miskin.",
                        correct: false,
                        analysis: "Pilihan ini menindas rakyat dan sejarah membuktikan ia mencetuskan pemberontakan Zanj yang memusnahkan ekonomi."
                    }
                ]
            }
        ];

        const renderScenario = (sc) => {
            container.innerHTML = `
                <div class="mg-dilemma-container">
                    <div class="mg-scenario-banner">
                        <strong style="color:var(--color-gold-bright);">${sc.title}</strong><br>
                        ${sc.situation}
                    </div>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${sc.choices.map((c, idx) => `
                            <div class="mg-choice-card" data-idx="${idx}">
                                <div class="mg-choice-head">PILIHAN ${idx + 1}</div>
                                <div class="mg-choice-desc">${c.text}</div>
                                <div class="mg-consequence hidden" id="consequence-${idx}">
                                    <strong>Analisis Sejarah:</strong> ${c.analysis}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div id="mg4-feedback" class="feedback-card hidden"></div>
            `;

            container.querySelectorAll('.mg-choice-card').forEach(card => {
                card.onclick = () => {
                    const idx = parseInt(card.dataset.idx);
                    const chosen = sc.choices[idx];
                    container.querySelectorAll('.mg-choice-card').forEach(c => c.classList.add('evaluated'));
                    card.classList.add('selected-choice');
                    document.getElementById(`consequence-${idx}`).classList.remove('hidden');

                    const fb = document.getElementById('mg4-feedback');
                    fb.classList.remove('hidden');

                    if (chosen.correct) {
                        score++;
                        fb.innerHTML = `<h4 style="color:#4ECCA3;">✓ KEPUTUSAN BIJAKSANA!</h4><p>${chosen.analysis}</p>`;
                    } else {
                        fb.innerHTML = `<h4 style="color:#FF6B6B;">✗ KEPUTUSAN BERISIKO TINGGI</h4><p>${chosen.analysis}</p>`;
                    }

                    setTimeout(() => {
                        if (currentStep < scenarios.length) {
                            currentStep++;
                            renderScenario(scenarios[currentStep - 1]);
                        } else {
                            this.finishDilemma(score);
                        }
                    }, 2800);
                };
            });
        };

        renderScenario(scenarios[0]);
    }

    finishDilemma(score) {
        const body = document.getElementById('minigame-body');
        body.innerHTML = `
            <div style="text-align:center; padding:25px;">
                <h3 style="color:var(--color-gold); font-family:var(--font-heading); font-size:1.6rem; margin-bottom:12px;">
                    SIMULASI KEPUTUSAN TAMAT
                </h3>
                <p style="font-size:1rem; color:#E2E8F0; line-height:1.6; margin-bottom:20px;">
                    Skor Keputusan Berintegriti: <strong>${score} / 2</strong><br>
                    Pembelajaran Sejarah: Kestabilan sesebuah tamadun tidak hanya bergantung kepada kekuatan ketenteraan, tetapi keadilan pengagihan ekonomi dan integriti tadbir urus.
                </p>
                <button class="btn-primary" id="btn-finish-mg4">Teruskan Pengembaraan (+30 XP) →</button>
            </div>
        `;
        document.getElementById('btn-finish-mg4').onclick = () => {
            this.addXP(30, "Misi Keputusan Wazir Selesai! (+30 XP)");
            this.completedEntities.add(this.currentActiveEntity.id);
            this.closeModal();
        };
    }

    // --- MINI-GAME 5: PENYELAMATAN MANUSKRIP (BAB 5) ---
    setupRescueManuscriptsMiniGame(entity, container) {
        const manuscripts = [
            { id: 1, title: "Kitab Al-Jabr", author: "Al-Khwarizmi", code: "MATEMATIK", rescued: false },
            { id: 2, title: "Kitab Al-Hawi", author: "Abu Bakar Al-Razi", code: "PERUBATAN", rescued: false },
            { id: 3, title: "Zij As-Sabi' (Falak)", author: "Al-Battani", code: "ASTRONOMI", rescued: false },
            { id: 4, title: "Kitab Al-Hayawan", author: "Al-Jahiz", code: "ZOOLOGI", rescued: false }
        ];

        let rescuedCount = 0;

        container.innerHTML = `
            <p class="mg-intro-sub">
                <strong>Fasa 1:</strong> Tentera Mongol mula memusnahkan khazanah Bayt al-Hikmah! Klik pada setiap manuskrip agung di bawah untuk menyelamatkannya ke dalam Peti Amanah sebelum dihanyutkan ke Sungai Dajlah:
            </p>
            <div class="mg-rescue-container">
                <div class="mg-manuscript-grid" id="mg5-grid"></div>
            </div>

            <!-- Fasa 2: Refleksi KBAT -->
            <div class="mg-reflection-box hidden" id="mg5-reflection">
                <div class="mg-reflection-title">Fasa 2: Refleksi & Iktibar Tamadun (KBAT)</div>
                <p style="font-size:0.9rem; color:#E2E8F0; margin-bottom:12px;">
                    Apakah formula terpenting yang dipelajari daripada tragedi kejatuhan Baghdad untuk membina kemajuan ummah hari ini?
                </p>
                <div class="options-grid" id="mg5-reflection-options">
                    <button class="option-btn" data-correct="true">
                        <span class="opt-label">A.</span> Menggabungkan penghayatan akhlak, perpaduan ummah, serta kecemerlangan sains dan pertahanan.
                    </button>
                    <button class="option-btn" data-correct="false">
                        <span class="opt-label">B.</span> Berputus asa dan tidak perlu membina perpustakaan sains lagi.
                    </button>
                    <button class="option-btn" data-correct="false">
                        <span class="opt-label">C.</span> Menumpukan hanya kepada kekayaan harta peribadi tanpa peduli masyarakat.
                    </button>
                </div>
            </div>

            <div id="mg5-feedback" class="feedback-card hidden" style="margin-top:15px;"></div>
        `;

        const renderManuscripts = () => {
            const grid = document.getElementById('mg5-grid');
            grid.innerHTML = '';
            manuscripts.forEach(m => {
                const card = document.createElement('div');
                card.className = `mg-manuscript-card ${m.rescued ? 'rescued' : ''}`;
                card.innerHTML = `
                    <div class="mg-book-icon" style="font-size:0.75rem; font-weight:800; letter-spacing:1px; color:var(--color-gold);">${m.code}</div>
                    <div class="mg-book-title">${m.title}</div>
                    <div class="mg-book-author">${m.author}</div>
                    <div style="font-size:0.75rem; color:${m.rescued ? '#4ECCA3' : 'var(--color-gold)'}; margin-top:4px;">
                        ${m.rescued ? '✓ Terselamat' : 'Klik Selamatkan'}
                    </div>
                `;
                card.onclick = () => {
                    if (m.rescued) return;
                    m.rescued = true;
                    rescuedCount++;
                    renderManuscripts();

                    if (rescuedCount === 4) {
                        this.showToast("Semua khazanah manuskrip berjaya diselamatkan! Beralih ke Refleksi KBAT...");
                        document.getElementById('mg5-reflection').classList.remove('hidden');
                        document.getElementById('mg5-reflection').scrollIntoView({ behavior: 'smooth' });
                    }
                };
                grid.appendChild(card);
            });
        };

        renderManuscripts();

        // Refleksi KBAT Options
        container.querySelectorAll('#mg5-reflection-options .option-btn').forEach(btn => {
            btn.onclick = () => {
                const isCorrect = btn.dataset.correct === 'true';
                const fb = document.getElementById('mg5-feedback');
                fb.classList.remove('hidden');

                if (isCorrect) {
                    btn.classList.add('correct');
                    fb.innerHTML = `
                        <h4 style="color:#4ECCA3;">✦ IKTIBAR TERTINGGI DICAPAI! (+30 XP)</h4>
                        <p style="color:#FFF;">Tepat sekali! Khazanah sains Abbasiyah yang terselamat ini kelak mencetuskan fajar baharu keilmuan dunia. Perpaduan dan ilmu adalah benteng sebenar kelangsungan sesebuah negara.</p>
                    `;
                    this.addXP(30, "Misi Akhir Selesai! (+30 XP)");
                    this.completedEntities.add(entity.id);
                    setTimeout(() => this.closeModal(), 2800);
                } else {
                    btn.classList.add('wrong');
                    fb.innerHTML = `
                        <h4 style="color:#FF6B6B;">Refleksi Kurang Tepat</h4>
                        <p>Iktibar utama kejatuhan empayar adalah peringatan agar kita sentiasa mengukuhkan perpaduan dan menguasai ilmu bermanfaat.</p>
                    `;
                }
            };
        });
    }

    // ==========================================
    // 6. PENYELESAIAN & MODAL MANAGEMENT
    // ==========================================
    completeInteraction(entity, xpAward) {
        if (xpAward > 0) this.addXP(xpAward, `Misi Selesai (+${xpAward} XP)`);
        if (entity) this.completedEntities.add(entity.id);
        this.updateQuestTracker();
        this.closeModal();
    }

    closeModal() {
        this.stopAudio();
        if(this.typewriterInterval) clearInterval(this.typewriterInterval);
        try { window.speechSynthesis.cancel(); } catch(e){}
        
        const modal = document.getElementById('dialogue-modal');
        const miniGameModal = document.getElementById('minigame-modal');
        const funFactModal = document.getElementById('fun-fact-modal');
        
        if(modal) modal.classList.add('hidden');
        if(miniGameModal) miniGameModal.classList.add('hidden');
        if(funFactModal) funFactModal.classList.add('hidden');
        
        this.isModalOpen = false;

        const currentEnt = this.currentActiveEntity;
        if (currentEnt && currentEnt.gameType && this.completedEntities.has(currentEnt.id) && !currentEnt._chestGiven) {
            currentEnt._chestGiven = true;
            setTimeout(() => {
                this.triggerTreasureChest(`Khazanah ${currentEnt.name}`, 5, 25, this.getChapterStars(this.currentChapter));
            }, 350);
        }

        if (document.activeElement && document.activeElement !== document.body) { 
            document.activeElement.blur(); 
        }
        window.focus();
        
        this.keys.left = false;
        this.keys.right = false;
        this.updateQuestTracker();
    }

    // ==========================================
    // 7. XP & API PERSISTENCE
    // ==========================================
    addXP(points, msg) {
        this.xp += points; this.updateHUD(); this.showToast(msg);
        fetch('api/progress.php?action=save_score', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ module_id: this.currentChapter, score: 100, xp: points })
        }).catch(() => {});
    }

    updateHUD() { 
        let xpVal = document.getElementById('hud-xp-val');
        if(xpVal) xpVal.innerText = this.xp; 
    }
    
    updateLivesHUD() {
        const container = document.getElementById('hud-lives'); 
        if(!container) return;
        container.innerHTML = '';

        if (this.isStudyMode) {
            container.innerHTML = '<span class="life-mode-text" title="Mod Santai: Tiada Penalti">MOD SANTAI</span>';
            return;
        }

        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            span.className = i < this.lives ? 'life-pip active' : 'life-pip spent';
            span.title = `Peluang ${i + 1}`;
            container.appendChild(span);
        }
    }
    
    showToast(message) {
        if (!message) return;
        const now = Date.now();
        // Debounce: Elak mesej sama dipanggil berulang kali dalam 3.5 saat
        if (this._lastToastMsg === message && (now - (this._lastToastTime || 0) < 3500)) {
            return;
        }
        this._lastToastMsg = message;
        this._lastToastTime = now;

        const container = document.getElementById('toast-container');
        if(!container) return;

        // Hadkan bilangan toast aktif kepada maks 2 supaya skrin kemas & tidak melimpah
        while (container.children.length >= 2) {
            container.removeChild(container.firstChild);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        container.appendChild(toast);
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 3500);
    }

    gameLoop() {
        try {
            this.update(); this.render();
        } catch (error) {
            console.error("Ralat Gelung Permainan:", error);
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Mula Permainan
document.addEventListener('DOMContentLoaded', () => new SirahAdventureEngine('gameCanvas'));