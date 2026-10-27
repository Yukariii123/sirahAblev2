<?php
require_once 'db_connect.php';

$response = ['status' => 'error', 'message' => 'Could not fetch questions.', 'data' => []];

// This SQL query joins the questions table with the options table
// to get all data in one go, ordered correctly.
$sql = "
    SELECT 
        q.id as question_id, 
        q.topic, 
        q.question_text, 
        q.rationale, 
        o.id as option_id, 
        o.option_text, 
        o.is_correct 
    FROM 
        challenge_questions q
    JOIN 
        challenge_options o ON q.id = o.question_id
    ORDER BY 
        q.sequence_order, o.id;
";

$result = $conn->query($sql);

$questions = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $qid = $row['question_id'];
        if (!isset($questions[$qid])) {
            $questions[$qid] = [
                'topic' => $row['topic'],
                'q' => $row['question_text'],
                'rationale' => $row['rationale'],
                'options' => [],
                'correct' => -1 // Will be set below
            ];
        }
        $questions[$qid]['options'][] = $row['option_text'];
        if ($row['is_correct']) {
            // Set the index of the correct option
            $questions[$qid]['correct'] = count($questions[$qid]['options']) - 1;
        }
    }
    $response['status'] = 'success';
    $response['message'] = 'Soalan berjaya diperoleh.';
    $response['data'] = array_values($questions); // Re-index the array
}

$conn->close();
echo json_encode($response);