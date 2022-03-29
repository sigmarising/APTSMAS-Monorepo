CREATE TABLE `geo_detail` (
  `id` varchar(30) NOT NULL,
  `country` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `geoId` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `poet_detail` (
  `id` int NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `dynasty` varchar(10) DEFAULT NULL,
  `lifeStart` int DEFAULT NULL,
  `lifeEnd` int DEFAULT NULL,
  `mapConfig` varchar(100) DEFAULT NULL,
  `reference` text,
  `agesDetail` text,
  `travelDetail` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `poetId` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `geo_poet` (
  `geoId` varchar(30) NOT NULL,
  `poetId` int NOT NULL,
  PRIMARY KEY (`geoId`,`poetId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
