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

insert  into `user`(`user_id`,`username`,`password`,`email`,`email_verify`,`praise_id`,`account_id`,`create_at`,`update_at`) values (55,'healen','72371e47cba0b359cacb676b813c4d72','love_web@sina.com',1,NULL,6,'2016-03-21 16:33:00','2016-03-22 09:52:44');

/*Table structure for table `user_article` */

DROP TABLE IF EXISTS `user_article`;

CREATE TABLE `user_article` (
  `article_id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL,
  `good` int(11) NOT NULL default '0',
  `top` int(11) NOT NULL default '0',
  `pv` int(11) default '0',
  `title` varchar(50) collate utf8_bin NOT NULL,
  `from` varchar(50) collate utf8_bin default NULL,
  `art_pice` varchar(50) collate utf8_bin default NULL,
  `describe` varchar(150) collate utf8_bin default NULL,
  `content` text collate utf8_bin,
  `tag` varchar(50) collate utf8_bin default NULL,
  `create_at` datetime default NULL,
  `update_at` datetime default NULL,
  PRIMARY KEY  (`article_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `user_article` */

insert  into `user_article`(`article_id`,`user_id`,`good`,`top`,`pv`,`title`,`from`,`art_pice`,`describe`,`content`,`tag`,`create_at`,`update_at`) values (4,55,0,0,0,'Grunt JavaScript 世界的构建工具','','1458711358000.png','一句话：自动化。对于需要反复重复的任务，例如压缩（minification）、编译、单元测试、linting等，自动化工具可以减轻你的劳动，简化','<h1 style=\"font-family:Lato, sans-serif;color:#453015;font-size:32px;\">\n	快速入门\n</h1>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n	Grunt和 Grunt 插件是通过&nbsp;<a href=\"https://npmjs.org/\">npm</a>&nbsp;安装并管理的，npm是&nbsp;<a href=\"http://nodejs.org/\">Node.js</a>&nbsp;的包管理器。\n</p>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n	<em>Grunt 0.4.x 必须配合Node.js&nbsp;&gt;= 0.8.0版本使用。；奇数版本号的 Node.js 被认为是不稳定的开发版。</em>\n</p>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n	在安装 Grunt 前，请确保当前环境中所安装的&nbsp;<a href=\"https://npmjs.org/\">npm</a>&nbsp;已经是最新版本，执行&nbsp;npm update -g npm&nbsp;指令进行升级（在某些系统中可能需要&nbsp;sudo&nbsp;指令）。\n</p>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n	如果你已经安装了 Grunt，现在需要参考一些文档手册，那就请看一看&nbsp;<a href=\"http://www.gruntjs.net/sample-gruntfile\">Gruntfile&nbsp;实例</a>&nbsp;和如何&nbsp;<a href=\"http://www.gruntjs.net/configuring-tasks\">配置任务</a>吧。\n</p>\n<h2 style=\"font-family:Lato, sans-serif;color:#6F5A40;font-size:24px;\">\n	<a class=\"anchor\" href=\"http://www.gruntjs.net/getting-started#cli\" name=\"cli\">安装 CLI</a>\n</h2>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n	<strong>还在使用 Grunt 0.3 版本吗？请查看&nbsp;<a href=\"http://www.gruntjs.net/upgrading-from-0.3-to-0.4#grunt-0.3-notes\">Grunt 0.3 注意事项</a></strong>\n</p>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n	在继续学习前，你需要先将Grunt命令行（CLI）安装到全局环境中。安装时可能需要使用sudo（针对OSX、*nix、BSD等系统中）权限或者作为管理员（对于Windows环境）来执行以下命令。\n</p>\n<pre>npm install -g grunt-cli</pre>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n	上述命令执行完后，grunt&nbsp;命令就被加入到你的系统路径中了，以后就可以在任何目录下执行此命令了。\n</p>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n	注意，安装grunt-cli并不等于安装了 Grunt！Grunt CLI的任务很简单：调用与Gruntfile在同一目录中 Grunt。这样带来的好处是，允许你在同一个系统上同时安装多个版本的 Grunt。\n</p>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n	这样就能让多个版本的 Grunt 同时安装在同一台机器上。\n</p>\n<p style=\"color:#6F5A40;font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;font-size:16px;\">\n<pre class=\"prettyprint lang-js\">module.exports = function(grunt) {\n\n  // Project configuration.\n  grunt.initConfig({\n    pkg: grunt.file.readJSON(\'package.json\'),\n    uglify: {\n      options: {\n        banner: \'/*! &lt;%= pkg.name %&gt; &lt;%= grunt.template.today(\"yyyy-mm-dd\") %&gt; */\\n\'\n      },\n      build: {\n        src: \'src/&lt;%= pkg.name %&gt;.js\',\n        dest: \'build/&lt;%= pkg.name %&gt;.min.js\'\n      }\n    }\n  });\n\n  // 加载包含 \"uglify\" 任务的插件。\n  grunt.loadNpmTasks(\'grunt-contrib-uglify\');\n\n  // 默认被执行的任务列表。\n  grunt.registerTask(\'default\', [\'uglify\']);\n\n};</pre>\n</p>','javascript,nodejs,grunt','2016-03-23 13:36:44',NULL),(18,55,0,0,0,'Gulp 用自动化构建工具增强你的工作流程！','原创','1458717413000.png','通过代码优于配置的策略，Gulp 让简单的任务简单，复杂的任务可管理。','<h1 style=\"font-size:36px;font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-weight:500;color:#333333;background-color:#FFFFFF;\">\n	入门指南\n</h1>\n<h4 style=\"font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-weight:500;color:#333333;font-size:18px;background-color:#FFFFFF;\">\n	1. 全局安装 gulp：\n</h4>\n<pre>$ npm install --global gulp</pre>\n<h4 style=\"font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-weight:500;color:#333333;font-size:18px;background-color:#FFFFFF;\">\n	2. 作为项目的开发依赖（devDependencies）安装：\n</h4>\n<pre>$ npm install --save-dev gulp</pre>\n<h4 style=\"font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-weight:500;color:#333333;font-size:18px;background-color:#FFFFFF;\">\n	3. 在项目根目录下创建一个名为&nbsp;gulpfile.js&nbsp;的文件：\n</h4>\n<pre><span class=\"hljs-keyword\" style=\"color:#F92672;\">var</span> gulp = <span class=\"hljs-built_in\" style=\"color:#E6DB74;\">require</span>(<span class=\"hljs-string\" style=\"color:#E6DB74;\">\'gulp\'</span>);\n\ngulp.task(<span class=\"hljs-string\" style=\"color:#E6DB74;\">\'default\'</span>, <span class=\"hljs-function\" style=\"color:#F92672;\"><span class=\"hljs-keyword\" style=\"color:#66D9EF;\">function</span><span class=\"hljs-params\" style=\"color:#F8F8F2;\">()</span> </span>{ <span class=\"hljs-comment\" style=\"color:#75715E;\">// 将你的默认的任务代码放在这</span> });</pre>\n<h4 style=\"font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-weight:500;color:#333333;font-size:18px;background-color:#FFFFFF;\">\n	4. 运行 gulp：\n</h4>\n<pre>$ gulp</pre>\n<p style=\"color:#333333;font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-size:16px;background-color:#FFFFFF;\">\n	默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。\n</p>\n<p style=\"color:#333333;font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-size:16px;background-color:#FFFFFF;\">\n	想要单独执行特定的任务（task），请输入&nbsp;gulp &lt;task&gt; &lt;othertask&gt;。\n</p>\n<h2 style=\"font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-weight:500;color:#333333;font-size:30px;background-color:#FFFFFF;\">\n	下一步做什么呢？\n</h2>\n<p style=\"color:#333333;font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-size:16px;background-color:#FFFFFF;\">\n	你已经安装了所有必要的东西，并且拥有了一个空的 gulpfile。那怎样才算是__真的__入门了呢？可以查看这些&nbsp;<a href=\"http://www.gulpjs.com.cn/docs/recipes/\">秘籍</a>&nbsp;和这个&nbsp;<a href=\"http://www.gulpjs.com.cn/docs/#articles/\">文章列表</a>&nbsp;来学习更多的内容。\n</p>\n<h2 style=\"font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-weight:500;color:#333333;font-size:30px;background-color:#FFFFFF;\">\n	.src, .watch, .dest, CLI 参数 - 我该怎么去用这些东西呢？\n</h2>\n<p style=\"color:#333333;font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-size:16px;background-color:#FFFFFF;\">\n	要了解 API 规范文档，请查看&nbsp;<a href=\"http://www.gulpjs.com.cn/docs/api/\">API 文档</a>.\n</p>\n<h2 style=\"font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-weight:500;color:#333333;font-size:30px;background-color:#FFFFFF;\">\n	可用的插件\n</h2>\n<p style=\"color:#333333;font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-size:16px;background-color:#FFFFFF;\">\n	gulp 开发社区正在快速成长，每天都会有新的插件诞生。在&nbsp;<a href=\"http://gulpjs.com/plugins/\" target=\"_blank\">主站</a>&nbsp;上可以查看完整的列表。\n</p>\n<p style=\"color:#333333;font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-size:16px;background-color:#FFFFFF;\">\n	<img src=\"/uploads/upload_0efec2ae4101feeb9050168256a856a2.png\" width=\"300\" height=\"144\" alt=\"\" />\n</p>\n<p style=\"color:#333333;font-family:\'Helvetica Neue\', Helvetica, \'Lucida Grande\', Arial, \'Hiragino Sans GB\', \'Microsoft Yahei\', \'WenQuanYi Micro Hei\', sans-serif;font-size:16px;background-color:#FFFFFF;\">\n<pre class=\"prettyprint lang-js\">/*引入插件*/\nvar gulp=require(\"gulp\"),\n    less=require(\"gulp-less\"),\n    clean=require(\"gulp-clean\");\n/*task任务编译LESS*/\ngulp.task(\"less\",[\"clean\"],function(){\n    gulp.src(\"./Mosa/less/*.less\")\n        .pipe(less({compress: false}))\n        .on(\"error\",function(e){console.log(e)})\n        .pipe(gulp.dest(\"./static/css/\"));\n});\n/*清理CSS*/\ngulp.task(\"clean\", function(){\n    gulp.src(\"./static/css/*.css\", { read:true })\n        .pipe(clean());\n});\n\n/*监考任务*/\ngulp.task(\'watch\', function () {\n   gulp.watch(\'./Mosa/**/*.less\',function(){\n     gulp.run(\'less\',\'clean\',\'watch\');\n   });\n});\n\n\n/*自动跑任务*/\ngulp.task(\'default\',function(){\n    gulp.run(\'less\',\'clean\',\'watch\');\n})\n\ngulp.task(\'copy\',function(){\n    var fs = require( \'fs\' ),\n    stat = fs.stat;\n    /*\n     * 复制目录中的所有文件包括子目录\n     * @param{ String } 需要复制的目录\n     * @param{ String } 复制到指定的目录\n     */\n    var copy = function( src, dst ){\n        // 读取目录中的所有文件/目录\n        fs.readdir( src, function( err, paths ){\n            if( err ){\n                throw err;\n            }\n            paths.forEach(function( path ){\n                var _src = src + \'/\' + path,\n                    _dst = dst + \'/\' + path,\n                    readable, writable;       \n                stat( _src, function( err, st ){\n                    if( err ){\n                        throw err;\n                    }\n                    // 判断是否为文件\n                    if( st.isFile() ){\n                        // 创建读取流\n                        readable = fs.createReadStream( _src );\n                        // 创建写入流\n                        writable = fs.createWriteStream( _dst );   \n                        // 通过管道来传输流\n                        readable.pipe( writable );\n                    }\n                    // 如果是目录则递归调用自身\n                    else if( st.isDirectory() ){\n                        exists( _src, _dst, copy );\n                    }\n                });\n            });\n        });\n    };\n    // 在复制目录前需要判断该目录是否存在，不存在需要先创建目录\n    var exists = function( src, dst, callback ){\n        fs.exists( dst, function( exists ){\n            // 已存在\n            if( exists ){\n                callback( src, dst );\n            }\n            // 不存在\n            else{\n                fs.mkdir( dst, function(){\n                    callback( src, dst );\n                });\n            }\n        });\n    };\n    // 复制目录\n    exists( \'./pages\', \'./build/pages/\', copy );\n    exists( \'./static\', \'./build/static/\', copy );\n  \n})</pre>\n</p>','javascript,gulp','2016-03-23 15:18:50',NULL),(19,55,0,0,0,'','','','','','','2016-03-23 15:37:08',NULL),(20,55,0,0,0,'FK','KFSDJK','1458719307000.png','FKSDJ','<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">使用示例&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 1、ejs.compile(str, options); 将返回内部解析好的Function函数&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 2、ejs.render(str, options); 返回经过解析的字符串&nbsp;</span><br />\n<br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 其中options的一些参数为：&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 1、cache：是否缓存解析后的模版，需要filename作为key；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 2、filename：模版文件名；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 3、scope：complile后的Function执行所在的上下文环境；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 4、debug：标识是否是debeg状态，debug为true则会输出生成的Function内容；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 5、compileDebug：标识是否是编译debug，为true则会生成解析过程中的跟踪信息，用于调试；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 6、client，标识是否用于浏览器客户端运行，为true则返回解析后的可以单独运行的Function函数；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 7、open，代码开头标记，默认为\'&lt;%\'；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 8、close，代码结束标记，默认为\'%&gt;\'；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 9、其他的一些用于解析模版时提供的变量。&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 在express中使用时，options参数将由response.render进行传入，其中包含了一些express中的设置，以及用户提供的变量值。&nbsp;</span><br />\n<br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 此外ejs还提供了一些辅助函数，用于代替使用javascript代码，使得更加方便的操纵数据。&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 1、first，返回数组的第一个元素；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 2、last，返回数组的最后一个元素；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 3、capitalize，返回首字母大写的字符串；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 4、downcase，返回字符串的小写；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 5、upcase，返回字符串的大写；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 6、sort，排序（Object.create(obj).sort()？）；&nbsp;</span><br />\n<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 7、sort_by:\'prop\'，按照指定的prop属性进行升序排序；&nbsp;</span><br />\n<p>\n	<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">&nbsp;&nbsp;&nbsp; 8、size，返回长度，即length属性，不一定非是数组才行；&nbsp;</span>\n</p>\n<p>\n	<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\"><br />\n</span>\n</p>\n<p>\n	<span style=\"font-family:Helvetica, Tahoma, Arial, sans-serif;font-size:14px;line-height:25.2000007629395px;background-color:#FFFFFF;\">\n<pre class=\"prettyprint lang-js\">    fix : function(){\n        jQuery(\':input[placeholder]\').each(function(index, element) {\n            var self = $(this), txt = self.attr(\'placeholder\');\n            if(self.val().length==0){\n                self.val(txt).addClass(\"placehoder\");\n            }\n            self.focus(function(){\n                if($(this).val()==txt){\n                     var par=$(this).parent();\n                    $(this).val(\"\").removeClass(\"placehoder\");\n                }\n            })\n            self.blur(function(){\n                if($(this).val()==\"\"){\n                     if($(this).attr(\"type\")==\"password\"){\n                        var par=$(this).parent();\n                    }\n                    self.val(txt).addClass(\"placehoder\");\n                }\n                 \n            })\n\n        });\n    }\n};</pre>\n<br />\n</span>\n</p>','FDKS','2016-03-23 15:50:52',NULL),(21,55,0,0,0,'11','','','','11','','2016-03-23 16:03:15',NULL),(22,55,0,0,0,'发生大发','','','','范德萨','','2016-03-23 16:08:31',NULL),(23,55,0,0,0,'发','','','','方法','','2016-03-23 16:12:43',NULL),(24,55,0,0,0,'发士大夫士大夫','发送到发的发','','发送到发送到','发生大发','法第三方','2016-03-23 16:13:12',NULL),(25,55,0,0,0,'法第三方','','','','富士达','','2016-03-23 16:13:23',NULL),(26,55,0,0,0,'f','f','','f','f','f','2016-03-23 17:52:55',NULL),(27,55,0,0,0,'ff','','','ff','fff','','2016-03-23 18:03:53',NULL);

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
