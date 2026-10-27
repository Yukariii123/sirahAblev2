<?php
// This script is intended to be included by other PHP scripts, not called directly via HTTP.

/**
 * Checks for and awards badges to a user based on their current XP.
 *
 * @param int $userId The ID of the user.
 * @param mysqli $conn The database connection object.
 * @return array An array of titles of newly awarded badges.
 */
function awardBadgesIfConditionsMet(int $userId, mysqli $conn): array
{
    $newlyAwardedBadges = [];

    // 1. Get the user's current XP
    $stmt_xp = $conn->prepare("SELECT xp_points FROM users WHERE id = ?");
    $stmt_xp->bind_param("i", $userId);
    $stmt_xp->execute();
    $user_result = $stmt_xp->get_result()->fetch_assoc();
    $currentUserXP = $user_result ? (int)$user_result['xp_points'] : 0;
    $stmt_xp->close();

    // 2. Get all badges that are based on XP and not yet awarded to the user
    // This query efficiently selects only badges that are potentially awardable.
    $sql = "
        SELECT 
            b.id, b.title, b.required_xp
        FROM badges b
        LEFT JOIN user_badges ub ON b.id = ub.badge_id AND ub.user_id = ?
        WHERE b.required_xp > 0 AND ub.badge_id IS NULL
    ";
    $stmt_badges = $conn->prepare($sql);
    $stmt_badges->bind_param("i", $userId);
    $stmt_badges->execute();
    $result = $stmt_badges->get_result();

    $badgesToCheck = [];
    while ($row = $result->fetch_assoc()) {
        $badgesToCheck[] = $row;
    }
    $stmt_badges->close();

    // 3. Check conditions and award badges
    foreach ($badgesToCheck as $badge) {
        if ($currentUserXP >= $badge['required_xp']) {
            $stmt_award = $conn->prepare("INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)");
            $stmt_award->bind_param("ii", $userId, $badge['id']);
            if ($stmt_award->execute()) {
                $newlyAwardedBadges[] = $badge['title'];
            }
            $stmt_award->close();
        }
    }

    return $newlyAwardedBadges;
}