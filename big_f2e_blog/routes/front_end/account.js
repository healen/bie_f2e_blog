var mysqlUtil=require("../../bin/mysql-util");
var upPice=require("../../bin/up-pice");
var account=require("../../bin/account");
var date=require("../../bin/date")();
var express = require("express");
var mysql = require("mysql");
var path=require("path");
var multer = require("multer");
var images=require("images");
var upload = multer({ dest:"/temp"});
var router=express.Router();
var static_dir="uploads/";



function render_my(req,res,tpl,title){

	var Db=new mysqlUtil();
		$userSql="SELECT * FROM user WHERE user_id='"+req.session.userid+"'";

		Db.query($userSql,function(data){
			if(!data[0]['account_id']){
				Db.insert("account",{gender:0},function(status){
					Db.modify("user",{user_id:req.session.userid},{account_id:status},function(result){
						console.log(result);
						account.showUserMsg("user","account",req.session.userid,function(msg){
							msg.brithday=msg.brithday!=null ? (msg.brithday).Format("yyyy-MM-dd") : ""
							res.render(tpl,{
								title:title,
								tabtitle:"完善个人资料",
								username:req.session.usermsg ? req.session.usermsg.username : undefined,
								userInfo:msg
							})
							
						});
					})
						
				})
			}else{
				account.showUserMsg("user","account",req.session.userid,function(msg){
					msg.brithday=msg.brithday!=null ? (msg.brithday).Format("yyyy-MM-dd") : ""
					res.render(tpl,{
						title:title,
						tabtitle:"完善个人资料",
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						userInfo:msg
					})
				});
			}
		})
}


router
	/**
	 * 节目请求
	 */
	/*首页暂时未定*/
	.get(/.*/,function(req,res,next){

		if(req.session.usermsg){
			next();
		}else{
			console.log(req.session.usermsg);
			res.render("front_end/msg.html",{
				title:"没有登录",
				status:"没用登录"

			})
		
		}
	})

	.get("/",function(req,res){
		render_my(req,res,"front_end/my.html","个人中心")
	})

	
	.get("/setting",function(req,res){
	
		render_my(req,res,"front_end/account.html","基本设置")
		
	})

	.get("/setting/avater",function(req,res){
	
		render_my(req,res,"front_end/account_setting_avater.html","头像设置")
		
	})


	.get("/setting/info",function(req,res){
	
		render_my(req,res,"front_end/account_setting_info.html","基本信息设置")
		
	})

	.post("/mysave",function(req,res){
		// var data=req.body;
		var id=req.body.account_id;
		var Db=new mysqlUtil();
		var $sql = "UPDATE account SET ";
			$sql += "real_name="+Db.escape(req.body.real_name)+",";
			$sql += "gender="+req.body.gender+",";
			$sql += "brithday="+Db.escape(req.body.brithday)+",";
			$sql += "website="+Db.escape(req.body.website)+",";
			$sql += "location="+Db.escape(req.body.location)+",";
			$sql += "aignature="+Db.escape(req.body.aignature)+",";
			$sql += "weixin="+Db.escape(req.body.weixin)+",";
			$sql += "tel="+Db.escape(req.body.tel)+",";
			$sql += "qq="+Db.escape(req.body.qq)+",";
			$sql += "update_at=NOW() ";
			$sql += " WHERE account_id="+id;
				console.log($sql);
		Db.updateQuery($sql,function(err,result){
			if(err){
				console.log(err);
				res.send("操作失败");
			}else{
				res.send("操作成功");
			}
		})
		// res.json(data)
	})
	.post("/set_avater",upload.single("avater"),function(req,res){
		upPice.upAvater(req,res,"avater/origin","front_end/avater_set.html")
	})

	.post("/set_cover",upload.single("cover"),function(req,res){
		upPice.upCover(req,res,"cover/origin","front_end/cover_set.html")
	})
	.post("/setting_avater",upload.single("avater"),function(req,res){
		upPice.upAvater(req,res,"avater/origin","front_end/avater_setting.html")
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


	.post("/makeCover",function(req,res){
		upPice.cuttingCover(req,res,function(reslut){
			var Db=new mysqlUtil();



			Db.updateQuery("INSERT INTO user_article SET ?",{user_id:req.session.userid,art_pice:reslut})

		})
	})



	.get("/article/:fun",function(req,res){
		if(req.params.fun==="add"){
			res.render("front_end/account_article.html",{
				title:"添加文章"
			})
		}else if(req.params.fun==="edit"){
			res.render("front_end/account_article.html",{
				title:"修改文章"
			})
		}
	})
module.exports=router;



