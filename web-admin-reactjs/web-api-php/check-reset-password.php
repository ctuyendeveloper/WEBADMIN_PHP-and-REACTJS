<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/users/password/forgot-password.php
// đọc email và token, password, password_confirmation từ body

try {
    // include_once './connection.php';
    include_once './connection.php';
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $token = $data->token;
    // $password = $data->password;
    // $password_confirmation = $data->password_confirmation;
    // kiểm tra password và password_confirmation có giống nhau hay không
    // if ($password != $password_confirmation) {
    //     echo json_encode(array(
    //         "status" => false,
    //         "message" => "Password and password confirmation are not the same"
    //     ));
    //     return;
    // }
    // kiểm tra email và token có trong db hay không
    $sqlQuery = "select * from password_resets where email = '$email' and token = '$token' 
    and created_at >= now() - interval 1 hour and available = 1";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result)
    {
        echo json_encode(array(
            "status" => true,
            "message" => "Token is valid"
        ));
    } else {
        echo json_encode(array(
            "status" => false,
            "message" => "Token is invalid"
        ));
    }

} catch (Exception $th) {
    echo json_encode(array(
        "status" => false,
        "message" => "Token is invalid"
    ));
} 