CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `photo_post`
--

DROP TABLE IF EXISTS `photo_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `photo_post` (
  `idphoto_post` int(11) NOT NULL,
  `description` varchar(45) NOT NULL,
  `createdAt` date NOT NULL,
  `photo_link` varchar(45) NOT NULL,
  `user_iduser` int(11) NOT NULL,
  `hashtags_idhashtags` int(11) NOT NULL,
  PRIMARY KEY (`idphoto_post`),
  UNIQUE KEY `photo_link_UNIQUE` (`photo_link`),
  KEY `fk_photo_post_user_idx` (`user_iduser`),
  KEY `fk_photo_post_hashtags1_idx` (`hashtags_idhashtags`),
  CONSTRAINT `fk_photo_post_hashtags1` FOREIGN KEY (`hashtags_idhashtags`) REFERENCES `hashtags` (`idhashtags`),
  CONSTRAINT `fk_photo_post_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_post`
--

LOCK TABLES `photo_post` WRITE;
/*!40000 ALTER TABLE `photo_post` DISABLE KEYS */;
INSERT INTO `photo_post` VALUES (1,'hello world','2019-04-16','/upload/1.jpg',1,1),(2,'lemon tree','2019-05-01','/upload/2.jpg',1,2),(3,'as i walk throw the valley','2019-05-01','/upload/3.jpg',1,3),(4,'of the shadow of death','2019-05-01','/upload/4.jpg',1,4),(5,'i take a look of my life','2019-05-01','/upload/5.jpg',1,5),(6,'tell me why are we so blind to see','2019-05-01','/upload/6.jpg',1,6),(7,'thats the one we hurt are you and me','2019-01-01','/upload/7.jpg',2,7),(8,'thats the one we hurt are you and me','2019-01-01','/upload/8.jpg',2,8),(9,'weman are clever and i respect them','2019-01-01','/upload/9.jpg',2,9),(10,'i just wanna be famous','2019-01-01','/upload/10.jpg',2,10);
/*!40000 ALTER TABLE `photo_post` ENABLE KEYS */;
UNLOCK TABLES;