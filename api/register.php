<?php
session_start();
header('Content-Type: application/json');

require_once '../Database/db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = isset($data['username']) ? trim($data['username']) : '';
$email    = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Sila isi semua maklumat (Nama, Emel, Kata Laluan).']);
    exit;
}

try {
    $pdo = Database::getConnection();

    $stmtCheck = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmtCheck->execute([$email]);
    if ($stmtCheck->fetch()) {
        echo json_encode(['status' => 'error', 'message' => 'Emel ini telah didaftarkan. Sila log masuk.']);
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmtInsert = $pdo->prepare("INSERT INTO users (username, email, password_hash, xp_points, learning_streak) VALUES (?, ?, ?, 0, 1)");
    $stmtInsert->execute([$username, $email, $hashed_password]);

    $user_id = $pdo->lastInsertId();
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $username;
    $_SESSION['role'] = 'student';
    $_SESSION['logged_in'] = true;

    echo json_encode(['status' => 'success', 'message' => 'Pendaftaran berjaya! Membawa anda ke Dashboard...']);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ralat sistem: ' . $e->getMessage()]);
}
?>