<?php
session_start();
require_once 'db_connect.php';

// Include the badge awarding logic
require_once 'award_badges.php';

// Check if the user is logged in
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode(['status' => 'error', 'message' => 'Authentication required.']);
    exit;
}

$userId = $_SESSION['user_id'];
$response = ['status' => 'error', 'message' => 'Invalid request.'];

// Get the raw POST data from the fetch request
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($data && isset($data['node_id']) && isset($data['xp_earned'])) {
    $nodeId = filter_var($data['node_id'], FILTER_VALIDATE_INT);
    $xp_earned = filter_var($data['xp_earned'], FILTER_VALIDATE_INT);

    if ($nodeId === false || $xp_earned === false || $xp_earned < 0) {
        $response['message'] = 'Invalid data provided.';
    } else {
        // Use a transaction to ensure both updates succeed or fail together
        $conn->begin_transaction();
        try {
            // 1. Update user's total XP
            $stmt_xp = $conn->prepare("UPDATE users SET xp_points = xp_points + ? WHERE id = ?");
            $stmt_xp->bind_param("ii", $xp_earned, $userId);
            $stmt_xp->execute();
            $stmt_xp->close();

            // 2. Mark this story node as completed for the user
            // Using INSERT IGNORE to prevent errors if the record already exists
            $stmt_node = $conn->prepare("INSERT IGNORE INTO student_story_node_progress (user_id, story_node_id) VALUES (?, ?)");
            $stmt_node->bind_param("ii", $userId, $nodeId);
            $stmt_node->execute();
            $stmt_node->close();

            // After updating XP, check for new badges
            $awardedBadges = awardBadgesIfConditionsMet($userId, $conn);

            $conn->commit();
            $response = ['status' => 'success', 'message' => 'Progress saved.'];
            $response['awarded_badges'] = $awardedBadges; // Add awarded badges to the response
        } catch (mysqli_sql_exception $exception) {
            $conn->rollback();
            $response['message'] = 'Database error: ' . $exception->getMessage();
        }
    }
}

$conn->close();
echo json_encode($response);