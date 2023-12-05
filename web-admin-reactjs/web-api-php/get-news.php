<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/get-news.php
// import file connection.php

include_once './connection.php';
// doc du lieu tu database
$sqlQuery = "SELECT posts.id, posts.title, posts.content, posts.image, posts.created_at, posts.seen, users.NAME, topics.name, posts.topic_id
FROM posts INNER JOIN users ON posts.user_id = users.id INNER JOIN topics ON posts.topic_id = topics.id ORDER BY posts.id";

// $sqlQuery = "SELECT id, title, content, image, created_at, user_id, topic_id FROM posts";
// thực thi câu lệnh

$stmt = $dbConn->prepare($sqlQuery);
$stmt->execute();

// lay tat ca du lieu tu cau lenh pdo

$news = $stmt->fetchAll(PDO::FETCH_ASSOC);

// tra ve du lieu dang json

echo json_encode($news);


// $name = $_GET['name'];
// $age = $_GET['age'];

// echo json_encode(
//     array(
//         "message" => "Hello World! $name tuổi, $age tuổi",
//         "name" => $name,
//         "age" => $age,
//     )
//     );


// ?>