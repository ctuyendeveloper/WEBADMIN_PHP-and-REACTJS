<?php 
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    // http://127.0.0.1:8686/upload-file.php

    try {
        $currentDirectory = getcwd();
        $uploadDirectory = "/uploads/";
    
        // Kiểm tra xem $_FILES['image'] có tồn tại không
        if(isset($_FILES['image'])){
            $fileName = $_FILES['image']['name'];
            $fileTmpName  = $_FILES['image']['tmp_name'];
            $uploadPath = $currentDirectory . $uploadDirectory . basename($fileName);
            
            // upload file
            move_uploaded_file($fileTmpName, $uploadPath);
            echo json_encode(
                array(
                    "error" => false,
                    "message" => "Upload successful",
                    "path" => "http://127.0.0.1:8686/uploads/".$fileName
                )
            );
        } else {
            // Nếu $_FILES['image'] không tồn tại, trả về thông báo lỗi
            echo json_encode(
                array(
                    "error" => true,
                    "message" => "Image file not provided",
                    "path" => null
                )
            );
        }
    } catch (Exception $e) {
        echo json_encode(
            array(
                "error" => true,
                "message" => "Upload failed",
                "path" => null
            )
        );
    }