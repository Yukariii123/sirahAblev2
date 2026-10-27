<?php
// api/get_admin_data.php
header('Content-Type: application/json');
require_once '../Database/db_connect.php';

try {
    $pdo = Database::getConnection();

    // Dapatkan data pelajar gabung dengan pengiraan modul selesai
    $sql = "SELECT 
                u.id, 
                u.username, 
                u.email, 
                u.xp_points,
                u.learning_streak,
                (SELECT COUNT(*) FROM student_progress sp WHERE sp.user_id = u.id AND sp.is_completed = 1 AND sp.module_id != 99) as completed_modules,
                (SELECT score_percentage FROM student_progress sp WHERE sp.user_id = u.id AND sp.module_id = 99 LIMIT 1) as final_score
            FROM users u 
            WHERE u.role = 'student'
            ORDER BY u.xp_points DESC";

    $stmt = $pdo->query($sql);
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'students' => $students
    ]);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>