<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST GET PUT DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/index.php?name=abc&age=20
// req.body, req.query
// đọc dữ liệu từ phương thức GET của query string

$name = $_GET['name'];
$age = $_GET['age'];

echo json_encode(
    array(
        "message" => "Hello World! $name tuổi, $age tuổi",
        "name" => $name,
        "age" => $age,
    )
    );


?>