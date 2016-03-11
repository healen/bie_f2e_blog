var mysqlUtil=require("../../bin/mysql-util");

var md5=require("../../bin/encryption");

var express = require("express");

var router=express.Router();

var captchapng = require('captchapng');

router
	.get("/register",function(req,res){
		res.render("front_end/register.html",{
			title:"用户注册"

		})
	})
	
	.post("/usertesting",function(req,res){
		var data={
			username:req.body.username
		}
		var Db=new mysqlUtil();
		Db.find("user","username='"+data.username+"'",function(result){
			if(result.length==0){
				res.json({code:200,data:result})
				Db.close();
			}else{
				res.json({code:400,data:result})
				Db.close();
			}
		})

	})

	.get("/captcha",function(req,res){

		var captchaNumber=parseInt(Math.random()*9000+1000);
		req.session.userVerify=captchaNumber;
		// console.log(req.session.verify);
		// console.log(__dirname);
		 var p = new captchapng(144,50,req.session.userVerify);
		 p.color(100, 100, 100, 30);
		 p.color(50, 50, 50, 255);
		 var img = p.getBase64();
		 var imgbase64 = new Buffer(img,'base64');
		 res.setHeader( 'Content-Type', 'image/png');
		 res.send(imgbase64)
		 // res.json({code:200,captcha:captchaNumber,pice:img});
	})

	.post("/userVerify",function(req,res){
		var data={
			verify:req.body.verify
		}
		if(data.verify == req.session.userVerify){
			
		}
	})



module.exports=router;