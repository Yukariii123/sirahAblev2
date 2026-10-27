<?php
// api/tts.php — Enjin Suara Pembaca Berita & Narator Sejarah Melayu (Microsoft Osman & Yasmin Neural)
header('Access-Control-Allow-Origin: *');

$text = isset($_GET['text']) ? trim($_GET['text']) : '';
$voiceReq = isset($_GET['voice']) ? strtolower(trim($_GET['voice'])) : 'osman';
$voiceChoice = ($voiceReq === 'yasmin') ? 'ms-MY-YasminNeural' : 'ms-MY-OsmanNeural';

// Kadar kelajuan bercerita (sedikit tenang untuk intonasi penceritaan beremosi)
$rate = isset($_GET['rate']) ? trim($_GET['rate']) : '-3%';
// Pitch suara
$pitch = isset($_GET['pitch']) ? trim($_GET['pitch']) : '+0Hz';

if (empty($text)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Teks diperlukan']);
    exit;
}

// ==========================================
// PEMBERSIHAN & PENYELARASAN SEBUTAN EMOSI BAHASA MELAYU
// ==========================================
function normalizeSirahMalay($str) {
    // 1. Gelaran Kehormatan & Agama
    $str = preg_replace('/\bS\.?A\.?W\.?\b/i', "Sallallahu 'Alaihi Wasallam", $str);
    $str = preg_replace('/\bR\.?A\.?\b/i', "Radhiallahu 'Anhu", $str);

    // 2. Pertukaran Tahun Sejarah ke Sebutan Huruf Bertaraf Formal & Berintonasi
    $yearMap = [
        '750' => 'tujuh ratus lima puluh',
        '754' => 'tujuh ratus lima puluh empat',
        '762' => 'tujuh ratus enam puluh dua',
        '775' => 'tujuh ratus tujuh puluh lima',
        '786' => 'tujuh ratus lapan puluh enam',
        '800' => 'lapan ratus',
        '809' => 'lapan ratus sembilan',
        '813' => 'lapan ratus tiga belas',
        '833' => 'lapan ratus tiga puluh tiga',
        '861' => 'lapan ratus enam puluh satu',
        '945' => 'sembilan ratus empat puluh lima',
        '1055' => 'seribu lima puluh lima',
        '1258' => 'seribu dua ratus lima puluh lapan',
    ];
    foreach ($yearMap as $yr => $word) {
        $str = preg_replace('/\b' . $yr . '\s*M\b/i', 'tahun ' . $word . ' Masihi', $str);
        $str = preg_replace('/\b' . $yr . '\s*Masihi\b/i', 'tahun ' . $word . ' Masihi', $str);
        $str = preg_replace('/\b' . $yr . '\s*H\b/i', 'tahun ' . $word . ' Hijrah', $str);
        $str = preg_replace('/\b' . $yr . '\s*Hijrah\b/i', 'tahun ' . $word . ' Hijrah', $str);
    }
    // Generic tahun penggantian
    $str = preg_replace('/\b(\d{3,4})\s*M\b/i', 'tahun $1 Masihi', $str);
    $str = preg_replace('/\b(\d{1,4})\s*H\b/i', 'tahun $1 Hijrah', $str);

    // 3. Nama Tokoh & Istilah agar Sebutan Asli Melayu/Arab Lancar
    $termMap = [
        '/\bBayt al-Hikmah\b/i' => 'Baitul Hikmah',
        '/\bBait al-Hikmah\b/i' => 'Baitul Hikmah',
        '/\bMadinat al-Salam\b/i' => 'Madinatul Salam',
        '/\bSshh\b/i' => 'Syyhh',
        '/\bAs-Saffah\b/i' => 'As-Saffah',
        '/\bAl-Mansur\b/i' => 'Al-Mansur',
        '/\bHarun al-Rashid\b/i' => 'Harun ar-Rasyid',
        '/\bAl-Rasyid\b/i' => 'Ar-Rasyid',
        '/\bAl-Ma\'mun\b/i' => "Al-Makmun",
        '/\bHulagu Khan\b/i' => 'Hulagu Khan',
        '/\bKhurasan\b/i' => 'Khurasan',
        '/\bMawali\b/i' => 'Mawali',
        '/\bDajlah\b/i' => 'Dajlah',
        '/\bFurat\b/i' => 'Furat',
    ];
    foreach ($termMap as $pat => $rep) {
        $str = preg_replace($pat, $rep, $str);
    }

    // 4. Bersihkan simbol pelik tapi kekalkan tanda baca intonasi (, . ! ? ' - ...)
    $str = preg_replace('/[•۞\(\)\[\]"“”«»]/u', ' ', $str);
    $str = trim(preg_replace('/\s+/', ' ', $str));

    return $str;
}

$cleanText = normalizeSirahMalay($text);

$cacheDir = __DIR__ . '/../Assets/audio/cache';
if (!is_dir($cacheDir)) {
    mkdir($cacheDir, 0777, true);
}

$hash = md5($voiceChoice . '_' . $rate . '_' . $pitch . '_' . $cleanText);
$cacheFile = $cacheDir . '/' . $hash . '.mp3';

if (file_exists($cacheFile) && filesize($cacheFile) > 0) {
    header('Content-Type: audio/mpeg');
    header('Content-Length: ' . filesize($cacheFile));
    header('Cache-Control: public, max-age=31536000');
    readfile($cacheFile);
    exit;
}

// Jana suara neural dengan edge-tts
$edgeTtsScript = realpath(__DIR__ . '/../.venv/Scripts/edge-tts.exe');

if ($edgeTtsScript && file_exists($edgeTtsScript)) {
    $tempTextFile = tempnam(sys_get_temp_dir(), 'tts_');
    file_put_contents($tempTextFile, $cleanText);

    $cmd = sprintf(
        '"%s" --voice "%s" --rate="%s" --pitch="%s" -f "%s" --write-media "%s"',
        $edgeTtsScript,
        $voiceChoice,
        $rate,
        $pitch,
        $tempTextFile,
        $cacheFile
    );

    exec($cmd, $output, $returnCode);
    @unlink($tempTextFile);

    if ($returnCode === 0 && file_exists($cacheFile) && filesize($cacheFile) > 0) {
        header('Content-Type: audio/mpeg');
        header('Content-Length: ' . filesize($cacheFile));
        header('Cache-Control: public, max-age=31536000');
        readfile($cacheFile);
        exit;
    }
}

http_response_code(500);
echo json_encode(['status' => 'error', 'message' => 'Gagal menjana audio suara Melayu']);
