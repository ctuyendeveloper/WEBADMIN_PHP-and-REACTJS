<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/users/password/reset-password.php
// đọc email và token, password, password_confirmation từ body
try {
    include_once './connection.php';
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $token = $data->token;
    $password = $data->password;
    $password_confirmation = $data->password_confirmation;
    // kiểm tra email và token có trong db hay không
    $sqlQuery = "select * from password_resets where email = '$email' and token = '$token' 
       and created_at >= now() - interval 1 hour and available = 1";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        if ($password != $password_confirmation) {
            echo json_encode(array(
                "status" => false,
                "message" => "Password and Password confirmation are not the same"
            ));
        }
        else {
            $query = "update users set password = '$password' where email = '$email' ";
            $stmt = $dbConn->prepare($query);
            $stmt->execute();
            $query = "update password_resets set available = 0 where email = '$email' ";
            $stmt = $dbConn->prepare($query);
            $stmt->execute();
            echo json_encode(array(
                "status" => true,
                "message" => "Password reset successfully"
            ));
        }
    } else {
        echo json_encode(array(
            "status" => false,
            "message" => "Token is invalid"
        ));
    }
} catch (\Throwable $th) {
    echo json_encode(array(
        "status" => false,
        "error" => $th->getMessage()
    ));
}
