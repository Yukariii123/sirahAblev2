// Assets/js/peta.js — Logik Peta Geografi Sebenar (Leaflet) & Mod Penceritaan Sinematik

document.addEventListener('DOMContentLoaded', () => {
    initLeafletRealMap();
    initStorytellingHUD();
    initStyleSwitcher();
    initCategoryFilters();
});

// ==========================================================================
// 1. DATA PENCERITAAN KISAH SINEMATIK (9 BABAK SEJARAH AGUNG)
// ==========================================================================

const STORY_CHAPTERS = [
    {
        stage: 1,
        year: "750 M (132 H)",
        title: "Revolusi Sungai Zab & Kejatuhan Umayyah",
        arabic: "مَعْرَكَةُ الزَّاب الأَعْلَى",
        lat: 35.9897,
        lng: 43.4358,
        zoom: 8,
        narrative: "Di tebing Sungai Zab (utara Iraq kini), tentera revolusi Abbasiyah yang diketuai Abdullah bin Ali menewaskan tentera khalifah terakhir Umayyah, Marwan II. Kemenangan bersejarah ini menamatkan era 90 tahun Bani Umayyah dan memulakan fasa 500 tahun Khilafah Abbasiyah.",
        voiceText: "Babak pertama. Di tebing Sungai Zab pada tahun 750 Masihi, tentera revolusi Abbasiyah menewaskan khalifah terakhir Umayyah, Marwan II. Kemenangan bersejarah ini menamatkan era Bani Umayyah dan membuka lembaran lima kurun Khilafah Abbasiyah yang mentadbir dunia Islam.",
        figures: "Abdullah bin Ali, Marwan II (Khalifah Terakhir Umayyah)",
        category: "battle"
    },
    {
        stage: 2,
        year: "750 M (132 H)",
        title: "Pengisytiharan Khalifah Pertama di Kufah",
        arabic: "بَيْعَةُ أَبِي العَبَّاس فِي الكُوفَة",
        lat: 32.0300,
        lng: 44.4000,
        zoom: 9,
        narrative: "Abu al-Abbas al-Saffah dibai'ah secara rasmi di Masjid Agung Kufah sebagai Khalifah Abbasiyah pertama. Beliau menjadikan Kufah dan Al-Anbar sebagai pusat pentadbiran sementara bagi memulihkan kestabilan wilayah sebelum sebuah ibu kota abadi diasaskan.",
        voiceText: "Babak kedua. Abu al-Abbas al-Saffah dibai'ah di Masjid Agung Kufah sebagai Khalifah Abbasiyah pertama. Baginda memperkukuh kesetiaan wilayah dan memulihkan kestabilan ekonomi sebelum perancangan ibu kota abadi dimulakan.",
        figures: "Abu al-Abbas al-Saffah, Abu Muslim al-Khurasani",
        category: "capital"
    },
    {
        stage: 3,
        year: "751 M (133 H)",
        title: "Pertempuran Talas & Rahsia Kertas Dunia",
        arabic: "مَعْرَكَةُ طَلَاس — نَقْلُ صِنَاعَةِ الوَرَق",
        lat: 42.5228,
        lng: 72.2428,
        zoom: 7,
        narrative: "Di sempadan Asia Tengah (Kazakhstan/Kyrgyzstan), tentera Islam menewaskan ekspedisi Dinasti Tang Cina. Kemenangan ini membawa kepada pembebasan rahsia pembuatan kertas. Kilang kertas pertama dibina di Samarkand dan Baghdad, mencetuskan revolusi ilmu penulisan buku sedunia!",
        voiceText: "Babak ketiga. Di lembah Sungai Talas pada tahun 751 Masihi, tentera Islam menewaskan tentera Dinasti Tang Cina. Kemenangan ini membawa rahsia pembuatan kertas dari China ke Samarkand dan Baghdad, mencetuskan revolusi penerbitan buku terhebat dalam sejarah tamadun manusia.",
        figures: "Ziyad bin Salih, Jeneral Gao Xianzhi (Dinasti Tang)",
        category: "battle"
    },
    {
        stage: 4,
        year: "762 M (145 H)",
        title: "Pembinaan Kota Bulat Baghdad (Madinat al-Salam)",
        arabic: "تَأْسِيسُ مَدِينَةِ السَّلَام — بَغْدَاد",
        lat: 33.3152,
        lng: 44.3661,
        zoom: 11,
        narrative: "Khalifah Abu Ja'far al-Mansur memilih lokasi strategik di tebing Sungai Tigris untuk membina 'Madinat al-Salam'. Dengan rekaan kota bulat sempurna berdiameter 2 kilometer, 4 pintu gerbang berkubu kukuh, dan 100,000 arkitek serta pekerja, Baghdad bangkit sebagai ibu kota tercantik di dunia.",
        voiceText: "Babak keempat. Pada tahun 762 Masihi, Khalifah Abu Ja'far al-Mansur mengasaskan pembinaan kota bulat Baghdad atau Madinat al-Salam di tebing Sungai Tigris. Kota berkubu kukuh dengan empat pintu gerbang ini berkembang pesat menjadi pusat ekonomi, perdagangan, dan keilmuan antarabangsa.",
        figures: "Khalifah Abu Ja'far al-Mansur, Jurutera Nawbakht & Masha'allah",
        category: "capital"
    },
    {
        stage: 5,
        year: "786 - 809 M",
        title: "Kafilah Haji & Laluan Darb Zubaydah",
        arabic: "دَرْبُ زُبَيْدَة — مِنْ الكُوفَة إِلَى مَكَّة",
        lat: 21.4225,
        lng: 39.8262,
        zoom: 7,
        narrative: "Permaisuri Zubaydah (isteri Khalifah Harun al-Rasyid) membiayai projek kejuruteraan mega sepanjang 1,400 kilometer merentasi padang pasir dari Kufah ke Makkah dan Madinah. Beliau membina telaga air, kolam empangan (Ayn Zubaydah), dan stesen rehat bagi melindungi keselamatan jemaah haji.",
        voiceText: "Babak kelima. Laluan Darb Zubaydah. Menyedari kesukaran para jemaah haji, Permaisuri Zubaydah membiayai projek mega membina saluran air, empangan, dan telaga sepanjang laluan seribu empat ratus kilometer dari Kufah ke tanah suci Makkah dan Madinah.",
        figures: "Permaisuri Zubaydah binti Ja'far",
        category: "trade"
    },
    {
        stage: 6,
        year: "813 - 833 M",
        title: "Zaman Keemasan Sains & Baitul Hikmah",
        arabic: "عَصْرُ بَيْتِ الحِكْمَة وَالنَّهْضَةِ العِلْمِيَّة",
        lat: 33.3152,
        lng: 44.3661,
        zoom: 10,
        narrative: "Di bawah pimpinan Khalifah Harun al-Rasyid dan Al-Ma'mun, Baitul Hikmah menjadi pusat penyelidikan ilmuwan dunia. Al-Khwarizmi mencipta disiplin Algebra dan sistem nombor sifar (0). Karya perubatan, astronomi, dan falsafah Yunani, Parsi, dan India diterjemahkan secara besar-besaran.",
        voiceText: "Babak keenam. Zaman Keemasan Baitul Hikmah. Di kota Baghdad, institusi Baitul Hikmah melahirkan tokoh ilmuwan agung seperti Al-Khwarizmi, pelopor algebra dan algoritma. Ribuan kitab sains, astronomi, dan perubatan diterjemahkan ke dalam bahasa Arab dan dibayar dengan timbangan emas murni.",
        figures: "Khalifah Harun al-Rasyid, Al-Ma'mun, Al-Khwarizmi, Hunayn bin Ishaq",
        category: "knowledge"
    },
    {
        stage: 7,
        year: "Abad ke-8 & ke-9 M",
        title: "Pelabuhan Basrah & Pelayaran Lautan Sutera",
        arabic: "مِينَاءُ البَصْرَة وَالتِّجَارَةُ البَحْرِيَّة",
        lat: 30.5081,
        lng: 47.7835,
        zoom: 8,
        narrative: "Basrah menjadi pelabuhan maritim terbesar dunia Islam. Kapal-kapal dagang belayar merentasi Teluk Parsi ke India, Kepulauan Melayu, dan Pelabuhan Guangzhou di China. Selain rempah-ratus dan sutera, para pedagang Islam menyebarkan akhlak mulia dan dakwah Islam ke Nusantara.",
        voiceText: "Babak ketujuh. Pelabuhan Basrah. Dari muara Shatt al-Arab di Basrah, armada kapal dagang Islam belayar merentas Lautan Hindi menuju ke Kepulauan Melayu dan China, membawa muatan sutera dan rempah-ratus serta menyebarkan keindahan Islam ke rantau Nusantara.",
        figures: "Nakhoda Sulaiman, Ibnu al-Haitham (Bapa Optik)",
        category: "trade"
    },
    {
        stage: 8,
        year: "836 - 838 M",
        title: "Kota Samarra & Penaklukan Amorium",
        arabic: "سَامَرَّاء وَفَتْحُ عَمُّورِيَّة",
        lat: 34.1983,
        lng: 43.8742,
        zoom: 9,
        narrative: "Khalifah Al-Mu'tasim membina ibu kota tentera Samarra bersama mercu tanda Menara Lingkar Malwiyyah berketinggian 52 meter. Pada 838 M, baginda memimpin 80,000 tentera menawan kota kubu Byzantine, Amorium, demi menyahut seruan seorang wanita yang dizalimi: 'Wa Mu'tasimah!'.",
        voiceText: "Babak kelapan. Kota Samarra dan Penaklukan Amorium. Khalifah Al-Mu'tasim membina ibu kota megah Samarra dengan Menara Lingkar Malwiyyah. Apabila mendengar jeritan wanita yang dizalimi di Anatolia, baginda memimpin lapan puluh ribu tentera menawan kubu Amorium demi maruah umat Islam.",
        figures: "Khalifah Al-Mu'tasim, Penyair Abu Tammam",
        category: "capital"
    },
    {
        stage: 9,
        year: "1258 M (656 H)",
        title: "Pencerobohan Tentera Mongol & Kejatuhan Baghdad",
        arabic: "سُقُوطُ بَغْدَاد عَلَى يَدِ هُولَاكُو خَان",
        lat: 33.3152,
        lng: 44.3661,
        zoom: 9,
        narrative: "Tentera Mongol pimpinan Hulagu Khan mengepung dan meranapkan Baghdad. Kitab khazanah ilmu Baitul Hikmah dicampak ke Sungai Tigris sehingga airnya kehitaman dakwat. Walaupun Baghdad jatuh, warisan keilmuan tamadun Islam telah tersebar ke Mesir, Andalus, dan seluruh dunia moden.",
        voiceText: "Babak kesembilan. Tragedi 1258 Masihi. Tentera Mongol pimpinan Hulagu Khan mengepung dan meranapkan kota Baghdad. Khazanah manuskrip Baitul Hikmah dicampak ke Sungai Tigris. Namun, cahaya ilmu yang telah disemai Abbasiyah tidak pernah padam dan kekal menyinari dunia moden hingga ke hari ini.",
        figures: "Al-Musta'sim Billah (Khalifah Terakhir), Hulagu Khan",
        category: "battle"
    }
];

// ==========================================================================
// 2. DATA LOKASI GEO-SPATIAL PENUH (GPS LAT / LNG ASLI)
// ==========================================================================

const ALL_MAP_LOCATIONS = [
    {
        id: "baghdad",
        name: "Baghdad (Madinat al-Salam)",
        arabic: "بَغْدَاد — مَدِينَةُ السَّلَام",
        lat: 33.3152,
        lng: 44.3661,
        category: "capital",
        categoryLabel: "Ibu Kota & Sains",
        era: "762 M (145 H)",
        badgeClass: "badge-capital",
        desc: "Pusat pentadbiran agung Khilafah Abbasiyah yang dibina di tebing Sungai Tigris. Menempatkan Baitul Hikmah, perpustakaan, balai cerap bintang, dan istana Bab al-Dhabab.",
        figures: "Khalifah Al-Mansur, Harun al-Rasyid, Al-Khwarizmi",
        quiz: {
            q: "Siapakah Khalifah Abbasiyah yang mengasaskan Kota Bulat Baghdad pada tahun 762 M?",
            options: ["Khalifah Abu Ja'far al-Mansur", "Khalifah Harun al-Rasyid", "Khalifah Al-Ma'mun", "Al-Mu'tasim"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "samarra",
        name: "Samarra (Surra Man Ra'a)",
        arabic: "سَامَرَّاء — سُرَّ مَنْ رَأَى",
        lat: 34.1983,
        lng: 43.8742,
        category: "capital",
        categoryLabel: "Ibu Kota Tentera",
        era: "836 M (221 H)",
        badgeClass: "badge-capital",
        desc: "Ibu kota kedua Abbasiyah di utara Baghdad. Terkenal dengan Masjid Agung Samarra dan Menara Lingkar Malwiyyah berketinggian 52 meter yang dibina oleh Khalifah Al-Mu'tasim.",
        figures: "Khalifah Al-Mu'tasim, Al-Mutawakkil",
        quiz: {
            q: "Apakah menara lingkaran unik yang dibina di Masjid Agung Samarra?",
            options: ["Menara Malwiyyah", "Menara Qutub", "Menara Pisa", "Menara Galata"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "kufah",
        name: "Kufah (Pusat Awal)",
        arabic: "الكُوفَة",
        lat: 32.0300,
        lng: 44.4000,
        category: "capital",
        categoryLabel: "Ibu Kota Awal",
        era: "750 M (132 H)",
        badgeClass: "badge-capital",
        desc: "Pusat pemerintahan awal Abbasiyah di bawah Khalifah Abu al-Abbas al-Saffah sebelum pembinaan Baghdad. Pusat pengajian nahu dan bahasa Arab.",
        figures: "Abu al-Abbas al-Saffah, Imam Abu Hanifah",
        quiz: {
            q: "Kufah menjadi ibu kota awal kerajaan Abbasiyah di bawah pentadbiran khalifah:",
            options: ["Abu al-Abbas al-Saffah", "Marwan II", "Al-Hadi", "Al-Amin"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "basrah",
        name: "Basrah (Pelabuhan Maritim)",
        arabic: "البَصْرَة",
        lat: 30.5081,
        lng: 47.7835,
        category: "trade",
        categoryLabel: "Pelabuhan & Sains",
        era: "Pusat Perdagangan Utama",
        badgeClass: "badge-trade",
        desc: "Pelabuhan maritim utama di muara Shatt al-Arab. Pintu masuk perdagangan rempah dan sutera dari India dan China, serta tempat kelahiran bapa optik moden Ibnu al-Haitham.",
        figures: "Ibnu al-Haitham, Al-Jahiz, Sibawayh",
        quiz: {
            q: "Ilmuwan Islam yang mempelopori sains optik dan kamera obscura dari Basrah ialah:",
            options: ["Ibnu al-Haitham", "Al-Farabi", "Ibnu Sina", "Al-Biruni"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "damascus",
        name: "Dimasyq (Damsyik)",
        arabic: "دِمَشْق الشَّام",
        lat: 33.5138,
        lng: 36.2765,
        category: "capital",
        categoryLabel: "Pusat Wilayah Syam",
        era: "Pusat Kebudayaan Syam",
        badgeClass: "badge-capital",
        desc: "Kota bersejarah bumi Syam yang menghubungkan laluan kafilah Mediterranean. Masyhur dengan Masjid Agung Umawi dan industri besi waja pedang Damascus.",
        figures: "Para Ulama & Pentadbir Wilayah Syam",
        quiz: {
            q: "Sebelum Baghdad, kota manakah yang menjadi ibu kota Khilafah Bani Umayyah?",
            options: ["Damsyik (Dimasyq)", "Basrah", "Madinah", "Kaherah"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "alquds",
        name: "Al-Quds (Baitulmaqdis, Palestin)",
        arabic: "القُدْس الشَّرِيف — فِلَسْطِين",
        lat: 31.7683,
        lng: 35.2137,
        category: "knowledge",
        categoryLabel: "Kota Suci & Wilayah Palestin",
        era: "Bumi Palestin Yang Diberkati",
        badgeClass: "badge-knowledge",
        desc: "Kota suci ketiga umat Islam di bumi Palestin yang menempatkan Masjidil Aqsa dan Kubah As-Sakhrah. Di bawah Khilafah Abbasiyah, wilayah ini ditadbir di bawah Wilayah Jund Filastin (جند فلسطين) dan dimuliakan sebagai pusat tamadun para anbiya'. Khalifah Al-Mansur dan Al-Ma'mun membiayai projek pemuliharaan besar-besaran di kompleks Masjidil Aqsa.",
        figures: "Para Imam, Ahli Hadis, Syuhada' & Penduduk Palestin",
        quiz: {
            q: "Masjid suci ketiga umat Islam yang terletak di bumi Palestin (Baitulmaqdis) ialah:",
            options: ["Masjidil Aqsa", "Masjidil Haram", "Masjid Nabawi", "Masjid Quba"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "gaza",
        name: "Ghazzah (Gaza, Palestin)",
        arabic: "غَزَّة هَاشِم — فِلَسْطِين",
        lat: 31.5017,
        lng: 34.4668,
        category: "knowledge",
        categoryLabel: "Kota Kelahiran Imam Syafi'i",
        era: "Pusat Keilmuan & Perdagangan",
        badgeClass: "badge-knowledge",
        desc: "Kota pelabuhan bersejarah di bumi Palestin yang menghubungkan laluan kafilah perdagangan antara Syam, Hijaz dan Mesir. Kota barakah ini merupakan tempat kelahiran Imam Muhammad bin Idris Asy-Syafi'i (pengasas Mazhab Syafi'i) pada tahun 150 Hijrah (767 Masihi) semasa pemerintahan Khalifah Al-Mansur.",
        figures: "Imam Asy-Syafi'i (Lahir di Gaza 150 H), Hashim bin Abd Manaf",
        quiz: {
            q: "Imam mazhab fiqh agung yang dilahirkan di kota Ghazzah (Gaza, Palestin) pada tahun 150 H ialah:",
            options: ["Imam Asy-Syafi'i", "Imam Malik", "Imam Ahmad", "Imam Abu Hanifah"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "jund_filastin",
        name: "Bumi Palestin (Jund Filastin)",
        arabic: "أَرْضُ فِلَسْطِين — جُنْد فِلَسْطِين",
        lat: 32.0000,
        lng: 34.9500,
        category: "capital",
        categoryLabel: "Daulah & Wilayah Islam",
        era: "Wilayah Pentadbiran Abbasiyah (750 - 1258 M)",
        badgeClass: "badge-capital",
        desc: "Bumi Palestin (dikenali secara rasmi dalam struktur wilayah daulah Abbasiyah sebagai Jund Filastin) meliputi Baitulmaqdis, Ramla, Gaza, Yafa, dan Akka. Wilayah ini sentiasa dipertahankan oleh umat Islam sebagai tanah wakaf suci dan kiblat pertama umat Islam.",
        figures: "Ulama Fiqh Palestin, Para Sahabat & Mujahidin",
        quiz: {
            q: "Apakah nama wilayah rasmi Palestin dalam sistem pentadbiran daulah Islam zaman Abbasiyah?",
            options: ["Jund Filastin (جند فلسطين)", "Provinsi Rom", "Jund Qinnasrin", "Wilayah Fars"],
            correct: 0,
            xp: 20
        }
    },
    {
        id: "medina",
        name: "Madinah Al-Munawwarah",
        arabic: "المَدِينَةُ المُنَوَّرَة",
        lat: 24.5247,
        lng: 39.5692,
        category: "knowledge",
        categoryLabel: "Pusat Hadis & Sunnah",
        era: "Kota Nabawi",
        badgeClass: "badge-knowledge",
        desc: "Kota Rasulullah SAW dan pusat tertinggi disiplin hadis dan fiqah. Tempat Imam Malik bin Anas mengajar kitab agung Al-Muwatta' di Masjid Nabawi.",
        figures: "Imam Malik bin Anas (Pengasas Mazhab Maliki)",
        quiz: {
            q: "Kitab hadis dan fikah agung manakah yang dikarang oleh Imam Malik di Madinah?",
            options: ["Al-Muwatta'", "Sahih Al-Bukhari", "Al-Majmu'", "Riyadus Shalihin"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "mecca",
        name: "Makkah Al-Mukarramah",
        arabic: "مَكَّةُ المُكَرَّمَة",
        lat: 21.4225,
        lng: 39.8262,
        category: "knowledge",
        categoryLabel: "Paksi Kiblat Umat",
        era: "Pusat Haji Sedunia",
        badgeClass: "badge-knowledge",
        desc: "Kiblat umat Islam. Permaisuri Zubaydah membina saluran terusan air Ayn Zubaydah dan laluan telaga Darb Zubaydah dari Kufah ke Makkah.",
        figures: "Permaisuri Zubaydah binti Ja'far",
        quiz: {
            q: "Projek mega kebajikan air yang dibina oleh isteri Khalifah Harun al-Rasyid di Makkah dikenali sebagai:",
            options: ["Terusan Ayn Zubaydah", "Empangan Ma'rib", "Sungai Nil", "Telaga Zamzam"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "cairo",
        name: "Al-Fustat / Kaherah (Mesir)",
        arabic: "الفُسْطَاط — مِصْر",
        lat: 30.0444,
        lng: 31.2357,
        category: "trade",
        categoryLabel: "Pusat Wilayah Barat",
        era: "Lembah Sungai Nil",
        badgeClass: "badge-trade",
        desc: "Pusat gabenor Abbasiyah bagi wilayah Mesir dan Afrika Utara. Di kota inilah Imam As-Syafi'i mengajar dan menyusun Qaul Jadid mazhab Syafi'i.",
        figures: "Imam As-Syafi'i, Gabenor Mesir",
        quiz: {
            q: "Imam mazhab fiqah tersohor yang menetap dan wafat di Mesir ialah:",
            options: ["Imam As-Syafi'i", "Imam Abu Hanifah", "Imam Malik", "Imam Ahmad"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "nishapur",
        name: "Nishapur (Khurasan)",
        arabic: "نَيْسَابُور",
        lat: 36.2133,
        lng: 58.7958,
        category: "knowledge",
        categoryLabel: "Pusat Sains Timur",
        era: "Hab Ilmu Timur",
        badgeClass: "badge-knowledge",
        desc: "Kota metropolitan ilmu di Khurasan. Melahirkan ulama hadis agung Imam Muslim (pengarang Sahih Muslim) dan saintis astronomi Omar Khayyam.",
        figures: "Imam Muslim, Omar Khayyam",
        quiz: {
            q: "Pengarang kitab 'Sahih Muslim' dilahirkan di kota keilmuan Khurasan, iaitu:",
            options: ["Nishapur", "Basrah", "Dimasyq", "Kufah"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "bukhara",
        name: "Bukhara & Samarkand",
        arabic: "بُخَارَى وَسَمَرْقَنْد",
        lat: 39.7681,
        lng: 64.4556,
        category: "trade",
        categoryLabel: "Laluan Sutera Emas",
        era: "Pintu Masuk Asia Tengah",
        badgeClass: "badge-trade",
        desc: "Mutiara Laluan Sutera Emas di Asia Tengah. Tanah kelahiran Amirul Mukminin dalam hadis, Imam Al-Bukhari, serta Bapa Perubatan Moden, Ibnu Sina.",
        figures: "Imam Al-Bukhari, Ibnu Sina (Avicenna), Al-Biruni",
        quiz: {
            q: "Bapa Perubatan Moden yang mengarang 'Al-Qanun fi al-Tibb' dilahirkan di wilayah Bukhara. Beliau ialah:",
            options: ["Ibnu Sina (Avicenna)", "Al-Razi", "Al-Kindi", "Al-Khwarizmi"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "talas",
        name: "Pertempuran Talas (751 M)",
        arabic: "مَعْرَكَةُ طَلَاس",
        lat: 42.5228,
        lng: 72.2428,
        category: "battle",
        categoryLabel: "Sains & Ketenteraan",
        era: "751 M (133 H)",
        badgeClass: "badge-battle",
        desc: "Pertembungan di sempadan Asia Tengah yang membawa kepada pembebasan teknologi pembuatan kertas dari China ke Samarkand dan Baghdad.",
        figures: "Ziyad bin Salih, Dinasti Tang",
        quiz: {
            q: "Apakah teknologi yang diperoleh umat Islam daripada Pertempuran Talas?",
            options: ["Teknologi pembuatan kertas", "Teknologi kompas", "Teknologi serbuk letupan", "Teknologi kaca"],
            correct: 0,
            xp: 15
        }
    },
    {
        id: "amorium",
        name: "Penaklukan Amorium (838 M)",
        arabic: "فَتْحُ عَمُّورِيَّة",
        lat: 39.0203,
        lng: 31.2942,
        category: "battle",
        categoryLabel: "Ekspedisi Ketenteraan",
        era: "838 M (223 H)",
        badgeClass: "badge-battle",
        desc: "Ekspedisi ketenteraan 80,000 perajurit Abbasiyah pimpinan Khalifah Al-Mu'tasim mempertahankan maruah wanita Muslimah: 'Wa Mu'tasimah!'.",
        figures: "Khalifah Al-Mu'tasim, Abu Tammam",
        quiz: {
            q: "Seruan wanita manakah yang mencetuskan ekspedisi Khalifah Al-Mu'tasim ke Amorium?",
            options: ["Wa Mu'tasimah!", "Hayya alal Jihad!", "Allahu Akbar!", "Baitul Hikmah!"],
            correct: 0,
            xp: 15
        }
    }
];

// ==========================================================================
// 3. INISIALISASI PETA LEAFLET GEOGRAFI SEBENAR
// ==========================================================================

let mapInstance = null;
let currentTileLayer = null;
let markerLayerGroup = null;
let routeLayerGroup = null;
let currentStoryIndex = 0;
let activeAudio = null;
let autoPlayStoryInterval = null;

// Tile Layer URLs (100% Bebas Watermark & Resolusi Tinggi)
const MAP_TILES = {
    satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri &copy; Earthstar Geographics'
    },
    topo: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri World Topographic'
    },
    natgeo: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; National Geographic Society, Esri'
    },
    osm: {
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenStreetMap contributors'
    }
};

function initLeafletRealMap() {
    // Pusat peta: Timur Tengah (Baghdad: ~33.3° N, 44.3° E)
    mapInstance = L.map('real-map', {
        center: [33.3152, 44.3661],
        zoom: 6,
        minZoom: 3,
        maxZoom: 17,
        zoomControl: false
    });

    // Letak zoom control di bahagian kanan atas
    L.control.zoom({ position: 'topright' }).addTo(mapInstance);

    // Default Tile: Atlas Purba (NatGeo World Map)
    currentTileLayer = L.tileLayer(MAP_TILES.natgeo.url, {
        attribution: MAP_TILES.natgeo.attribution,
        maxZoom: 18
    }).addTo(mapInstance);

    markerLayerGroup = L.layerGroup().addTo(mapInstance);
    routeLayerGroup = L.layerGroup().addTo(mapInstance);

    // Lukis Laluan Sejarah Bercahaya (Polylines)
    drawHistoricalRoutes();

    // Lukis Sempadan & Lencana Kedaulatan Bumi Palestin (Jund Filastin)
    drawPalestineTerritoryOverlay();

    // Render Pin Semua Kota Sebenar
    renderMapMarkers(ALL_MAP_LOCATIONS);

    // Mula dengan Babak 1 Pengembaraan
    loadStoryChapter(0, true);
}

// Lapisan Khas: Sempadan & Lencana Kedaulatan Bumi Palestin (Jund Filastin)
function drawPalestineTerritoryOverlay() {
    // Koordinat Sempadan Sebenar Sejarah Bumi Palestin
    const palestineBorderCoords = [
        [31.28, 34.22], // Rafah
        [31.35, 34.30], // Khan Yunis
        [31.50, 34.46], // Ghazzah (Gaza)
        [31.67, 34.56], // Asqalan (Ashkelon)
        [31.80, 34.65], // Isdud (Ashdod)
        [32.05, 34.78], // Yafa (Jaffa)
        [32.28, 34.86], // Arsuf
        [32.50, 34.90], // Qaysariyyah (Caesarea)
        [32.82, 34.98], // Haifa
        [32.93, 35.08], // Akka (Acre)
        [33.09, 35.10], // Ras al-Naqoura
        [33.25, 35.57], // Metula
        [33.15, 35.65], // Golan
        [32.78, 35.60], // Tasik Tabariyyah (Sea of Galilee)
        [32.50, 35.55], // Baysan
        [32.10, 35.53], // Lembah Jordan
        [31.87, 35.50], // Ariha (Jericho)
        [31.75, 35.50], // Laut Mati Utara
        [31.20, 35.35], // Laut Mati Selatan
        [30.60, 35.25], // Wadi Araba
        [29.55, 34.95], // Umm al-Rashrash (Teluk Aqaba)
        [30.00, 34.80], // Sempadan Sinai Selatan
        [30.60, 34.55], // Sempadan Sinai Tengah
        [31.00, 34.35], // Sempadan Sinai Utara
        [31.28, 34.22]  // Rafah
    ];

    // Poligon Kedaulatan Hijau Zamrud Palestin
    const palestinePolygon = L.polygon(palestineBorderCoords, {
        color: '#10b981',
        weight: 2.2,
        fillColor: '#059669',
        fillOpacity: 0.28,
        dashArray: '5, 5',
        className: 'palestine-territory-polygon'
    }).addTo(mapInstance);

    palestinePolygon.on('click', () => {
        const palLoc = ALL_MAP_LOCATIONS.find(l => l.id === 'jund_filastin');
        if (palLoc) openLocationInspector(palLoc);
    });

    palestinePolygon.bindTooltip("🇵🇸 Kedaulatan Bumi Palestin (Jund Filastin)", { permanent: false });

    // Label Rasmi Kartografi Palestin (Menutup kedudukan teks lama & menggantikan dengan PALESTINE)
    const palestineLabelHtml = `
        <div class="palestine-tile-cover-label" id="palestine-territory-badge" title="Bumi Palestin (Jund Filastin)">
            <span class="ptc-ar">فِلَسْطِين</span>
            <span class="ptc-en">PALESTINE</span>
        </div>
    `;

    const palestineLabelIcon = L.divIcon({
        html: palestineLabelHtml,
        className: 'palestine-mask-divicon',
        iconSize: [84, 28],
        iconAnchor: [42, 14]
    });

    // Koordinat diletakkan tepat di kedudukan teks lama di peta fizikal (31.06° N, 34.86° E)
    const palBadgeMarker = L.marker([31.06, 34.86], {
        icon: palestineLabelIcon,
        zIndexOffset: 1600
    }).addTo(mapInstance);

    palBadgeMarker.on('click', () => {
        const palLoc = ALL_MAP_LOCATIONS.find(l => l.id === 'jund_filastin');
        if (palLoc) openLocationInspector(palLoc);
    });
}

// Lukis Laluan Sejarah (Silk Road, Darb Zubaydah, Laluan Maritim)
function drawHistoricalRoutes() {
    routeLayerGroup.clearLayers();

    // 1. Laluan Sutera Emas Darat (Baghdad -> Nishapur -> Bukhara -> Samarkand -> Talas)
    const silkRoadCoords = [
        [33.3152, 44.3661], // Baghdad
        [35.6892, 51.3890], // Rayy (Tehran)
        [36.2133, 58.7958], // Nishapur
        [39.7681, 64.4556], // Bukhara
        [39.6542, 66.9597], // Samarkand
        [42.5228, 72.2428]  // Talas
    ];
    L.polyline(silkRoadCoords, {
        color: '#f59e0b',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '8, 8',
        className: 'silk-road-line'
    }).addTo(routeLayerGroup).bindTooltip("🐪 Laluan Sutera Emas (Silk Road)", { permanent: false });

    // 2. Laluan Darb Zubaydah (Kufah -> Madinah -> Makkah)
    const darbZubaydahCoords = [
        [32.0300, 44.4000], // Kufah
        [28.5000, 43.5000], // Zubalah / Telaga Padang Pasir
        [24.5247, 39.5692], // Madinah
        [21.4225, 39.8262]  // Makkah
    ];
    L.polyline(darbZubaydahCoords, {
        color: '#10b981',
        weight: 3,
        opacity: 0.85,
        dashArray: '6, 6'
    }).addTo(routeLayerGroup).bindTooltip("🕌 Laluan Kafilah Haji Darb Zubaydah", { permanent: false });

    // 3. Laluan Maritim Rempah (Basrah -> Teluk Parsi -> Lautan Hindi)
    const maritimeRouteCoords = [
        [30.5081, 47.7835], // Basrah
        [27.0000, 51.0000], // Teluk Parsi
        [24.0000, 57.0000], // Muscat / Teluk Oman
        [19.0760, 72.8777]  // Mumbai / India
    ];
    L.polyline(maritimeRouteCoords, {
        color: '#38bdf8',
        weight: 3,
        opacity: 0.8,
        dashArray: '5, 8'
    }).addTo(routeLayerGroup).bindTooltip("⛵ Laluan Maritim Teluk Parsi & Rempah", { permanent: false });

    // 4. Ekspedisi Penaklukan Amorium (Baghdad -> Samarra -> Anatolia Amorium)
    const amoriumExpeditionCoords = [
        [33.3152, 44.3661], // Baghdad
        [34.1983, 43.8742], // Samarra
        [36.3350, 43.1189], // Mosul
        [39.0203, 31.2942]  // Amorium
    ];
    L.polyline(amoriumExpeditionCoords, {
        color: '#ef4444',
        weight: 2.5,
        opacity: 0.85,
        dashArray: '6, 6'
    }).addTo(routeLayerGroup).bindTooltip("⚔️ Ekspedisi Tentera Al-Mu'tasim ke Amorium", { permanent: false });
}

// Render Pin Custom Mengikut Kategori
function renderMapMarkers(locations) {
    markerLayerGroup.clearLayers();

    // Tapis jund_filastin supaya tidak menduplikasi pin bulat di atas Al-Quds
    const cityLocations = locations.filter(loc => loc.id !== 'jund_filastin');

    cityLocations.forEach(loc => {
        const iconHtml = `
            <div class="custom-leaflet-marker" id="marker-${loc.id}">
                <div class="marker-pin-circle ${loc.category}">
                    <span class="marker-radar-ring"></span>
                    <span>${getCategoryIcon(loc.category)}</span>
                </div>
                <div class="marker-caption-tag">
                    <span class="ar">${loc.arabic.split(' — ')[0]}</span>
                    <span class="ms">${loc.name.split(' (')[0]}</span>
                </div>
            </div>
        `;

        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'leaflet-custom-div-icon',
            iconSize: [44, 52],
            iconAnchor: [22, 26]
        });

        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon });

        marker.on('click', () => {
            openLocationInspector(loc);
        });

        markerLayerGroup.addLayer(marker);
    });
}

function getCategoryIcon(cat) {
    if (cat === 'capital') return '👑';
    if (cat === 'knowledge') return '📚';
    if (cat === 'trade') return '🐫';
    if (cat === 'battle') return '⚔️';
    return '📍';
}

// ==========================================================================
// 4. MOD PENCERITAAN KISAH SINEMATIK (Storytelling HUD Controller)
// ==========================================================================

function initStorytellingHUD() {
    const prevBtn = document.getElementById('btn-story-prev');
    const nextBtn = document.getElementById('btn-story-next');
    const playBtn = document.getElementById('btn-story-autoplay');
    const audioBtn = document.getElementById('btn-story-audio');

    prevBtn?.addEventListener('click', () => {
        if (currentStoryIndex > 0) {
            loadStoryChapter(currentStoryIndex - 1);
        }
    });

    nextBtn?.addEventListener('click', () => {
        if (currentStoryIndex < STORY_CHAPTERS.length - 1) {
            loadStoryChapter(currentStoryIndex + 1);
        }
    });

    playBtn?.addEventListener('click', () => {
        toggleStoryAutoPlay();
    });

    audioBtn?.addEventListener('click', () => {
        const ch = STORY_CHAPTERS[currentStoryIndex];
        playVoiceNarration(ch.voiceText, audioBtn);
    });

    // Inspector Close
    document.getElementById('btn-close-insp')?.addEventListener('click', () => {
        document.getElementById('inspector-panel').classList.add('closed');
    });
}

function loadStoryChapter(index, instant = false) {
    currentStoryIndex = index;
    const ch = STORY_CHAPTERS[index];
    if (!ch) return;

    // Hentikan sebarang audio lama jika sedang berbunyi
    if (activeAudio) {
        activeAudio.pause();
        activeAudio = null;
        const audioBtn = document.getElementById('btn-story-audio');
        if (audioBtn) {
            audioBtn.innerHTML = '<span>🔊</span> Dengar Suara TV3';
            audioBtn.classList.remove('playing');
        }
    }

    // Update Story Card HUD
    document.getElementById('story-badge-num').innerText = `Babak ${ch.stage} / ${STORY_CHAPTERS.length}`;
    document.getElementById('story-year-text').innerText = ch.year;
    document.getElementById('story-title-text').innerText = ch.title;
    document.getElementById('story-ar-subtitle').innerText = ch.arabic;
    document.getElementById('story-narrative-p').innerText = ch.narrative;

    // Arrow states
    document.getElementById('btn-story-prev').disabled = index === 0;
    document.getElementById('btn-story-next').disabled = index === STORY_CHAPTERS.length - 1;

    // Sinematik FlyTo Camera ke Koordinat Destinasi Sebenar
    if (mapInstance) {
        if (instant) {
            mapInstance.setView([ch.lat, ch.lng], ch.zoom);
        } else {
            mapInstance.flyTo([ch.lat, ch.lng], ch.zoom, {
                duration: 2.2,
                easeLinearity: 0.25
            });
        }
    }

    // Buka panel maklumat lokasi yang sepadan
    const matchedLoc = ALL_MAP_LOCATIONS.find(l => Math.abs(l.lat - ch.lat) < 0.2 && Math.abs(l.lng - ch.lng) < 0.2);
    if (matchedLoc) {
        setTimeout(() => {
            openLocationInspector(matchedLoc);
        }, 1200);
    }
}

function toggleStoryAutoPlay() {
    const playBtn = document.getElementById('btn-story-autoplay');

    if (autoPlayStoryInterval) {
        clearInterval(autoPlayStoryInterval);
        autoPlayStoryInterval = null;
        playBtn.innerHTML = '<span>▶</span> Auto-Play';
        playBtn.classList.remove('active');
    } else {
        playBtn.innerHTML = '<span>⏸</span> Henti';
        playBtn.classList.add('active');

        // Mula auto-play: Setiap 9 saat bergerak ke babak seterusnya
        autoPlayStoryInterval = setInterval(() => {
            if (currentStoryIndex < STORY_CHAPTERS.length - 1) {
                loadStoryChapter(currentStoryIndex + 1);
            } else {
                // Loop semula ke babak 1
                loadStoryChapter(0);
            }
        }, 9000);
    }
}

// ==========================================================================
// 5. PANEL PENYIASAT DETAIL & MINI KUIZ (+15 XP)
// ==========================================================================

function openLocationInspector(loc) {
    const panel = document.getElementById('inspector-panel');
    panel.classList.remove('closed');

    document.getElementById('loc-insp-tag').innerText = loc.categoryLabel;
    document.getElementById('loc-insp-title').innerText = loc.name;
    document.getElementById('loc-insp-arabic').innerText = loc.arabic;
    document.getElementById('loc-insp-era').innerText = `⏳ Era: ${loc.era}`;
    document.getElementById('loc-insp-desc').innerText = loc.desc;
    document.getElementById('loc-insp-figures').innerText = loc.figures;

    // Render Quiz
    renderMapQuiz(loc.quiz);
}

function renderMapQuiz(quiz) {
    const slot = document.getElementById('loc-quiz-slot');
    if (!slot || !quiz) {
        if (slot) slot.innerHTML = '';
        return;
    }

    // Rawakkan pilihan jawapan
    const shuffledOptions = quiz.options.map((opt, i) => ({
        text: opt,
        isCorrect: i === quiz.correct
    })).sort(() => Math.random() - 0.5);

    slot.innerHTML = `
        <div class="mini-quiz-card">
            <div class="mini-quiz-header">
                <span>⚔️ Cabaran Minda Geografi</span>
                <span class="xp-pill">+${quiz.xp} XP</span>
            </div>
            <p class="mini-quiz-q">${quiz.q}</p>
            <div class="mini-quiz-options">
                ${shuffledOptions.map((opt, i) => `
                    <button class="quiz-opt-btn" data-correct="${opt.isCorrect ? '1' : '0'}" onclick="checkMapQuizAnswer(${opt.isCorrect}, ${quiz.xp}, this)">
                        ${String.fromCharCode(65 + i)}. ${opt.text}
                    </button>
                `).join('')}
            </div>
            <div id="quiz-msg" style="margin-top:8px; font-size:0.8rem; font-weight:700;"></div>
        </div>
    `;
}

window.checkMapQuizAnswer = function(isCorrect, xp, btn) {
    const parent = btn.parentElement;
    const allBtns = parent.querySelectorAll('.quiz-opt-btn');
    const msg = document.getElementById('quiz-msg');

    allBtns.forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === '1') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
    });

    if (isCorrect) {
        msg.style.color = '#6ee7b7';
        msg.innerText = `✓ TEPAT! Anda meraih +${xp} XP penguasaan geografi sejarah.`;
        saveQuizXP(xp);
    } else {
        msg.style.color = '#fca5a5';
        msg.innerText = `✗ Kurang tepat. Jawapan yang betul telah ditandakan hijau di atas.`;
    }
};

function saveQuizXP(xp) {
    fetch('api/progress.php?action=add_xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xp: xp, source: 'peta_geografi' })
    }).catch(() => {});
}

// ==========================================================================
// 6. SUARA NARATIF BERITA TV3 (Microsoft Osman Neural)
// ==========================================================================

function playVoiceNarration(text, buttonElem) {
    if (activeAudio) {
        activeAudio.pause();
        activeAudio = null;
        buttonElem.innerHTML = '<span>🔊</span> Dengar Suara TV3';
        buttonElem.classList.remove('playing');
        return;
    }

    buttonElem.innerHTML = '<span>⏳</span> Memuatkan Suara Berita...';
    buttonElem.classList.add('playing');

    const audioUrl = `api/tts.php?text=${encodeURIComponent(text)}&voice=osman`;
    activeAudio = new Audio(audioUrl);

    activeAudio.play()
        .then(() => {
            buttonElem.innerHTML = '<span>⏹️</span> Berhenti Mendengar';
        })
        .catch(() => {
            buttonElem.innerHTML = '<span>🔊</span> Dengar Suara TV3';
            buttonElem.classList.remove('playing');
            activeAudio = null;
            alert("Gagal memuatkan audio suara. Sila pastikan pelayan aktif.");
        });

    activeAudio.onended = () => {
        buttonElem.innerHTML = '<span>🔊</span> Dengar Suara TV3';
        buttonElem.classList.remove('playing');
        activeAudio = null;
    };
}

// ==========================================================================
// 7. PENUKAR JENIS PETA (Dark / Satelit Bumi Asli / Topografi)
// ==========================================================================

function initStyleSwitcher() {
    const btns = document.querySelectorAll('.style-btn');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const styleKey = btn.dataset.style;
            if (MAP_TILES[styleKey] && mapInstance) {
                if (currentTileLayer) {
                    mapInstance.removeLayer(currentTileLayer);
                }
                currentTileLayer = L.tileLayer(MAP_TILES[styleKey].url, {
                    attribution: MAP_TILES[styleKey].attribution,
                    subdomains: 'abcd',
                    maxZoom: 19
                }).addTo(mapInstance);
            }
        });
    });
}

// ==========================================================================
// 8. PENAPIS KATEGORI LOKASI
// ==========================================================================

function initCategoryFilters() {
    const btns = document.querySelectorAll('.filter-btn');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cat = btn.dataset.category;
            if (cat === 'all') {
                renderMapMarkers(ALL_MAP_LOCATIONS);
            } else {
                const filtered = ALL_MAP_LOCATIONS.filter(l => l.category === cat);
                renderMapMarkers(filtered);
            }
        });
    });
}
