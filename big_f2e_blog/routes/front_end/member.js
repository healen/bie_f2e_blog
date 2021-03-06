/**
 @Name : big_f2e_blog v1.1 会员管理
 @Author: 张晓东
 @Date: 2016-3-23
 */
var mysqlUtil=require("../../bin/mysql-util");
var md5=require("../../bin/encryption");
var sendEmail=require("../../bin/send-email");
var config=require("../../bin/config")
var mysql = require("mysql");
var captchapng = require('captchapng');
var express = require("express");
var url=require("url");
var qs=require("querystring")
var router=express.Router();
router
	/**
	 * 登录视图
	 */
	.get("/login",function(req,res){
		var urlname=url.parse(req.url).query;
		// console.log(qs.parse(urlname).returns);
		req.session.returns=qs.parse(urlname).returns;
		res.render("front_end/login.html",{
			title:"登录",
			username:req.session.usermsg ? req.session.usermsg.username : undefined
		})
	})
	/**
	 * 登录方法
	 */
	.post("/login",function(req,res){
		var Db=new mysqlUtil();
		loginData={
			username:req.body.username,
			password:req.body.password
		}
		insertData={
			username:req.body.username,
			password:md5.encryption(loginData.password,"md5")

		}
		var reg = {
			username: /\w{4,8}/,
			password: /\w{5,18}/
		}
		if(!reg.username.test(loginData.username)){
			res.json({code:401,msg:"用户名格式错误"});
			
		}else if(!reg.password.test(loginData.password)){
			res.json({code:401,msg:"密码格式错误"});
			
		}else{
			var $sql="SELECT user_id,username,password,email_verify,email FROM user WHERE (username='"+insertData.username+"' or email='"+insertData.username+"' ) AND password='"+insertData.password+"'"
			Db.query($sql,function(data){
				if(data.length >= 1){
					// console.log(data[0]['user_id']);
					req.session.userid=data[0]['user_id'];
					req.session.usermsg={
						username:data[0]['username'],
						password:md5.encryption(data[0]['username'],"md5"),
						email:data[0]['email']
					};
					if(data['email_verify']==0){
						var emaillink1=md5.encryption((Math.random()*9000-1000).toString(),"md5");
						var emaillink2=md5.encryption((Math.random()*9000-1000).toString(),"md5");
						req.session.email_verify="cdvns"+emaillink1+"ANMBSSsfdsjfdsvse"+emaillink2;
					}else{
						req.session.email_verify=null;
					}
					// console.log(req.session.usermsg);
					res.json({code:200,msg:"登录成功正在跳转个人中心",returns:req.session.returns});
					req.session.returns=null;
				}else{
					// console.log("用户名不存在");
					res.json({code:401,msg:"用户名不存在"});
				}

			})

		}
	})

	/**
	 * 退出登录方法
	 */
	.get("/logout",function(req,res){
		req.session.usermsg=undefined;
		req.session.userid=undefined;
		res.render("front_end/login.html",{
			title:"登录"
		})
	})


	/**
	 * 注册视图
	 */
	.get("/register",function(req,res){
	
		res.render("front_end/register.html",{
			title:"注册",
			username:req.session.usermsg ? req.session.usermsg.username : undefined
		})
	})
	/**
	 * 注册方法
	 */
	.post("/register",function(req,res){

		var Db=new mysqlUtil();
		var registerData={
			username:req.body.username,
			password:req.body.password,
			email:req.body.email
		};
		var insertDate = {
			username:registerData.username,
			password:md5.encryption(registerData.password,"md5"),
			email:registerData.email,
			create_at:new Date()
		}
		var reg = {
			username: /\w{4,8}/,
			password: /\w{5,18}/,
			email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
		}
		if(!reg.username.test(registerData.username)){
			res.json({code:401,msg:"用户名格式错误"});
			
		}else if(!reg.password.test(registerData.password)){
			res.json({code:401,msg:"密码格式错误"});
			
		}else if(!reg.email.test(registerData.email)){
			res.json({code:401,msg:"邮箱格式错误"});
			
		}else{
			var $sql="SELECT user_id,username,email FROM user WHERE username='"+registerData.username+"' AND email='"+registerData.email+"'"
			Db.query($sql,function(result){
				if(result.length>0){
					res.json({code:401,data:"用户名被占用"});
					return;
				}else{
					var md5pass=md5.encryption(registerData.password,"md5");
					Db.insert("user",insertDate,function(result){
							req.session.userid=result;
							req.session.usermsg=insertDate;
							res.json({code:200,msg:"注册成功,正在跳转..."});
					})

				}

			})
		}	
	})
	
	/**
	 * 检测用户名是否存在方法
	 */
	
	.post("/usertesting",function(req,res){
		var data={
			username:req.body.username
		}
		var Db=new mysqlUtil();

		Db.query("")

		Db.query("SELECT username,email FROM user WHERE username='"+data.username+"' or email='"+data.username+"'",function(arr){
			if(arr.length==0){
				res.json({code:200,data:arr});
				Db.close();
			}else{
				res.json({code:400,data:arr});
				Db.close();
			}
		})
	})

	/**
	 * 验证邮箱是否被注册过方法
	 */
	.post("/emailtesting",function(req,res){
		// console.log(req.host);
		var Db=new mysqlUtil();
		var data = {
			email:req.body.email
		}
		Db.query("SELECT email FROM user WHERE email='"+data.email+"'",function(arr){
			if(arr.length==0){
				res.json({code:200,data:arr});
				Db.close();
			}else{
				res.json({code:400,data:arr});
				Db.close();
			}
		})
	})

	/**
	 * 图片验证码方法
	 */
	
	.post("/userVerify",function(req,res){
		var data={
			verify:req.body.verify
		}
		if(data.verify == req.session.userVerify){
			res.json({code:200})
		}else{
			res.json({code:400})
		}
	})

	/**
	 * 邮箱验证发送邮件
	 */
	.get("/email_verify",function(req,res){
		var emaillink1=md5.encryption((Math.random()*9000-1000).toString(),"md5");
		var emaillink2=md5.encryption((Math.random()*9000-1000).toString(),"md5");
		req.session.email_verify="cdvns"+emaillink1+"ANMBSSsfdsjfdsvse"+emaillink2;
		sendEmail(req.session.usermsg.email,"您好欢迎注册大前端之家","请点击： <a href='"+config.website+"/member/email_verify/"+req.session.email_verify+"' style='background:#3fd4bb;color:#ffffff'>验证邮箱</a> 或者复制如下链接在浏览器里打开<br />"+config.website+"/member/email_verify/"+req.session.email_verify,function(result){
			res.json({
				msg:"恭喜你验证邮件已经发送成功！"
			})
		})
	})



	/**
	 * 邮箱验证结果视图
	 */


	.get("/email_verify/:id",function(req,res,next){
		if(req.params.id==req.session.email_verify){
			Db=new mysqlUtil();
			Db.modify("user",{user_id:req.session.userid},{email_verify:1 },function(result){
				req.session.email_verify=null;

				res.render("front_end/email_success.html",{
					title:"邮箱验证成功",
					username:req.session.usermsg ? req.session.usermsg.username : undefined,
					status:"验证成功"
				})
			})
		}else{
			res.send("验证超时")
		}
	})

	/**
	 *忘记密码视图
	 */
	.get("/find_password",function(req,res){
		res.render("front_end/find_password.html",{
			title:"找回密码，只需三步"
		})

	})
	/**
	 * 找回密码方法
	 */
		
	.post("/find_password/send",function(req,res){

		var Db=new mysqlUtil();
		var $sql="SELECT user_id,username,email,email_verify FROM user WHERE username='"+req.body.username+"' AND email='"+req.body.email+"'";

		Db.query($sql,function(result){
			if(result.length==0){
			res.json({code:401,msg:"用户名不存在"});
			}else if(result[0]['email_verify']==0){
				res.json({code:402,msg:"不好意思由于您，注册的时候没有验证邮箱，密码找不回来了，请联系管理员，管理员QQ：449422301"});
			}else{
				var emaillink1=md5.encryption((Math.random()*9000-1000).toString(),"md5");
				req.session.find_password_urlstr="passwordurls"+emaillink1+"sfsdkundsNFDS"
				req.session.userid=result[0]['user_id'];
				sendEmail(req.body.email,"大前端之家。找回密码","点击：<a href='"+config.website+"/member/find_password_start/"+req.session.find_password_urlstr+"' style='background:#3fd4bb;color:#ffffff'>找回密码</a>或者复制下面链接在浏览器里打开<br />"+config.website+"/member/find_password_start/"+req.session.find_password_urlstr ,function(result){
					res.json({code:200,msg:"邮件发送成功"})
			})	
			}
		})
	})
	
	/**
	 * 填写找回密码信息视图
	 */

	.get("/find_password_start/:msg",function(req,res){

		if(req.params.msg==req.session.find_password_urlstr){

			res.render("front_end/find_password_start.html",{
				title:"找回密码，信息填写"
			})
		}
	})

	/**
	 * 通过邮件重置密码方法
	 */

	.post("/confirmPassword",function(req,res){
		var Db=new mysqlUtil();
		$sql="UPDATE user SET password='"+md5.encryption(req.body.password,"md5")+"', update_at=NOW()  WHERE user_id="+req.session.userid ;
		Db.updateQuery($sql,function(err,result){
			if(err){
				res.json({code:401,msg:"密码修改失败！！"+err});
			}else{
				res.json({code:200,msg:"密码修改成功,请使用新密码"});
		
			}
		})
	})


	/**
	 * 修改密码视图
	 */
	.get("/reset_password",function(req,res){
			res.render("front_end/reset_password.html",{
				title:"修改密码",
				username:req.session.usermsg ? req.session.usermsg.username : undefined,
			})
	})

	/**
	 * 会员修改密码方法
	 */

	.post("/reset_password",function(req,res){
		var user_id=req.session.userid;
		var Db=new mysqlUtil();
		$sql="UPDATE user SET password='"+md5.encryption(req.body.password,"md5")+"', update_at=NOW() WHERE user_id="+user_id+" AND password='"+md5.encryption(req.body.originPassword,"md5")+"'";
		// console.log($sql);

		Db.updateQuery($sql,function(err,result){
			if(err){
				res.json({code:401,msg:"密码修改失败！！"+err});
			}else{
				res.json({code:200,msg:"密码修改成功,请使用新密码"});
			}
			// console.log(result);
		})
	})
	/**
	 * 图片验证码制作
	 */
	.get("/captcha",function(req,res){
		var captchaNumber=parseInt(Math.random()*9+1);
		req.session.userVerify=captchaNumber;
		 var p = new captchapng(144,50,req.session.userVerify);
		 p.color(100, 100, 100, 30);
		 p.color(50, 50, 50, 255);
		 var img = p.getBase64();
		 var imgbase64 = new Buffer(img,'base64');
		 res.setHeader( 'Content-Type', 'image/png');
		 // console.log(captchaNumber);
		 res.send(imgbase64)
	})

module.exports=router;



