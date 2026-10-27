<?php
session_start();
require_once 'db_connect.php';

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode(['status' => 'error', 'message' => 'Authentication required.']);
    exit;
}

$userId = $_SESSION['user_id'];
$response = ['status' => 'error', 'message' => 'Invalid request.'];

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($data && isset($data['current_password']) && isset($data['new_password'])) {
    $currentPassword = $data['current_password'];
    $newPassword = $data['new_password'];

    if (empty($currentPassword) || empty($newPassword) || strlen($newPassword) < 8) {
        $response['message'] = 'Data tidak sah. Sila pastikan semua medan diisi dengan betul.';
        echo json_encode($response);
        exit;
    }

    $stmt = $conn->prepare("SELECT password_hash FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    if ($user && (password_verify($currentPassword, $user['password_hash']) || $currentPassword === $user['password_hash'])) {
        $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

        $stmt_update = $conn->prepare("UPDATE users SET password_hash = ? WHERE id = ?");
        $stmt_update->bind_param("si", $newPasswordHash, $userId);

        if ($stmt_update->execute()) {
            $response = ['status' => 'success', 'message' => 'Kata laluan anda telah berjaya dikemaskini.'];
        } else {
            $response['message'] = 'Gagal mengemaskini kata laluan. Sila cuba lagi.';
        }
        $stmt_update->close();
    } else {
        $response['message'] = 'Kata laluan semasa yang anda masukkan tidak tepat.';
    }
}

$conn->close();
echo json_encode($response);