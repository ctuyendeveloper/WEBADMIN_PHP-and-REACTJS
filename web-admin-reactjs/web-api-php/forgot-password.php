<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


use PHPMailer\PHPMailer\PHPMailer;

include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/PHPMailer.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/SMTP.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/Exception.php';


// http://127.0.0.1:8686/forgot-password.php
// quên mật khẩu
// import connection.php
include_once './connection.php';
try {
    // đọc email từ body
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;

    // kiểm tra email có trong db hay không
    $sqlQuery = "SELECT id FROM users WHERE email = '$email'";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        // nếu có email trong db thì gửi email
        // send email otp
        // tạo token bằng cách mã hóa email và thời gian
        $token = md5(time() . $email);
        // lưu token vào database
        $query = "insert into password_resets (email, token)
                        values ('$email', '$token') ";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        // gửi email có link reset mật khẩu
        $link = "<a href='http://172.16.126.105:3000/reset-password?email="
            . $email . "&token=" . $token . "'>Click to reset password</a>";
        $mail = new PHPMailer();
        $mail->CharSet = "utf-8";
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Username = "ctuyendeveloper";
        $mail->Password = "aatqmxkydmdgnugu";
        $mail->SMTPSecure = "ssl";
        $mail->Host = "ssl://smtp.gmail.com";
        $mail->Port = "465";
        $mail->From = "ctuyendeveloper@gmail.com";
        $mail->FromName = "Công Tuyền DEV";
        $mail->addAddress($email, 'Hello');
        $mail->Subject = "Reset Password";
        $mail->isHTML(true);
        $mail->Body = "Click on this link to reset password " . $link . " ";
        $res = $mail->Send();
        if ($res) {
            echo json_encode(array(
                "message" => "Email sent.",
                "status" => true
            ));
        } else {
            echo json_encode(array(
                "message" => "Email sent failed.",
                "status" => false
            ));
        }
    } else {
        // nếu không có email trong db thì trả về thông báo
        echo json_encode(array(
            "status" => false,
            "message" => "Email không tồn tại."
        ));
    }
} catch (\Throwable $th) {
    echo json_encode(array(
        "status" => false,
        "message" => "Có lỗi nè."
    ));
}

// http://127.0.0.1:3000/reset-password?email=tuyenncps22487@fpt.edu.vn&token=e85563e94c0ed1455a37fff5095cc28b
// http://127.0.0.1:3000/reset-password?email=tuyenncps22487@fpt.edu.vn&token=8b5d0aced069927f79a031cbad7769a7