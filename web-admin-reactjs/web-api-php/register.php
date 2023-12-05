<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $password = $data->password;
    $name = $data->name;
    // $role = $data->role;
    // $role = $data->role;
    $password_confirm = $data->password_confirm;

    // so sanh password và password confirm
    if($password != $password_confirm)
    {
        echo json_encode(array(
            'status' => false,
            'message' => "Mật khẩu không khớp"
        ));
    }
    // kiểm tra email đã tồn tại chưa
    $sqlQuery = "SELECT * FROM users WHERE email ='$email'";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if($user)
    {
        echo json_encode(array(
            'status' => false,
            'message' => "Email đã tồn tại"
        ));
    }
    // mã hóa password
    $password = password_hash($password, PASSWORD_BCRYPT);

    
    $sqlQuery = "INSERT INTO users(email, password, name, role, avatar) VALUES ('$email', '$password', '$name', 'user', 'null')";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    echo json_encode(array(
        'status' => true,
        'message' => "Đăng ký thành công"
    ));

} catch (\Exception $e) {
    echo json_encode(array(
        'status' => false,
        'message' => $e->getMessage()
    ));
}
