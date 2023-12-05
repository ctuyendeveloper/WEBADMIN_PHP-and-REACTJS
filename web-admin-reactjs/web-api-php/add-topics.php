<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/add-news.php

// thêm mới tin tức

// import file connection.php

include_once './connection.php';

try {
    // đọc dữ liệu từ json
    $data = json_decode(file_get_contents("php://input"));

    // đọc dữ liệu từ json
    $name = $data->name;
    $description = $data->description;
    $user_id = $data->user_id;

    // thêm mới dữ liệu

    $sqlQuery = "INSERT INTO topics(name, description, user_id, created_at) VALUES ('$name', '$description', $user_id, now())";


    // thực thi câu lệnh pdo

    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();

    $result = array(
        "status" => 200, 
        "data" => $data
    );

    // trả về thông báo
    // http_response_code(200);
    echo json_encode($result);
    // status code
} catch (\Throwable $th) {
    echo json_encode(array('message' => 'Thêm mới tin tức thất bại.'));
}
