<?php
session_start();
require_once 'db_connect.php';

// Check if the user is logged in
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode(['status' => 'error', 'message' => 'Authentication required.', 'action' => 'redirect', 'location' => 'index.html']);
    exit;
}

$userId = $_SESSION['user_id'];
$response = ['status' => 'error', 'message' => 'Could not fetch achievements.'];

// 1. Get current user's XP
$stmt_user = $conn->prepare("SELECT xp_points FROM users WHERE id = ?");
$stmt_user->bind_param("i", $userId);
$stmt_user->execute();
$user_result = $stmt_user->get_result()->fetch_assoc();
$currentUserXP = $user_result ? (int)$user_result['xp_points'] : 0;
$stmt_user->close();

// 2. Get all badges and join with the user's unlocked badges
$sql = "
    SELECT 
        b.id, b.badge_key, b.title, b.description, b.icon_emblem, b.icon_emblem AS icon_svg, b.required_xp,
        ub.unlocked_at
    FROM badges b
    LEFT JOIN user_badges ub ON b.id = ub.badge_id AND ub.user_id = ?
    ORDER BY b.id ASC
";

$stmt_badges = $conn->prepare($sql);
$stmt_badges->bind_param("i", $userId);
$stmt_badges->execute();
$result = $stmt_badges->get_result();

$badges_data = [];
while ($row = $result->fetch_assoc()) {
    $badges_data[] = $row;
}

$response['status'] = 'success';
$response['data'] = ['badges' => $badges_data, 'currentUserXP' => $currentUserXP];

$conn->close();
echo json_encode($response);