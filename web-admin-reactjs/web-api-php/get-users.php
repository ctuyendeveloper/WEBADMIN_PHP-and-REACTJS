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
$sqlQuery = "SELECT id, name, avatar FROM users";

// thực thi câu lệnh

$stmt = $dbConn->prepare($sqlQuery);
$stmt->execute();

// lay tat ca du lieu tu cau lenh pdo

$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// tra ve du lieu dang json

echo json_encode($users);


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