<?php
session_start();
require_once 'db_connect.php';

// Check if the user is logged in, if not, send an error and instruction to redirect.
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode(['status' => 'error', 'message' => 'Authentication required.', 'action' => 'redirect', 'location' => 'index.html']);
    exit;
}

$userId = $_SESSION['user_id'];

$response = [
    'status' => 'success',
    'data' => [
        'name' => $_SESSION['username'],
        'class' => 'SMU Tingkatan 4', // This can be expanded in the DB later
        'xp' => 0,
        'streak' => 5, // This can be calculated and stored
        'progress' => [],
        'badges' => []
    ]
];

// 1. Get User's basic info (like XP)
$stmt_user = $conn->prepare("SELECT xp_points FROM users WHERE id = ?");
$stmt_user->bind_param("i", $userId);
$stmt_user->execute();
$user_result = $stmt_user->get_result()->fetch_assoc();
if ($user_result) {
    $response['data']['xp'] = $user_result['xp_points'];
}
$stmt_user->close();

// 2. Get module progress for the user
// This query ensures all modules are returned, with the student's progress joined where it exists.
$sql = "
    SELECT 
        m.module_key, 
        sp.is_completed, 
        sp.is_unlocked
    FROM modules m
    LEFT JOIN student_progress sp ON m.id = sp.module_id AND sp.user_id = ?
    ORDER BY m.sequence_order ASC
";

$stmt_progress = $conn->prepare($sql);
$stmt_progress->bind_param("i", $userId);
$stmt_progress->execute();
$progress_result = $stmt_progress->get_result();

$isActiveSet = false;
while ($row = $progress_result->fetch_assoc()) {
    $status = 'locked'; // Default to locked
    if ($row['is_completed']) {
        $status = 'completed';
    } elseif ($row['is_unlocked'] && !$isActiveSet) {
        $status = 'active';
        $isActiveSet = true; // Ensure only one module is active
    } elseif ($row['is_unlocked']) {
        $status = 'locked'; // If a module is unlocked but not the first one, treat as locked until prior is done
    }
    $response['data']['progress'][$row['module_key']] = $status;
}
$stmt_progress->close();

$conn->close();
echo json_encode($response);