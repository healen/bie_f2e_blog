/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.0.87-community-nt : Database - big_f2e_blog
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`big_f2e_blog` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `big_f2e_blog`;

/*Table structure for table `about` */

DROP TABLE IF EXISTS `about`;

CREATE TABLE `about` (
  `about_id` int(11) NOT NULL auto_increment,
  `pice` varchar(50) collate utf8_bin default NULL,
  `describe` text collate utf8_bin,
  `update` datetime default NULL,
  PRIMARY KEY  (`about_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `about` */

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL auto_increment,
  `real_name` varchar(50) collate utf8_bin default NULL,
  `gender` int(11) NOT NULL default '0',
  `brithday` date default NULL,
  `website` varchar(50) collate utf8_bin default NULL,
  `location` varchar(100) collate utf8_bin default NULL,
  `aignature` varchar(255) collate utf8_bin default NULL,
  `weixin` varchar(25) character set latin1 default NULL,
  `tel` varchar(25) character set latin1 default NULL,
  `qq` varchar(25) character set latin1 default NULL,
  `avater` varchar(50) collate utf8_bin default NULL,
  `is_look` int(11) default '1',
  `create_at` datetime default NULL,
  `update_at` datetime default NULL,
  PRIMARY KEY  (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `account` */

insert  into `account`(`account_id`,`real_name`,`gender`,`brithday`,`website`,`location`,`aignature`,`weixin`,`tel`,`qq`,`avater`,`is_look`,`create_at`,`update_at`) values (6,'张晓东',0,'1988-03-09','qianduango.com','北京','没有什么能够阻挡，你对自由的向往，天马行空的生涯，你的心了无牵挂。。！！','zxd19880209','15600074926','449422301','upice55.png',1,NULL,'2016-03-21 17:53:56');

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL auto_increment,
  `admin_info_id` int(11) default NULL,
  `login_name` varchar(50) collate utf8_bin NOT NULL,
  `password` varchar(50) collate utf8_bin NOT NULL,
  `create_at` datetime NOT NULL default '0000-00-00 00:00:00',
  `update_at` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `admin` */

insert  into `admin`(`admin_id`,`admin_info_id`,`login_name`,`password`,`create_at`,`update_at`) values (8,NULL,'admin','8ddcff3a80f4189ca1c9d4d902c3c909','2016-03-06 23:43:09','2016-03-06 23:43:09');

/*Table structure for table `admin_info` */

DROP TABLE IF EXISTS `admin_info`;

CREATE TABLE `admin_info` (
  `admin_info_id` int(11) NOT NULL auto_increment,
  `head_pice` varchar(256) default NULL,
  `gender` varchar(15) default NULL,
  `birthday` datetime default NULL,
  `describe` varchar(256) default NULL,
  PRIMARY KEY  (`admin_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `admin_info` */

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `article_id` int(11) NOT NULL auto_increment,
  `admin_id` int(11) default NULL,
  `pv` int(11) default '0',
  `top` int(11) NOT NULL default '0',
  `good` int(11) NOT NULL default '0',
  `title` varchar(50) collate utf8_bin default NULL,
  `art_pice` varchar(50) collate utf8_bin default NULL,
  `describe` varchar(150) collate utf8_bin default NULL,
  `content` text collate utf8_bin,
  `tag` varchar(50) collate utf8_bin default NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime default NULL,
  PRIMARY KEY  (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `article` */

/*Table structure for table `friend_links` */

DROP TABLE IF EXISTS `friend_links`;

CREATE TABLE `friend_links` (
  `f_id` int(11) NOT NULL auto_increment,
  `f_link` varchar(50) collate utf8_bin NOT NULL,
  `f_logo` varchar(50) collate utf8_bin default NULL,
  `f_title` varchar(50) collate utf8_bin NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY  (`f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `friend_links` */

/*Table structure for table `os_config` */

DROP TABLE IF EXISTS `os_config`;

CREATE TABLE `os_config` (
  `os_id` int(11) NOT NULL auto_increment,
  `web_host` varchar(50) collate utf8_bin default NULL,
  `web_name` varchar(50) collate utf8_bin default NULL,
  `powerby` varchar(50) collate utf8_bin default NULL,
  `keywords` varchar(150) collate utf8_bin default NULL,
  `description` varchar(150) collate utf8_bin default NULL,
  `beian` varchar(150) collate utf8_bin default NULL,
  `tel` varchar(50) collate utf8_bin default NULL,
  `location` varchar(50) collate utf8_bin default NULL,
  `founder` varchar(50) collate utf8_bin default NULL,
  `update_at` datetime NOT NULL,
  `logo` varchar(50) collate utf8_bin default NULL,
  PRIMARY KEY  (`os_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `os_config` */

/*Table structure for table `tags` */

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `tags_id` int(11) NOT NULL auto_increment,
  `title` varchar(50) collate utf8_bin NOT NULL,
  `describe` varchar(150) collate utf8_bin default NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY  (`tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `tags` */

/*Table structure for table `timeline` */

DROP TABLE IF EXISTS `timeline`;

CREATE TABLE `timeline` (
  `time_id` int(11) NOT NULL auto_increment,
  `start_time` datetime NOT NULL,
  `title` varchar(50) collate utf8_bin NOT NULL,
  `describe` varchar(150) collate utf8_bin default NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY  (`time_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `timeline` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL auto_increment,
  `username` varchar(50) collate utf8_bin NOT NULL COMMENT 'Ã§â„¢Â»Ã¥Â½â€¢Ã¥ÂÂ',
  `password` varchar(50) collate utf8_bin NOT NULL COMMENT 'Ã§â„¢Â»Ã¥Â½â€¢Ã¥Â¯â€ Ã§ Â',
  `email` varchar(50) collate utf8_bin NOT NULL COMMENT 'Ã©â€šÂ®Ã§Â®Â±',
  `email_verify` int(11) NOT NULL default '0',
  `praise_id` int(11) default NULL,
  `account_id` int(11) default NULL,
  `create_at` datetime default NULL,
  `update_at` datetime default NULL,
  PRIMARY KEY  (`user_id`),
  KEY `FK_user` (`account_id`),
  CONSTRAINT `FK_user` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `user` */

insert  into `user`(`user_id`,`username`,`password`,`email`,`email_verify`,`praise_id`,`account_id`,`create_at`,`update_at`) values (55,'healen','dce0fe7698ca225764ab4096f06d0c1d','love_web@sina.com',1,NULL,6,'2016-03-21 16:33:00','2016-03-21 16:45:59');

/*Table structure for table `user_article` */

DROP TABLE IF EXISTS `user_article`;

CREATE TABLE `user_article` (
  `article_id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL,
  `good` int(11) NOT NULL default '0',
  `top` int(11) NOT NULL default '0',
  `pv` int(11) default '0',
  `title` varchar(50) collate utf8_bin NOT NULL,
  `art_pice` varchar(50) collate utf8_bin default NULL,
  `describe` varchar(150) collate utf8_bin default NULL,
  `content` text collate utf8_bin,
  `tag` varchar(50) collate utf8_bin default NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY  (`article_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `user_article` */

/*Table structure for table `user_article_praise` */

DROP TABLE IF EXISTS `user_article_praise`;

CREATE TABLE `user_article_praise` (
  `praise_id` int(11) NOT NULL auto_increment,
  `user_id` int(11) default NULL,
  `article_id` int(11) default NULL,
  `con` int(1) NOT NULL default '0',
  PRIMARY KEY  (`praise_id`),
  KEY `FK_user_praise` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `user_article_praise` */

/*Table structure for table `user_praise` */

DROP TABLE IF EXISTS `user_praise`;

CREATE TABLE `user_praise` (
  `praise_id` int(11) NOT NULL auto_increment,
  `user_id` int(11) default NULL,
  `click_user_id` int(11) default NULL,
  `con` int(1) NOT NULL default '0',
  PRIMARY KEY  (`praise_id`),
  KEY `FK_user_praise` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `user_praise` */

/*Table structure for table `user_reply` */

DROP TABLE IF EXISTS `user_reply`;

CREATE TABLE `user_reply` (
  `reply_id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL,
  `art_id` int(11) NOT NULL,
  `review_id` int(11) default NULL,
  `content` varchar(255) collate utf8_bin default NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY  (`reply_id`),
  KEY `user_idh` (`user_id`),
  KEY `art_id` (`art_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `user_reply` */

/*Table structure for table `user_review` */

DROP TABLE IF EXISTS `user_review`;

CREATE TABLE `user_review` (
  `review_id` int(11) NOT NULL auto_increment,
  `user_id` int(11) default NULL,
  `art_id` int(11) default NULL,
  `content` varchar(255) collate utf8_bin NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY  (`review_id`),
  KEY `reply_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `user_review` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
