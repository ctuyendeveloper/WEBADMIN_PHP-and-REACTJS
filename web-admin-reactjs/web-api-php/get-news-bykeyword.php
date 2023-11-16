<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/get-news-bykeyword.php?keyword=?
// import file connection.php
include_once './connection.php';

// đọc dữ liệu từ phương thức GET của query string
$keyword = $_GET['keyword'];

// đọc dữ liệu từ database
$sqlQuery = "SELECT id, title, content, created_at, user_id, topic_id FROM posts WHERE title LIKE '%$keyword%' OR content LIKE '%$keyword%'";

// thực thi câu lệnh pdo
$stmt = $dbConn->prepare($sqlQuery);
$stmt->execute();

// đọc dữ liệu 1 bảng tin
$news = $stmt->fetchAll(PDO::FETCH_ASSOC);

// trả dữ liệu theo kiểu json
echo json_encode($news);
?>