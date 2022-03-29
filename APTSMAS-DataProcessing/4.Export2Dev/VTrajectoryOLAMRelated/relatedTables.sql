CREATE TABLE `country_name` (
  `id` varchar(30) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `province_name` (
  `id` varchar(30) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `city_name` (
  `id` varchar(30) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `location_name` (
  `id` varchar(30) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `poet_lines` (
  `id` int NOT NULL,
  `poetId` int NOT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `countryId` varchar(30) DEFAULT NULL,
  `provinceId` varchar(30) DEFAULT NULL,
  `cityId` varchar(30) DEFAULT NULL,
  `locationId` varchar(30) DEFAULT NULL,
  `visitYear` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `country_location` (
  `countryId` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `locationId` varchar(30) NOT NULL,
  PRIMARY KEY (`countryId`,`locationId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `province_location` (
  `provinceId` varchar(30) NOT NULL,
  `locationId` varchar(30) NOT NULL,
  PRIMARY KEY (`provinceId`,`locationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `city_location` (
  `cityId` varchar(30) NOT NULL,
  `locationId` varchar(30) NOT NULL,
  PRIMARY KEY (`cityId`,`locationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
