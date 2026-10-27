<?php
// api/get_dashboard.php
session_start();
header('Content-Type: application/json');

require_once '../Database/db_connect.php';

// SEMAKAN KESELAMATAN SEBENAR (Real Security Check)
// Jika pelajar tiada sesi log masuk (session), tendang mereka keluar.
if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // 401 bermaksud Unauthorized (Tidak Dibenarkan)
    echo json_encode(['status' => 'error', 'message' => 'Sila log masuk untuk mengakses Dashboard.']);
    exit;
}

$user_id = $_SESSION['user_id']; 

try {
    $pdo = Database::getConnection();

    // 1. Dapatkan Profil Pelajar
    $stmtUser = $pdo->prepare("SELECT username, xp_points, learning_streak FROM users WHERE id = ?");
    $stmtUser->execute([$user_id]);
    $user = $stmtUser->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        throw new Exception("Akaun pelajar tidak dijumpai.");
    }

    // 2. Dapatkan Kemajuan 8 Modul
    $stmtModules = $pdo->prepare("
        SELECT m.id, m.module_key, m.title, m.sequence_order,
               COALESCE(sp.is_completed, 0) as is_completed, 
               COALESCE(sp.is_unlocked, 0) as is_unlocked
        FROM modules m
        LEFT JOIN student_progress sp ON m.id = sp.module_id AND sp.user_id = ?
        ORDER BY m.sequence_order ASC
    ");
    $stmtModules->execute([$user_id]);
    $modules = $stmtModules->fetchAll(PDO::FETCH_ASSOC);

    // 3. Kira Peratusan Kemajuan
    $total_modules = count($modules);
    $completed_modules = 0;
    foreach ($modules as $mod) {
        if ($mod['is_completed'] == 1) {
            $completed_modules++;
        }
    }
    $progress_percent = ($total_modules > 0) ? round(($completed_modules / $total_modules) * 100) : 0;

    // 4. Dapatkan Lencana Pelajar
    $stmtBadges = $pdo->prepare("
        SELECT b.id, b.badge_key, b.title, b.icon_emblem, b.required_xp,
               IF(ub.user_id IS NOT NULL, 1, 0) as is_earned
        FROM badges b
        LEFT JOIN user_badges ub ON b.id = ub.badge_id AND ub.user_id = ?
    ");
    $stmtBadges->execute([$user_id]);
    $badges = $stmtBadges->fetchAll(PDO::FETCH_ASSOC);

    // 5. Kembalikan data
    echo json_encode([
        'status' => 'success',
        'user' => $user,
        'stats' => [
            'total_modules' => $total_modules,
            'completed' => $completed_modules,
            'percent' => $progress_percent
        ],
        'modules' => $modules,
        'badges' => $badges
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>