/*
Navicat MySQL Data Transfer

Source Server         : mysql_service
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : big_f2e_blog

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-03-13 18:15:09
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
  `admin_info_id` int(11) DEFAULT NULL,
  `login_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`admin_id`),
  KEY `会员基本信息` (`admin_info_id`),
  CONSTRAINT `会员基本信息` FOREIGN KEY (`admin_info_id`) REFERENCES `admin_info` (`admin_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('8', null, 'admin', '8ddcff3a80f4189ca1c9d4d902c3c909', '2016-03-06 23:43:09', '2016-03-06 23:43:09');

-- ----------------------------
-- Table structure for `admin_info`
-- ----------------------------
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info` (
  `admin_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `head_pice` varchar(256) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `describe` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`admin_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of admin_info
-- ----------------------------

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `art_id` int(11) NOT NULL AUTO_INCREMENT,
  `review_id` int(11) DEFAULT '0',
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
  PRIMARY KEY (`art_id`),
  KEY `r` (`review_id`),
  CONSTRAINT `r` FOREIGN KEY (`review_id`) REFERENCES `user_review` (`review_id`)
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
  `username` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '登录名',
  `password` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '登录密码',
  `email` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '邮箱',
  `email_verify` int(11) NOT NULL DEFAULT '0',
  `real_name` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '真实姓名',
  `gender` varchar(5) COLLATE utf8_bin DEFAULT '',
  `birthday` date DEFAULT NULL,
  `website` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '个人网站地址',
  `location` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '住址',
  `aignature` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '签名',
  `weixin` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '微信',
  `avatar` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '角色',
  `is_lock` int(11) DEFAULT '1' COMMENT '是否锁定',
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('35', 'healen', 'dce0fe7698ca225764ab4096f06d0c1d', 'love_web@sina.com', '0', null, '', null, null, null, null, null, null, '1', null, null);
INSERT INTO `user` VALUES ('36', 'hddda', 'dce0fe7698ca225764ab4096f06d0c1d', 'love_web@di.com', '0', null, '', null, null, null, null, null, null, '1', null, null);
INSERT INTO `user` VALUES ('37', 'admin', 'dce0fe7698ca225764ab4096f06d0c1d', 'love_ss@sina.com', '0', null, '', null, null, null, null, null, null, '1', null, null);
INSERT INTO `user` VALUES ('38', 'healen1', 'dce0fe7698ca225764ab4096f06d0c1d', 'dfds@fdf.com', '0', null, '', null, null, null, null, null, null, '1', null, null);
INSERT INTO `user` VALUES ('39', 'heals', 'dce0fe7698ca225764ab4096f06d0c1d', 'love_web@sian.cm', '0', null, '', null, null, null, null, null, null, '1', null, null);
INSERT INTO `user` VALUES ('40', 'healen2', 'dce0fe7698ca225764ab4096f06d0c1d', 'lov@sina.com', '0', null, '', null, null, null, null, null, null, '1', null, null);
INSERT INTO `user` VALUES ('41', 'hfks', 'dce0fe7698ca225764ab4096f06d0c1d', 'fdsf@fdsf.com', '0', null, '', null, null, null, null, null, null, '1', null, null);
INSERT INTO `user` VALUES ('42', 'healen12', 'dce0fe7698ca225764ab4096f06d0c1d', 'fkfjdskfds@ff.com', '0', null, '', null, null, null, null, null, null, '1', null, null);
INSERT INTO `user` VALUES ('43', '123123', '4297f44b13955235245b2497399d7a93', 'zhaoxiao912@126.com', '1', null, '', null, null, null, null, null, null, '1', null, null);

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
  KEY `FK_user_article` (`praise_id`),
  CONSTRAINT `FK_user_article` FOREIGN KEY (`praise_id`) REFERENCES `user_praise` (`praise_id`),
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
  PRIMARY KEY (`praise_id`),
  KEY `FK_user_praise` (`user_id`),
  CONSTRAINT `FK_user_praise` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
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
