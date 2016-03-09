/*
Navicat MySQL Data Transfer

Source Server         : mysql_service
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : big_f2e_blog

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-03-10 01:11:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `about`
-- ----------------------------
DROP TABLE IF EXISTS `about`;
CREATE TABLE `about` (
  `about_id` int(11) NOT NULL AUTO_INCREMENT,
  `pice` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `describe` text COLLATE utf8_bin,
  `update` datetime DEFAULT NULL,
  PRIMARY KEY (`about_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of about
-- ----------------------------

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('8', 'admin', '8ddcff3a80f4189ca1c9d4d902c3c909', '2016-03-06 23:43:09', '2016-03-06 23:43:09');

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `art_id` int(11) NOT NULL AUTO_INCREMENT,
  `review_id` int(11) DEFAULT NULL,
  `pv` int(11) DEFAULT '0',
  `priase_id` int(11) DEFAULT NULL,
  `top` int(11) NOT NULL DEFAULT '0',
  `good` int(11) NOT NULL DEFAULT '0',
  `title` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `art_pice` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `describe` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `content` text COLLATE utf8_bin,
  `tag` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`art_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for `friend_links`
-- ----------------------------
DROP TABLE IF EXISTS `friend_links`;
CREATE TABLE `friend_links` (
  `f_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_link` varchar(50) COLLATE utf8_bin NOT NULL,
  `f_logo` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `f_title` varchar(50) COLLATE utf8_bin NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of friend_links
-- ----------------------------

-- ----------------------------
-- Table structure for `os_config`
-- ----------------------------
DROP TABLE IF EXISTS `os_config`;
CREATE TABLE `os_config` (
  `os_id` int(11) NOT NULL AUTO_INCREMENT,
  `web_host` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `web_name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `powerby` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `keywords` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `beian` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `tel` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `founder` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `update_at` datetime NOT NULL,
  `logo` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`os_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of os_config
-- ----------------------------

-- ----------------------------
-- Table structure for `tags`
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `tags_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_bin NOT NULL,
  `describe` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of tags
-- ----------------------------

-- ----------------------------
-- Table structure for `timeline`
-- ----------------------------
DROP TABLE IF EXISTS `timeline`;
CREATE TABLE `timeline` (
  `time_id` int(11) NOT NULL AUTO_INCREMENT,
  `start_time` datetime NOT NULL,
  `title` varchar(50) COLLATE utf8_bin NOT NULL,
  `describe` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`time_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of timeline
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `real_name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `nick_name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `youweb` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `aignature` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `weixin` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `avatar` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `is_lock` int(11) DEFAULT '1',
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for `user_article`
-- ----------------------------
DROP TABLE IF EXISTS `user_article`;
CREATE TABLE `user_article` (
  `art_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `review_id` int(11) DEFAULT NULL,
  `praise_id` int(11) DEFAULT NULL,
  `good` int(11) NOT NULL DEFAULT '0',
  `top` int(11) NOT NULL DEFAULT '0',
  `pv` int(11) DEFAULT '0',
  `title` varchar(50) COLLATE utf8_bin NOT NULL,
  `art_pice` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `describe` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `content` text COLLATE utf8_bin,
  `tag` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`art_id`),
  KEY `user_id` (`user_id`),
  KEY `review_id` (`review_id`),
  CONSTRAINT `review_id` FOREIGN KEY (`review_id`) REFERENCES `user_review` (`review_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user_article
-- ----------------------------

-- ----------------------------
-- Table structure for `user_praise`
-- ----------------------------
DROP TABLE IF EXISTS `user_praise`;
CREATE TABLE `user_praise` (
  `praise_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `con` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`praise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user_praise
-- ----------------------------

-- ----------------------------
-- Table structure for `user_reply`
-- ----------------------------
DROP TABLE IF EXISTS `user_reply`;
CREATE TABLE `user_reply` (
  `reply_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `art_id` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`reply_id`),
  KEY `user_idh` (`user_id`),
  KEY `art_id` (`art_id`),
  CONSTRAINT `art_id` FOREIGN KEY (`art_id`) REFERENCES `user_article` (`art_id`),
  CONSTRAINT `user_idh` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user_reply
-- ----------------------------

-- ----------------------------
-- Table structure for `user_review`
-- ----------------------------
DROP TABLE IF EXISTS `user_review`;
CREATE TABLE `user_review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `reply_id` int(11) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8_bin NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `reply_id` (`reply_id`),
  CONSTRAINT `reply_id` FOREIGN KEY (`reply_id`) REFERENCES `user_reply` (`reply_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user_review
-- ----------------------------
