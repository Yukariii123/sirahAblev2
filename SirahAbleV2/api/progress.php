<?php
// api/progress.php
session_start();
header('Content-Type: application/json');

require_once '../Database/db_connect.php';

// Pastikan pengguna sudah log masuk
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Sila log masuk terlebih dahulu.']);
    exit;
}

$user_id = $_SESSION['user_id'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'save_score') {
    // Terima data JSON dari JavaScript
    $data = json_decode(file_get_contents('php://input'), true);
    
    $module_id = isset($data['module_id']) ? (int)$data['module_id'] : 1;
    $score = isset($data['score']) ? (float)$data['score'] : 100;
    $xp_gained = isset($data['xp']) ? (int)$data['xp'] : 0;

    try {
        $pdo = Database::getConnection();
        
        // Mulakan transaksi database
        $pdo->beginTransaction();

        // 1. Tambah XP ke dalam profil pelajar (Jadual: users)
        $stmtUser = $pdo->prepare("UPDATE users SET xp_points = xp_points + ? WHERE id = ?");
        $stmtUser->execute([$xp_gained, $user_id]);

        // 2. Simpan Rekod Modul & Peratusan Skor (Jadual: student_progress)
        // Semak jika pelajar dah pernah main modul ini
        $stmtCheck = $pdo->prepare("SELECT id FROM student_progress WHERE user_id = ? AND module_id = ?");
        $stmtCheck->execute([$user_id, $module_id]);
        
        if ($stmtCheck->fetch()) {
            // Jika pernah main, kemas kini markah tertinggi (Update)
            $stmtProg = $pdo->prepare("UPDATE student_progress SET is_completed = 1, is_unlocked = 1, score_percentage = GREATEST(score_percentage, ?) WHERE user_id = ? AND module_id = ?");
            $stmtProg->execute([$score, $user_id, $module_id]);
        } else {
            // Jika pertama kali main, masukkan rekod baru (Insert)
            $stmtProg = $pdo->prepare("INSERT INTO student_progress (user_id, module_id, is_completed, is_unlocked, score_percentage) VALUES (?, ?, 1, 1, ?)");
            $stmtProg->execute([$user_id, $module_id, $score]);
        }

        // 3. Buka Kunci (Unlock) Modul Seterusnya Secara Automatik
        $next_module_id = $module_id + 1;
        
        // Semak adakah modul seterusnya sudah wujud dalam rekod
        $stmtCheckNext = $pdo->prepare("SELECT id FROM student_progress WHERE user_id = ? AND module_id = ?");
        $stmtCheckNext->execute([$user_id, $next_module_id]);
        
        if (!$stmtCheckNext->fetch()) {
             // Jika belum wujud, kita cipta dan set is_unlocked = 1
             $stmtUnlock = $pdo->prepare("INSERT INTO student_progress (user_id, module_id, is_unlocked, is_completed) VALUES (?, ?, 1, 0)");
             $stmtUnlock->execute([$user_id, $next_module_id]);
        }

        // 4. Semak dan anugerahkan Lencana secara automatik
        $stmtTotalXp = $pdo->prepare("SELECT xp_points FROM users WHERE id = ?");
        $stmtTotalXp->execute([$user_id]);
        $currentTotalXp = (int)$stmtTotalXp->fetchColumn();

        $stmtCountMod = $pdo->prepare("SELECT COUNT(*) FROM student_progress WHERE user_id = ? AND is_completed = 1 AND module_id != 99");
        $stmtCountMod->execute([$user_id]);
        $completedModsCount = (int)$stmtCountMod->fetchColumn();

        $stmtBadges = $pdo->prepare("
            SELECT b.id, b.badge_key, b.required_xp 
            FROM badges b 
            LEFT JOIN user_badges ub ON b.id = ub.badge_id AND ub.user_id = ?
            WHERE ub.badge_id IS NULL
        ");
        $stmtBadges->execute([$user_id]);
        $unearned = $stmtBadges->fetchAll();

        foreach ($unearned as $b) {
            $qualifies = false;
            if ($b['badge_key'] === 'badge_scholar' && $completedModsCount >= 5) {
                $qualifies = true;
            } elseif ($b['required_xp'] > 0 && $currentTotalXp >= $b['required_xp']) {
                $qualifies = true;
            } elseif ($module_id == 2 && $b['badge_key'] === 'badge_baghdad') {
                $qualifies = true;
            } elseif ($module_id == 3 && $b['badge_key'] === 'badge_seeker') {
                $qualifies = true;
            }

            if ($qualifies) {
                $stmtGive = $pdo->prepare("INSERT IGNORE INTO user_badges (user_id, badge_id) VALUES (?, ?)");
                $stmtGive->execute([$user_id, $b['id']]);
            }
        }

        $pdo->commit();
        echo json_encode(['status' => 'success', 'message' => 'Kemajuan berjaya disimpan!']);

    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} elseif ($action === 'add_xp' || (!empty($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST')) {
    $data = json_decode(file_get_contents('php://input'), true);
    $xp_gained = isset($data['xp']) ? (int)$data['xp'] : 0;

    if ($xp_gained > 0) {
        try {
            $pdo = Database::getConnection();
            $stmtUser = $pdo->prepare("UPDATE users SET xp_points = xp_points + ? WHERE id = ?");
            $stmtUser->execute([$xp_gained, $user_id]);
            echo json_encode(['status' => 'success', 'message' => "+$xp_gained XP berjaya ditambah!"]);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Jumlah XP tidak sah.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Tindakan API tidak sah.']);
}
?>