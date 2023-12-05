-- Tạo Database

CREATE DATABASE IF NOT EXISTS `TEST`;

-- SỬ DỤNG

USE `TEST`;

CREATE TABLE
    IF NOT EXISTS `USERS` (
        `ID` int(11) NOT NULL AUTO_INCREMENT,
        `EMAIL` varchar(255) UNIQUE NOT NULL,
        `PASSWORD` varchar(255) NOT NULL,
        `NAME` varchar(255) NOT NULL,
        `ROLE` varchar(255) NOT NULL,
        `AVATAR` varchar(255) NOT NULL,
        PRIMARY KEY (`ID`)
    );

-- tạo bảng TOPICS(ID, NAME, DESCRIPTION)

CREATE TABLE
    IF NOT EXISTS `TOPICS` (
        `ID` int(11) NOT NULL AUTO_INCREMENT,
        `NAME` varchar(255) NOT NULL,
        `DESCRIPTION` varchar(255) NOT NULL,
        `USER_ID` int(11) NOT NULL,
        `CREATED_AT` datetime DEFAULT NOW() NOT NULL,
        PRIMARY KEY (`ID`),
        FOREIGN KEY (`USER_ID`) REFERENCES `USERS`(`ID`)
    );

-- tạo bảng password_resets(id, email, token, created_at, available)

CREATE TABLE
    IF NOT EXISTS `password_resets` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `email` varchar(255) NOT NULL,
        `token` varchar(255) NOT NULL,
        `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
        `available` tinyint(1) NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- tạo bảng POSTS(ID, TITLE, CONTENT, CREATED_AT, USER_ID, TOPIC_ID)

CREATE TABLE
    IF NOT EXISTS `POSTS` (
        `ID` int(11) NOT NULL AUTO_INCREMENT,
        `TITLE` varchar(255) NOT NULL,
        `CONTENT` varchar(255) NOT NULL,
        `IMAGE` varchar(255) NULL,
        `CREATED_AT` datetime DEFAULT NOW() NOT NULL,
        `USER_ID` int(11) NOT NULL,
        `TOPIC_ID` int(11) NOT NULL,
        PRIMARY KEY (`ID`),
        FOREIGN KEY (`USER_ID`) REFERENCES `USERS`(`ID`),
        FOREIGN KEY (`TOPIC_ID`) REFERENCES `TOPICS`(`ID`)
    );

-- tạo database

-- thêm dữ liệu vào bảng USERS

INSERT INTO
    `USERS` (
        `ID`,
        `EMAIL`,
        `PASSWORD`,
        `NAME`,
        `ROLE`,
        `AVATAR`
    )
VALUES (
        1,
        'admin@gmail.com',
        '123',
        'Nguyen van a',
        'admin',
        'https://www.w3schools.com/howto/img_avatar.png'
    ), (
        2,
        'binh@gmail.com',
        '123',
        'Nguyen van b',
        'user',
        'https://www.w3schools.com/howto/img_avatar.png'
    ), (
        3,
        'khang@gmail.com',
        '123',
        'Nguyen van c',
        'user',
        'https://www.w3schools.com/howto/img_avatar.png'
    );

-- thêm dữ liệu vào bảng TOPICS

INSERT INTO
    `TOPICS` (
        `ID`,
        `NAME`,
        `DESCRIPTION`,
        `CREATED_AT`,
        `USER_ID`
    )
VALUES (
        1,
        'PHP',
        'PHP is a server scripting language',
        '2019-11-11 00:00:00',
        3
    ), (
        2,
        'JAVA',
        'Java is a high-level programming language',
        '2019-11-11 00:00:00',
        3
    ), (
        3,
        'PYTHON',
        'Python is a programming language',
        '2019-11-11 00:00:00',
        3
    );

-- thêm dữ liệu vào bảng NEWS

INSERT INTO
    `POSTS` (
        `ID`,
        `TITLE`,
        `CONTENT`,
        `CREATED_AT`,
        `USER_ID`,
        `TOPIC_ID`
    )
VALUES (
        1,
        'PHP',
        'PHP is a server scripting language',
        '2019-11-11 00:00:00',
        1,
        1
    ), (
        2,
        'JAVA',
        'Java is a high-level programming language ',
        '2019-11-11 00:00:00',
        1,
        2
    ), (
        3,
        'PYTHON',
        'Python is a programming language',
        '2019-11-11 00:00:00',
        1,
        3
    ), (
        4,
        'PHP',
        'PHP is a server scripting language',
        '2019-11-11 00:00:00',
        2,
        1
    ), (
        5,
        'JAVA',
        'Java is a high-level programming language ',
        '2019-11-11 00:00:00',
        2,
        2
    ), (
        6,
        'PYTHON',
        'Python is a programming language',
        '2019-11-11 00:00:00',
        2,
        3
    ), (
        7,
        'PHP',
        'PHP is a server scripting language',
        '2019-11-11 00:00:00',
        3,
        1
    ), (
        8,
        'JAVA',
        'Java is a high-level programming language ',
        '2019-11-11 00:00:00',
        3,
        2
    ), (
        9,
        'PYTHON',
        'Python is a programming language',
        '2019-11-11 00:00:00',
        3,
        3
    );