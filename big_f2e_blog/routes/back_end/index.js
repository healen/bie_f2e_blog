var mysqlUtil=require("../../bin/mysql-util");

var md5=require("../../bin/encryption");

var express = require("express");
var captchapng = require('captchapng');
var fs=require("fs");
var router=express.Router();
var GL=require("./global").global;
// var basename=path.basename(__filename,".js");
// var fs=require("fs")
router
	
	/*渲染管理首页*/
	.get("/",function(req,res){
		// console.log(req.session.admin);
		if(req.session.admin){
			console.log(GL(req,res).Memu);
			res.render("back_end/home",{
				title:"管理首页",
				username:req.session.admin.login_name,
				home:"1",
				mid:0,
				memuName:"home",
				memu:GL(req,res).Memu
			})

		}else{
			res.redirect('/admin/login');
		}
	})
	/*渲染管理首页*/
	.get("/home",function(req,res){
		// console.log(req.session.admin);
		if(req.session.admin){
			console.log(GL(req,res).Memu);
			res.render("back_end/home",{
				title:"管理首页",
				username:req.session.admin.login_name,
				home:"1",
				mid:0,
				memuName:"home",
				memu:GL(req,res).Memu
			})

		}else{
			res.redirect('/admin/login');
		}
	})

	/*退出功能设定*/
	.get("/logout",function(req,res){
		req.session.admin=null;
		res.redirect('/admin/login');
	})
	/*登录页面设定*/
	.get("/login",function(req,res){

		if(!req.session.admin){
			res.render("back_end/login",{
				title:"后台管理系统登录",
			});
			
		}else{
			res.redirect("/admin");
			
		}
	})

	/*获取验证码*/
	.get("/verify",function(req,res){
		res.send(req.session.verify.toString());
	})

	/*图片*/
	.get("/captcha",function(req,res){

		var captchaNumber=parseInt(Math.random()*9000+1000);
		req.session.verify=captchaNumber;
		// console.log(req.session.verify);
		// console.log(__dirname);
		 var p = new captchapng(144,50,req.session.verify);
		 p.color(255, 255, 255, 30);
		 p.color(65, 219, 185, 255);
		 var img = p.getBase64();
		 var imgbase64 = new Buffer(img,'base64');
		 res.setHeader( 'Content-Type', 'image/png');
		 res.send(imgbase64)
		 // res.json({code:200,captcha:captchaNumber,pice:img});
	})

router
	.post("/login",function(req,res){
		var Db=new mysqlUtil();
		var admin_data={
			login_name:req.body.login_name,
			password:req.body.password
		}

		Db.find("admin","login_name='"+req.body.login_name+"' and password='"+md5.encryption(req.body.password,"md5")+"'",function(results){
			if(results.length!=0){
				// console.log(req.session.verify + " " +req.body.verify);
				if(req.body.verify == req.session.verify){
					req.session.admin=admin_data;
					res.json({msg:"ok",code:200});
				}else{
					res.json({msg:"验证码错误",code:400});
				}
			}else{
				res.json({msg:"用户名不错在或密码错误"+results,code:400});
			}
		})
	});

module.exports=router

