<?php
// api/ai_summarize.php — Modul Penjanaan Rumusan Pintar & Flashcards Daripada Nota Pelajar
session_start();
header('Content-Type: application/json; charset=utf-8');

$uploadDir = __DIR__ . '/../uploads/notes';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$tempFilePath = null;
$originalFileName = 'Nota_Pelajar.txt';

// 1. Terima fail muat naik atau teks langsung
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['file'];
    $originalFileName = preg_replace('/[^\w\.\-\s]/u', '_', basename($file['name']));
    $ext = strtolower(pathinfo($originalFileName, PATHINFO_EXTENSION));
    
    // Hadkan saiz fail kepada 15MB
    if ($file['size'] > 15 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Saiz fail melebihi had maksimum 15MB.']);
        exit;
    }

    $uniqueName = 'note_' . time() . '_' . uniqid() . '.' . $ext;
    $targetPath = $uploadDir . '/' . $uniqueName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $tempFilePath = $targetPath;
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Gagal memproses fail yang dimuat naik ke folder pelayan.']);
        exit;
    }
} else {
    // Semak jika pengguna menghantar teks langsung melalui JSON atau POST
    $inputData = json_decode(file_get_contents('php://input'), true);
    $directText = $inputData['text'] ?? $_POST['text'] ?? null;
    $docTitle = $inputData['title'] ?? $_POST['title'] ?? 'Nota_Peribadi.txt';

    if (!empty($directText)) {
        $uniqueName = 'note_' . time() . '_' . uniqid() . '.txt';
        $targetPath = $uploadDir . '/' . $uniqueName;
        file_put_contents($targetPath, $directText);
        $tempFilePath = $targetPath;
        $originalFileName = preg_replace('/[^\w\.\-\s]/u', '_', $docTitle);
    }
}

if (!$tempFilePath || !file_exists($tempFilePath)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Sila muat naik fail dokumen (PDF, Word, Teks) atau masukkan teks nota.']);
    exit;
}

// 2. Jalankan pekerja Python untuk analisis NLP & ekstraksi teks
$pythonExe = realpath(__DIR__ . '/../.venv/Scripts/python.exe');
$workerScript = realpath(__DIR__ . '/summarize_worker.py');

if (!$pythonExe || !file_exists($pythonExe) || !$workerScript || !file_exists($workerScript)) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Enjin pemproses AI tidak dikonfigurasi dengan betul pada pelayan.']);
    exit;
}

$outputJsonFile = $tempFilePath . '.output.json';

$cmd = sprintf(
    '"%s" "%s" "%s" "%s" "%s"',
    $pythonExe,
    $workerScript,
    $tempFilePath,
    $originalFileName,
    $outputJsonFile
);

$output = [];
$returnCode = 0;
exec($cmd, $output, $returnCode);

$result = null;

// Keutamaan: Baca daripada fail JSON output selamat
if (file_exists($outputJsonFile)) {
    $fileJson = file_get_contents($outputJsonFile);
    $result = json_decode($fileJson, true);
    @unlink($outputJsonFile);
}

// Sandaran: Jika fail tiada, baca daripada stdout
if (!$result && !empty($output)) {
    $rawStdout = implode("\n", $output);
    $result = json_decode($rawStdout, true);
}

if (!$result || !isset($result['status']) || $result['status'] !== 'success') {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $result['message'] ?? 'Gagal mengekstrak teks daripada dokumen. Sila pastikan fail mengandungi teks dan bukan imej yang tidak boleh dibaca.',
        'debug' => !empty($output) ? implode(' ', array_slice($output, -3)) : 'Tiada output dari pekerja AI'
    ]);
    exit;
}

// 3. Jika pelajar sedang log masuk, anugerahkan +25 XP bonus telaah nota
if (isset($_SESSION['user_id'])) {
    try {
        require_once __DIR__ . '/../Database/db_connect.php';
        $pdo = Database::getConnection();
        $stmtXP = $pdo->prepare("UPDATE users SET xp_points = xp_points + 25 WHERE id = ?");
        $stmtXP->execute([$_SESSION['user_id']]);
        $result['xp_awarded'] = 25;
    } catch (Exception $e) {
        $result['xp_awarded'] = 0;
    }
}

echo json_encode($result);
