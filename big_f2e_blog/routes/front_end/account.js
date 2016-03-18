var mysqlUtil=require("../../bin/mysql-util");
var upPice=require("../../bin/up-pice");
var account=require("../../bin/account");
var express = require("express");
var mysql = require("mysql");
var path=require("path");
var multer = require("multer");
var images=require("images");
var upload = multer({ dest:"/temp"});
var router=express.Router();
var static_dir="uploads/";

router
	/**
	 * 节目请求
	 */
	/*首页暂时未定*/

	.get(/.*/,function(req,res,next){

		if(req.session.usermsg){
			next();

		}else{
			res.render("front_end/msg.html",{
				title:"没有登录",
				status:"没用登录"

			})
		
		}
	})


	.get("/",function(req,res){
		// console.log(req.session.userid);
		var Db=new mysqlUtil();
		$userSql="SELECT * FROM user WHERE user_id='"+req.session.userid+"'";

		Db.query($userSql,function(data){
			if(!data[0]['account_id']){
				Db.insert("account",{gender:0},function(status){
					Db.modify("user",{user_id:req.session.userid},{account_id:status},function(result){
						console.log(result);
						account.showUserMsg("user","account",req.session.userid,function(msg){
							res.render("front_end/account.html",{
								title:"个人中心",
								tabtitle:"完善个人资料",
								username:req.session.usermsg ? req.session.usermsg.username : undefined,
								userInfo:msg
							})
							
						});
					})
						
				})
			}else{
				account.showUserMsg("user","account",req.session.userid,function(msg){
					res.render("front_end/account.html",{
						title:"个人中心首页",
						tabtitle:"完善个人资料",
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						userInfo:msg
					})
				});
			}
		})
	})

	.post("/set_avater",upload.single("avater"),function(req,res){
		upPice.upAvater(req,res,"avater/origin","front_end/avater_set.html")
	})
	.post("/makeMmg",function(req,res){
		upPice.cuttingAvater(req,res,function(reslut){
			var Db=new mysqlUtil();
			$userSql="SELECT * FROM user WHERE user_id='"+req.session.userid+"'";

			Db.query($userSql,function(data){
				var account_id=data[0]['account_id'];
				Db.modify("account",{account_id:account_id},{avater:reslut},function(){
					console.log("入库成功");

				})
			})

		})

	})
module.exports=router;



