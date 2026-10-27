<?php
// scripts/warm_tts_cache.php — Pre-generate & warm all game narration audio cache

$jsFile = file_get_contents(__DIR__ . '/../Assets/js/game-core.js');

// Ambil semua teks cerita dari CHAPTERS_DATA
preg_match_all('/text:\s*"([^"]+)"/u', $jsFile, $textMatches);
preg_match_all('/explanation:\s*"([^"]+)"/u', $jsFile, $expMatches);

$textsToWarm = [];
if (!empty($textMatches[1])) {
    foreach ($textMatches[1] as $t) {
        $textsToWarm[] = trim(stripcslashes($t));
    }
}
if (!empty($expMatches[1])) {
    foreach ($expMatches[1] as $exp) {
        $cleanExp = trim(stripcslashes($exp));
        $textsToWarm[] = "Fakta tepat! " . $cleanExp;
        $textsToWarm[] = "Pembetulan fakta sejarah. " . $cleanExp;
    }
}

$textsToWarm = array_unique(array_filter($textsToWarm));
echo "Ditemui " . count($textsToWarm) . " skrip dialog untuk dipra-jana suara neural...\n";

function normalizeSirahMalay($str) {
    $str = preg_replace('/\bS\.?A\.?W\.?\b/i', "Sallallahu 'Alaihi Wasallam", $str);
    $str = preg_replace('/\bR\.?A\.?\b/i', "Radhiallahu 'Anhu", $str);

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
    $str = preg_replace('/\b(\d{3,4})\s*M\b/i', 'tahun $1 Masihi', $str);
    $str = preg_replace('/\b(\d{1,4})\s*H\b/i', 'tahun $1 Hijrah', $str);

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

    $str = preg_replace('/[•۞\(\)\[\]"“”«»]/u', ' ', $str);
    return trim(preg_replace('/\s+/', ' ', $str));
}

$cacheDir = __DIR__ . '/../Assets/audio/cache';
if (!is_dir($cacheDir)) {
    mkdir($cacheDir, 0777, true);
}

$edgeTtsScript = realpath(__DIR__ . '/../.venv/Scripts/edge-tts.exe');
$rate = '-3%';
$pitch = '+0Hz';

$voices = [
    'osman' => 'ms-MY-OsmanNeural',
    'yasmin' => 'ms-MY-YasminNeural'
];

$count = 0;
foreach ($textsToWarm as $rawText) {
    $cleanText = normalizeSirahMalay($rawText);
    if (empty($cleanText)) continue;

    foreach ($voices as $vKey => $voiceChoice) {
        $hash = md5($voiceChoice . '_' . $rate . '_' . $pitch . '_' . $cleanText);
        $cacheFile = $cacheDir . '/' . $hash . '.mp3';

        if (file_exists($cacheFile) && filesize($cacheFile) > 0) {
            continue; // Sudah sedia ada
        }

        $tempTextFile = tempnam(sys_get_temp_dir(), 'tts_warm_');
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

        if ($returnCode === 0 && file_exists($cacheFile)) {
            $count++;
            echo "Jana [$vKey]: " . substr($cleanText, 0, 40) . "...\n";
        }
    }
}

echo "Selesai! $count fail audio baharu berjaya dipra-jana dan disimpan dalam cache.\n";
