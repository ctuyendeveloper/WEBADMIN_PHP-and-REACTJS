<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';

try {
    $id = $_GET['id'];

    // Kiểm tra xem tin tức có đang được sử dụng trong bảng listnew hay không
    $checkUsageQuery = "SELECT COUNT(*) as count FROM posts WHERE posts.topic_id = $id";
    $result = $dbConn->query($checkUsageQuery);
    $row = $result->fetch(PDO::FETCH_ASSOC);

    if ($row['count'] > 0) {
        // Phần tử đang được sử dụng, không cho phép xóa
        // echo json_encode(["message" => "Tin tức đang được sử dụng và không thể xóa."]);
        echo json_encode(array(
            'status' => false,
            'message' => "Tin tức đang được sử dụng và không thể xóa."
        ));
    } else {
        // Tiến hành xóa tin tức từ bảng posts
        $sqlQuery = "DELETE FROM topics WHERE id = $id";
        $stmt = $dbConn->prepare($sqlQuery);
        $stmt->execute();

        // Trả về thông báo
        // echo json_encode(["message" => "Xóa tin tức thành công."]);
        echo json_encode(array(
            'status' => true,
            'message' => "Xóa tin tức thành công."
        ));
    }
} catch (Exception $e) {
    echo json_encode(array(
        'status' => false,
        'message' => $e->getMessage()
    ));
}
?>