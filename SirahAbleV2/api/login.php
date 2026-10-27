<?php
// api/login.php
session_start();
header('Content-Type: application/json');

require_once '../Database/db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$loginInput = '';
if (!empty($data['email'])) {
    $loginInput = trim($data['email']);
} elseif (!empty($data['identifier'])) {
    $loginInput = trim($data['identifier']);
} elseif (!empty($data['username'])) {
    $loginInput = trim($data['username']);
}
$password = isset($data['password']) ? trim($data['password']) : '';

if (empty($loginInput) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Sila masukkan Emel / Nama Pengguna dan Kata Laluan.']);
    exit;
}

try {
    $pdo = Database::getConnection();

    // Cari pengguna menggunakan emel atau nama pengguna (username)
    $stmt = $pdo->prepare("SELECT id, username, email, password_hash, role FROM users WHERE email = ? OR username = ?");
    $stmt->execute([$loginInput, $loginInput]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Semak jika pelajar wujud DAN kata laluan tepat
    if ($user && (password_verify($password, $user['password_hash']) || $password === $user['password_hash'])) {
        
        // Cipta sesi (session) log masuk
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'] ?? 'student';
        $_SESSION['logged_in'] = true;
        
        echo json_encode([
            'status' => 'success', 
            'message' => 'Log masuk berjaya!',
            'role' => $user['role'] ?? 'student'
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Emel atau Kata Laluan tidak sah.']);
    }

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ralat sistem: ' . $e->getMessage()]);
}
?>