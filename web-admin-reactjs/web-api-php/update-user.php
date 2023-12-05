<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/update-news.php?id=2

// thêm mới tin tức

// import file connection.php

include_once './connection.php';

//   // đọc dữ liệu từ json
//   $data = json_decode(file_get_contents("php://input"));

//   // đặt biến
//   $title = $data->title;
//   $content = $data->content;
//   $user_id = $data->user_id;
//   $topic_id = $data->topic_id;
//   $id = $_GET['id'];

//   // cập nhật dữ liệu vào database

//   $sqlQuery = "UPDATE posts SET title = '$title', content = '$content', user_id = $user_id, topic_id = $topic_id, created_at = now() WHERE id = $id";


//   // thực thi câu lệnh pdo

//   $stmt = $dbConn->prepare($sqlQuery);
//   $stmt->execute();

//   // trả về thông báo
//   echo json_encode(array('message' => 'Cập nhật tin tức thành công.'));

try {
    // đọc dữ liệu từ json
    $data = json_decode(file_get_contents("php://input"));

    // đặt biến
    $avatar = $data->avatar;
    $name = $data->name;
    $email = $data->email;
    $id = $_GET['id'];

    // cập nhật dữ liệu vào database

    $sqlQuery = "UPDATE users SET email = '$email', name = '$name', avatar = '$avatar' WHERE id = $id";


    // thực thi câu lệnh pdo

    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();

    // trả về thông báo
    echo json_encode(array(
        'message' => 'Cập nhật tin tức thành công.',
        'status' => true
    ));
} catch (\Throwable $th) {
    echo json_encode(array(
        'message' => 'Cập nhật tin tức thành công.',
        'status' => false
    ));
}
