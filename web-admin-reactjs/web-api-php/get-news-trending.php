<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

// Câu truy vấn để lấy thông tin bài viết có số lượng seen cao nhất
// $sqlQuery = "SELECT * FROM posts ORDER BY seen DESC LIMIT 1";
$sqlQuery = "SELECT posts.id, posts.title, posts.content, posts.image, posts.created_at, posts.seen, users.NAME, topics.name, posts.topic_id
FROM posts INNER JOIN users ON posts.user_id = users.id INNER JOIN topics ON posts.topic_id = topics.id ORDER BY seen DESC LIMIT 1";

try {
    // Thực hiện câu truy vấn PDO
    $stmt = $dbConn->query($sqlQuery);
    $post = $stmt->fetch(PDO::FETCH_ASSOC);

    // Trả về dữ liệu dưới dạng JSON
    echo json_encode($post);
} catch (\Throwable $th) {
    // Xử lý lỗi nếu có
    http_response_code(500);
    echo json_encode(array('message' => 'Lấy thông tin bài viết thất bại.'));
}
?>