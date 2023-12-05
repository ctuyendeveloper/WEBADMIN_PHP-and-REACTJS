<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/get-news-detail.php?id=1
// import file connection.php

include_once './connection.php';
// đọc id từ query string
$id = $_GET['id'];
// đọc dữ liệu từ database
// $sqlQuery = "SELECT posts.id, posts.title, posts.content, posts.image, posts.created_at, users.NAME, topics.id, topics.name, users.avatar FROM posts 
// INNER JOIN users ON posts.user_id = users.id INNER JOIN topics ON posts.topic_id = topics.id
// WHERE posts.id = $id ORDER BY topics.id";
// thực thi câu lệnh pdo
$sqlQuery = "SELECT name, description, user_id FROM topics WHERE id = $id";

$stmt = $dbConn->prepare($sqlQuery);
$stmt->execute();

// đọc dữ liệu 1 bảng tin

$news = $stmt->fetchAll(PDO::FETCH_ASSOC);

// trả dữ liệu theo kiểu json

echo json_encode($news);
?>