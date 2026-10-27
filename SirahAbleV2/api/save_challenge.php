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

// Get the raw POST data
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($data && isset($data['score']) && isset($data['xp_earned'])) {
    $score = filter_var($data['score'], FILTER_VALIDATE_INT);
    $xp_earned = filter_var($data['xp_earned'], FILTER_VALIDATE_INT);

    // Basic validation
    if ($score === false || $xp_earned === false || $score < 0 || $score > 100 || $xp_earned < 0) {
        $response['message'] = 'Invalid data provided.';
    } else {
        // 1. Kemas kini mata XP pelajar
        $stmt = $conn->prepare("UPDATE users SET xp_points = xp_points + ? WHERE id = ?");
        $stmt->bind_param("ii", $xp_earned, $userId);
        $stmt->execute();
        $stmt->close();

        // 2. Simpan skor Cabaran Akhir ke student_progress (Modul 99)
        $scoreDecimal = (float)$score;
        $stmtProg = $conn->prepare("
            INSERT INTO student_progress (user_id, module_id, is_unlocked, is_completed, score_percentage)
            VALUES (?, 99, 1, 1, ?)
            ON DUPLICATE KEY UPDATE 
                is_completed = 1,
                score_percentage = GREATEST(score_percentage, VALUES(score_percentage))
        ");
        $stmtProg->bind_param("id", $userId, $scoreDecimal);
        $stmtProg->execute();
        $stmtProg->close();

        // 3. Jika skor >= 90%, anugerahkan lencana khas 'badge_master' (Mu'arrikh Abbasiyah)
        if ($score >= 90) {
            $stmtMaster = $conn->prepare("
                INSERT IGNORE INTO user_badges (user_id, badge_id)
                SELECT ?, id FROM badges WHERE badge_key = 'badge_master'
            ");
            $stmtMaster->bind_param("i", $userId);
            $stmtMaster->execute();
            $stmtMaster->close();
        }

        // 4. Semak dan anugerahkan sebarang lencana XP lain yang layak
        $awardedBadges = awardBadgesIfConditionsMet($userId, $conn);

        $response['status'] = 'success';
        $response['message'] = 'Keputusan cabaran akhir berjaya disimpan!';
        $response['awarded_badges'] = $awardedBadges;
    }
}

$conn->close();
echo json_encode($response);