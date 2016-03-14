var mysqlUtil=require("../../bin/mysql-util");

var md5=require("../../bin/encryption");
var sendEmail=require("../../bin/send-email");

var express = require("express");
var router=express.Router();

var captchapng = require('captchapng');

var mysql = require("mysql");

router
	/**
	 * 节目请求
	 */
	/*首页暂时未定*/

	.get(/account.*/,function(req,res,next){

		if(req.session.usermsg){
			next();
		}else{
			res.send("没有登录呢")
		}
	})


	.get("/",function(req,res){
		res.render("front_end/msg.html",{
			title:"个人中心首页",
			username:req.session.usermsg ? req.session.usermsg.username : undefined,
			// email:req.session.usermsg.email
		})
	})





	


	/**
	 * 图片验证码制作
	 */
	.get("/captcha",function(req,res){
		var captchaNumber=parseInt(Math.random()*9000+1000);
		req.session.userVerify=captchaNumber;
		 var p = new captchapng(144,50,req.session.userVerify);
		 p.color(100, 100, 100, 30);
		 p.color(50, 50, 50, 255);
		 var img = p.getBase64();
		 var imgbase64 = new Buffer(img,'base64');
		 res.setHeader( 'Content-Type', 'image/png');
		 res.send(imgbase64)
	})

module.exports=router;



