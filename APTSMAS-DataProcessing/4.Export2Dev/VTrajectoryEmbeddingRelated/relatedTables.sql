CREATE TABLE `emb_result` (
  `type` int NOT NULL,
  `poetId` int NOT NULL,
  `normal` tinyint(1) NOT NULL,
  PRIMARY KEY (`type`,`poetId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `emb_detail` (
  `type` int NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
