<?php
session_start();
header('Content-Type: application/json');


require_once 'db_connect.php'; 

try {

    $query = "SELECT username AS name, xp_points AS xp FROM users ORDER BY xp_points DESC LIMIT 5";
    

    $result = mysqli_query($conn, $query);
    $leaderboard = [];
    
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $leaderboard[] = $row;
        }
    }
    

    echo json_encode([
        'status' => 'success',
        'leaderboard' => $leaderboard
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error', 
        'message' => 'Ralat Database: ' . $e->getMessage()
    ]);
}
?>