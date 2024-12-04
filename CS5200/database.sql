-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: choir_db
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `name` varchar(10) NOT NULL,
  `check_in_date` date NOT NULL,
  `attendance` tinyint(1) DEFAULT NULL,
  `absent_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`,`check_in_date`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`name`) REFERENCES `members` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES ('AB','2024-07-11',0,NULL),('AB','2024-07-18',0,NULL),('AB','2024-07-25',1,NULL),('AB','2024-08-01',0,NULL),('AB','2024-08-08',1,NULL),('AB','2024-08-15',0,NULL),('AB','2024-08-22',0,NULL),('AB','2024-08-29',0,NULL),('AB','2024-09-05',0,NULL),('AB','2024-09-12',1,NULL),('AB','2024-09-19',0,NULL),('AB','2024-09-26',1,NULL),('AB','2024-10-03',0,NULL),('AB','2024-10-10',0,NULL),('AB','2024-10-17',0,NULL),('AB','2024-10-24',0,NULL),('AB','2024-10-31',0,NULL),('AS','2024-07-11',0,NULL),('AS','2024-07-18',1,NULL),('AS','2024-07-25',1,NULL),('AS','2024-08-01',1,NULL),('AS','2024-08-08',1,NULL),('AS','2024-08-15',1,NULL),('AS','2024-08-22',0,NULL),('AS','2024-08-29',0,NULL),('AS','2024-09-05',1,NULL),('AS','2024-09-12',0,NULL),('AS','2024-09-19',1,NULL),('AS','2024-09-26',1,NULL),('AS','2024-10-03',1,NULL),('AS','2024-10-10',0,NULL),('AS','2024-10-17',0,NULL),('AS','2024-10-24',1,NULL),('AS','2024-10-31',1,NULL),('CC','2024-07-11',0,NULL),('CC','2024-07-18',0,NULL),('CC','2024-07-25',1,NULL),('CC','2024-08-01',1,NULL),('CC','2024-08-08',1,NULL),('CC','2024-08-15',1,NULL),('CC','2024-08-22',0,NULL),('CC','2024-08-29',1,NULL),('CC','2024-09-05',1,NULL),('CC','2024-09-12',1,NULL),('CC','2024-09-19',1,NULL),('CC','2024-09-26',1,NULL),('CC','2024-10-03',1,NULL),('CC','2024-10-10',0,NULL),('CC','2024-10-17',1,NULL),('CC','2024-10-24',1,NULL),('CC','2024-10-31',0,NULL),('IM','2024-07-11',0,NULL),('IM','2024-07-18',0,NULL),('IM','2024-07-25',0,NULL),('IM','2024-08-01',0,NULL),('IM','2024-08-08',1,NULL),('IM','2024-08-15',1,NULL),('IM','2024-08-22',0,NULL),('IM','2024-08-29',0,NULL),('IM','2024-09-05',1,NULL),('IM','2024-09-12',1,NULL),('IM','2024-09-19',1,NULL),('IM','2024-09-26',0,NULL),('IM','2024-10-03',0,NULL),('IM','2024-10-10',0,NULL),('IM','2024-10-17',0,NULL),('IM','2024-10-24',1,NULL),('IM','2024-10-31',1,NULL),('JB','2024-07-11',1,NULL),('JB','2024-07-18',0,NULL),('JB','2024-07-25',1,NULL),('JB','2024-08-01',0,NULL),('JB','2024-08-08',0,NULL),('JB','2024-08-15',0,NULL),('JB','2024-08-22',0,NULL),('JB','2024-08-29',0,NULL),('JB','2024-09-05',1,NULL),('JB','2024-09-12',0,NULL),('JB','2024-09-19',1,NULL),('JB','2024-09-26',0,NULL),('JB','2024-10-03',0,NULL),('JB','2024-10-10',0,NULL),('JB','2024-10-17',1,NULL),('JB','2024-10-24',0,NULL),('JB','2024-10-31',0,NULL),('JC','2024-07-11',0,'sick'),('JC','2024-07-18',0,NULL),('JC','2024-07-25',1,NULL),('JC','2024-08-01',1,NULL),('JC','2024-08-08',1,NULL),('JC','2024-08-15',0,NULL),('JC','2024-08-22',0,NULL),('JC','2024-08-29',0,NULL),('JC','2024-09-05',1,NULL),('JC','2024-09-12',0,NULL),('JC','2024-09-19',1,NULL),('JC','2024-09-26',0,'travel'),('JC','2024-10-03',0,'travel'),('JC','2024-10-10',0,NULL),('JC','2024-10-17',1,NULL),('JC','2024-10-24',0,NULL),('JC','2024-10-31',1,NULL),('JF','2024-07-11',1,NULL),('JF','2024-07-18',0,NULL),('JF','2024-07-25',0,NULL),('JF','2024-08-01',1,NULL),('JF','2024-08-08',0,NULL),('JF','2024-08-15',1,NULL),('JF','2024-08-22',0,NULL),('JF','2024-08-29',0,NULL),('JF','2024-09-05',0,NULL),('JF','2024-09-12',0,NULL),('JF','2024-09-19',0,NULL),('JF','2024-09-26',0,NULL),('JF','2024-10-03',0,NULL),('JF','2024-10-10',0,NULL),('JF','2024-10-17',1,NULL),('JF','2024-10-24',1,NULL),('JF','2024-10-31',1,NULL),('LC','2024-07-11',0,NULL),('LC','2024-07-18',0,NULL),('LC','2024-07-25',0,NULL),('LC','2024-08-01',0,NULL),('LC','2024-08-08',0,NULL),('LC','2024-08-15',0,NULL),('LC','2024-08-22',0,NULL),('LC','2024-08-29',0,NULL),('LC','2024-09-05',0,NULL),('LC','2024-09-12',0,NULL),('LC','2024-09-19',0,NULL),('LC','2024-09-26',0,NULL),('LC','2024-10-03',0,NULL),('LC','2024-10-10',0,NULL),('LC','2024-10-17',0,NULL),('LC','2024-10-24',1,NULL),('LC','2024-10-31',0,NULL),('MB','2024-07-11',1,NULL),('MB','2024-07-18',0,NULL),('MB','2024-07-25',1,NULL),('MB','2024-08-01',1,NULL),('MB','2024-08-08',0,'vacation'),('MB','2024-08-15',0,'vacation'),('MB','2024-08-22',0,'sick'),('MB','2024-08-29',1,NULL),('MB','2024-09-05',1,NULL),('MB','2024-09-12',1,NULL),('MB','2024-09-19',1,NULL),('MB','2024-09-26',1,NULL),('MB','2024-10-03',1,NULL),('MB','2024-10-10',0,NULL),('MB','2024-10-17',0,NULL),('MB','2024-10-24',0,NULL),('MB','2024-10-31',0,NULL),('MG','2024-07-11',1,NULL),('MG','2024-07-18',0,NULL),('MG','2024-07-25',1,NULL),('MG','2024-08-01',1,NULL),('MG','2024-08-08',1,NULL),('MG','2024-08-15',1,NULL),('MG','2024-08-22',0,NULL),('MG','2024-08-29',0,NULL),('MG','2024-09-05',0,NULL),('MG','2024-09-12',0,NULL),('MG','2024-09-19',0,NULL),('MG','2024-09-26',1,NULL),('MG','2024-10-03',1,NULL),('MG','2024-10-10',0,NULL),('MG','2024-10-17',1,NULL),('MG','2024-10-24',1,NULL),('MG','2024-10-31',1,NULL),('MN','2024-07-11',0,'sick'),('MN','2024-07-18',0,NULL),('MN','2024-07-25',1,NULL),('MN','2024-08-01',0,'vacation'),('MN','2024-08-08',1,NULL),('MN','2024-08-15',1,NULL),('MN','2024-08-22',0,NULL),('MN','2024-08-29',1,NULL),('MN','2024-09-05',1,NULL),('MN','2024-09-12',1,NULL),('MN','2024-09-19',1,NULL),('MN','2024-09-26',1,NULL),('MN','2024-10-03',1,NULL),('MN','2024-10-10',0,NULL),('MN','2024-10-17',1,NULL),('MN','2024-10-24',1,NULL),('MN','2024-10-31',1,NULL),('MP','2024-07-11',1,NULL),('MP','2024-07-18',0,NULL),('MP','2024-07-25',1,NULL),('MP','2024-08-01',0,'sick'),('MP','2024-08-08',0,'sick'),('MP','2024-08-15',1,NULL),('MP','2024-08-22',0,NULL),('MP','2024-08-29',1,NULL),('MP','2024-09-05',1,NULL),('MP','2024-09-12',1,NULL),('MP','2024-09-19',1,NULL),('MP','2024-09-26',1,NULL),('MP','2024-10-03',1,NULL),('MP','2024-10-10',0,NULL),('MP','2024-10-17',1,NULL),('MP','2024-10-24',0,'out'),('MP','2024-10-31',1,NULL),('MS','2024-07-11',1,NULL),('MS','2024-07-18',0,NULL),('MS','2024-07-25',1,NULL),('MS','2024-08-01',1,NULL),('MS','2024-08-08',1,NULL),('MS','2024-08-15',1,NULL),('MS','2024-08-22',0,NULL),('MS','2024-08-29',1,NULL),('MS','2024-09-05',1,NULL),('MS','2024-09-12',1,NULL),('MS','2024-09-19',1,NULL),('MS','2024-09-26',0,NULL),('MS','2024-10-03',1,NULL),('MS','2024-10-10',0,NULL),('MS','2024-10-17',1,NULL),('MS','2024-10-24',1,NULL),('MS','2024-10-31',1,NULL),('SB','2024-07-11',1,NULL),('SB','2024-07-18',0,NULL),('SB','2024-07-25',1,NULL),('SB','2024-08-01',1,NULL),('SB','2024-08-08',1,NULL),('SB','2024-08-15',1,NULL),('SB','2024-08-22',0,NULL),('SB','2024-08-29',1,NULL),('SB','2024-09-05',1,NULL),('SB','2024-09-12',1,NULL),('SB','2024-09-19',1,NULL),('SB','2024-09-26',1,NULL),('SB','2024-10-03',1,NULL),('SB','2024-10-10',0,'out'),('SB','2024-10-17',1,NULL),('SB','2024-10-24',0,NULL),('SB','2024-10-31',1,NULL),('SF','2024-07-11',1,NULL),('SF','2024-07-18',0,NULL),('SF','2024-07-25',1,NULL),('SF','2024-08-01',1,NULL),('SF','2024-08-08',1,NULL),('SF','2024-08-15',1,NULL),('SF','2024-08-22',0,NULL),('SF','2024-08-29',1,NULL),('SF','2024-09-05',1,NULL),('SF','2024-09-12',1,NULL),('SF','2024-09-19',1,NULL),('SF','2024-09-26',1,NULL),('SF','2024-10-03',1,NULL),('SF','2024-10-10',0,NULL),('SF','2024-10-17',1,NULL),('SF','2024-10-24',1,NULL),('SF','2024-10-31',0,NULL),('SP','2024-07-11',1,NULL),('SP','2024-07-18',0,NULL),('SP','2024-07-25',1,NULL),('SP','2024-08-01',1,NULL),('SP','2024-08-08',1,NULL),('SP','2024-08-15',1,NULL),('SP','2024-08-22',0,NULL),('SP','2024-08-29',1,NULL),('SP','2024-09-05',0,NULL),('SP','2024-09-12',1,NULL),('SP','2024-09-19',1,NULL),('SP','2024-09-26',0,'travel'),('SP','2024-10-03',1,NULL),('SP','2024-10-10',0,NULL),('SP','2024-10-17',1,NULL),('SP','2024-10-24',1,NULL),('SP','2024-10-31',1,NULL);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = gbk */ ;
/*!50003 SET character_set_results = gbk */ ;
/*!50003 SET collation_connection  = gbk_chinese_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_after_attendance_insert` AFTER INSERT ON `attendance` FOR EACH ROW BEGIN
    CALL update_member_attendance_rate(NEW.name);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = gbk */ ;
/*!50003 SET character_set_results = gbk */ ;
/*!50003 SET collation_connection  = gbk_chinese_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_after_attendance_update` AFTER UPDATE ON `attendance` FOR EACH ROW BEGIN
    CALL update_member_attendance_rate(NEW.name);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = gbk */ ;
/*!50003 SET character_set_results = gbk */ ;
/*!50003 SET collation_connection  = gbk_chinese_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_after_attendance_delete` AFTER DELETE ON `attendance` FOR EACH ROW BEGIN
    CALL update_member_attendance_rate(OLD.name);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `donor_name` varchar(255) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `donation` decimal(10,2) NOT NULL,
  `on_donor_list` tinyint(1) DEFAULT NULL,
  `acknowledged` tinyint(1) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`donor_name`,`donation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES ('AC',NULL,NULL,40.00,0,0,''),('Anonymous',NULL,NULL,1000.00,0,0,''),('BB',NULL,NULL,70.00,0,0,'Payment method: Venmo'),('BV',NULL,NULL,25.00,0,0,''),('CG',NULL,NULL,50.00,0,0,''),('DM',NULL,'Marthanaber73@gmail.com',500.00,0,0,''),('DR',NULL,NULL,150.00,0,0,'Payment method: Venmo'),('EB',NULL,NULL,50.00,1,0,''),('EW',NULL,NULL,50.00,0,0,''),('FW',NULL,NULL,100.00,0,0,''),('GF',NULL,NULL,2000.00,0,0,'Received in Sept. 2024'),('IG',NULL,NULL,0.00,0,0,''),('JA',NULL,NULL,200.00,0,0,'Given in June 2024'),('JC',NULL,NULL,25.00,0,0,''),('JF',NULL,NULL,50.00,0,0,'Payment method: Venmo'),('JF',NULL,NULL,100.00,0,0,''),('JM',NULL,NULL,25.00,0,0,''),('KM',NULL,NULL,200.00,0,0,'Payment method: Venmo'),('MC',NULL,NULL,100.00,0,0,''),('MM',NULL,NULL,100.00,0,0,''),('MP',NULL,NULL,75.00,0,0,''),('MS',NULL,NULL,300.00,0,0,''),('NA',NULL,NULL,100.00,0,0,''),('NS',NULL,NULL,25.00,0,0,''),('SB',NULL,NULL,15.00,0,0,''),('SC',NULL,NULL,50.00,0,0,''),('SO',NULL,NULL,25.00,0,0,''),('WC',NULL,NULL,100.00,0,0,'');
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `name` varchar(10) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `voice_part` enum('Soprano','Alto','Tenor','Bass') NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `attendance_rate` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES ('AB',NULL,'ab@example.com',NULL,'Alto',1,23.53),('AS',NULL,'as@example.com',NULL,'Tenor',1,64.71),('CC',NULL,'cc@example.com',NULL,'Bass',1,70.59),('IM',NULL,'im@example.com',NULL,'Soprano',1,41.18),('JB',NULL,'jb@example.com',NULL,'Alto',1,29.41),('JC',NULL,'jc@example.com',NULL,'Tenor',1,41.18),('JF',NULL,'jf@example.com',NULL,'Bass',1,35.29),('LC',NULL,'lc@example.com',NULL,'Soprano',1,5.88),('MB',NULL,'mb@example.com',NULL,'Alto',1,52.94),('MG',NULL,'mg@example.com',NULL,'Tenor',1,58.82),('MN',NULL,'mn@example.com',NULL,'Bass',1,70.59),('MP',NULL,'mp@example.com',NULL,'Soprano',1,64.71),('MS',NULL,'ms@example.com',NULL,'Alto',1,76.47),('SB',NULL,'sb@example.com',NULL,'Tenor',1,76.47),('SF',NULL,'sf@example.com',NULL,'Bass',1,76.47),('SP',NULL,'sp@example.com',NULL,'Soprano',1,70.59);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership`
--

DROP TABLE IF EXISTS `membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership` (
  `name` varchar(10) NOT NULL,
  `last_payment_date` date DEFAULT NULL,
  `amount_paid` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `monthly_fee` decimal(10,2) DEFAULT '50.00',
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`name`),
  CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`name`) REFERENCES `members` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership`
--

LOCK TABLES `membership` WRITE;
/*!40000 ALTER TABLE `membership` DISABLE KEYS */;
/*!40000 ALTER TABLE `membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'choir_db'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `update_membership_status_event` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = gbk */ ;;
/*!50003 SET character_set_results = gbk */ ;;
/*!50003 SET collation_connection  = gbk_chinese_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `update_membership_status_event` ON SCHEDULE EVERY 1 DAY STARTS '2024-12-01 05:59:37' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    CALL update_membership_status();
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'choir_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `update_membership_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = gbk */ ;
/*!50003 SET character_set_results = gbk */ ;
/*!50003 SET collation_connection  = gbk_chinese_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_membership_status`()
BEGIN
    UPDATE Membership
    SET status = CASE
        WHEN last_payment_date IS NOT NULL
             AND amount_paid >= ((TIMESTAMPDIFF(MONTH, last_payment_date, CURDATE()) + 1) * monthly_fee)
            THEN TRUE
        ELSE FALSE
    END;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_member_attendance_rate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = gbk */ ;
/*!50003 SET character_set_results = gbk */ ;
/*!50003 SET collation_connection  = gbk_chinese_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_member_attendance_rate`(IN member_name VARCHAR(10))
BEGIN
    DECLARE total_events INT DEFAULT 0;
    DECLARE attended_events INT DEFAULT 0;
    DECLARE attendance_rate DECIMAL(5,2) DEFAULT 0;

    -- Calculate total number of attendance records for the member
    SELECT COUNT(*) INTO total_events
    FROM Attendance
    WHERE name = member_name;

    -- Calculate number of times the member was present
    SELECT COUNT(*) INTO attended_events
    FROM Attendance
    WHERE name = member_name AND attendance = TRUE;

    -- Calculate attendance rate
    IF total_events > 0 THEN
        SET attendance_rate = (attended_events / total_events) * 100;
    ELSE
        SET attendance_rate = 0;
    END IF;

    -- Update the attendance_rate in the Members table
    UPDATE Members
    SET attendance_rate = attendance_rate
    WHERE name = member_name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-03 16:46:45
