/**
 @Name : big_f2e_blog v1.1 个人中心
 @Author: 张晓东
 @Date: 2016-03-23
 */
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
var qs=require("querystring");
var url=require("url");


/*个人信息函数封装*/
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

	/**
	 * 个人中心首页视图
	 */

	.get("/",function(req,res){
		render_my(req,res,"front_end/my.html","个人中心")
	})


	/**
	 * 个人中心基本设置视图
	 */

	.get("/setting",function(req,res){
	
		render_my(req,res,"front_end/account.html","基本设置")
		
	})

	/**
	 * 个人中心设置头像视图
	 */

	.get("/setting/avater",function(req,res){
	
		render_my(req,res,"front_end/account_setting_avater.html","头像设置")
		
	})

	/**
	 * 个人中心基本信息视图
	 */
	.get("/setting/info",function(req,res){
	
		render_my(req,res,"front_end/account_setting_info.html","基本信息设置")
		
	})

	/**
	 * 保存个人信息方法
	 */
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

	/**
	 * 设置头像方法
	 */
	.post("/set_avater",upload.single("avater"),function(req,res){
		upPice.upAvater(req,res,"avater/origin","front_end/avater_set.html")
	})


	/**
	 * 头像设置视图方法
	 */

	.post("/setting_avater",upload.single("avater"),function(req,res){
		upPice.upAvater(req,res,"avater/origin","front_end/avater_setting.html")
	})

	/**
	 * 设置文章封面图方法
	 */

	.post("/set_cover",upload.single("cover"),function(req,res){
		upPice.upCover(req,res,"cover/origin","front_end/cover_set.html")
	})

	/**
	 * 制作头像并入库方法
	 */
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

	/**
	 * 制作封面保存方法
	 */

	.post("/makeCover",function(req,res){
		upPice.cuttingCover(req,res,function(reslut){
			// console.log(reslut);
		})
	})



	/**
	 * 个人中心文章管理视图
	 */

	.get("/article/:fun",function(req,res){

		if(req.params.fun=="add"){
			res.render("front_end/account_article_add.html",{
				title:"添加文章",
				username:req.session.usermsg ? req.session.usermsg.username : undefined,
			});
	
		}else if(req.params.fun=="success"){
			var Db=new mysqlUtil();
			var $sql="SELECT * FROM user_article WHERE article_id="+req.session.articleid;
			Db.query($sql,function(data){
				if(data.indexOf("查询错误")>0){
					Db.close();
					res.render("front_end/account_article_success.html",{
						title:"查询失败",
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						articleid:req.session.articleid
					});
				}else{
					Db.close();

					res.render("front_end/account_article_success.html",{
						title:"文章发布成功",
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						articleid:req.session.articleid
						// articleInfo:data[0]
					});
				}
			})
		
		}else if(req.params.fun==req.session.articleid){
			var Db=new mysqlUtil();
			var $sql="SELECT * FROM user_article WHERE article_id="+req.session.articleid;
			Db.query($sql,function(data){
				if(data.indexOf("查询错误")>0){
					Db.close();
				
					res.render("front_end/account_article_info.html",{
						title:"查询失败",
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						articleid:req.session.articleid
					});
				}else{
					Db.close();
					res.render("front_end/account_article_info.html",{
						title:data[0].title,
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						articleid:req.session.articleid,
						articleInfo:data[0]
					});
				}
			})
	
		}else if(/\d/.test(req.params.fun)){
			var Db=new mysqlUtil();
			var $sql="SELECT * FROM user_article WHERE article_id="+req.params.fun;
			Db.query($sql,function(data){
				if(data.indexOf("查询错误")>0){
					Db.close();
					res.render("front_end/account_article_info.html",{
						title:"查询失败",
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						articleid:req.session.articleid
					});
				}else{
					Db.close();
					res.render("front_end/account_article_info.html",{
						title:data[0].title,
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						articleid:req.session.articleid,
						articleInfo:data[0]
					});
				}
			})
	
		}else if(req.params.fun=="manager"){
			var Db=new mysqlUtil();
			console.log(url.parse(req.url).query);
			// console.log(qs.parse(path.parse(req.url).query).page);
			var pagesize=2;
			var page=qs.parse(url.parse(req.url).query).page;
				page = page==null ? 1 : page;
			var $sql="SELECT * FROM user_article WHERE user_id="+req.session.userid+" LIMIT "+(page-1)*pagesize+","+pagesize;
			var $total="SELECT * FROM user_article WHERE user_id="+req.session.userid;
			var total=0;
			Db.query($total,function(data){
				total=data.length;
			})
			Db.query($sql,function(data){
				if(data.indexOf("查询错误")>0){
					
						res.render("front_end/account_article_manager.html",{
							title:"查询失败",
							username:req.session.usermsg ? req.session.usermsg.username : undefined,
							articleid:req.session.articleid
						});
					}else{

						for(var i=0;i<data.length;i++){
						data[i].create_at=data[i].create_at!=null ? (data[i].create_at).Format("yyyy-MM-dd") : "";
						data[i].update_at=data[i].update_at!=null ? (data[i].update_at).Format("yyyy-MM-dd") : "";

						}
						res.render("front_end/account_article_manager.html",{
							title:"我发布的文章",
							username:req.session.usermsg ? req.session.usermsg.username : undefined,
							articleid:req.session.articleid,
							articleList:data,
							returnurl:"/account"+req.url,
							pageSize:pagesize,
							total:total,
							currentPage:page,
							pathname:"/account"+url.parse(req.url).pathname,
							totalPage:Math.ceil(total/pagesize)
						});
					}
			})
			
		}
	})

	.get("/article/delete/:id",function(req,res){
		var Db=new mysqlUtil();
		Db.remove("user_article",{article_id:req.params.id},function(result){
			res.send(result);
		})
	})



	.get("/article/edit/:id",function(req,res){
		var urls=url.parse(req.url).query;
		var Db=new mysqlUtil();
		var $sql="SELECT * FROM user_article WHERE user_id="+req.session.userid+" AND article_id="+req.params.id;
		Db.query($sql,function(data){
			if(data.indexOf("查询错误")>0){
				res.render("front_end/account_article_edit.html",{
					title:"编辑文章",
					username:req.session.usermsg ? req.session.usermsg.username : undefined

				});
			}else{
				// console.log(req.session.usermsg);
				
				res.render("front_end/account_article_edit.html",{
					title:"编辑文章",
					username:req.session.usermsg ? req.session.usermsg.username : undefined,
					articleInfo:data[0],
					returnurl:qs.parse(urls).returns

				});

			}
		})
	})
	

	.post("/article/:fun",function(req,res){

		if(req.params.fun=="add"){
			var Db=new mysqlUtil();
			Db.insert("user_article",{
				user_id:req.session.userid,
				title:req.body.title,
				tag:req.body.tag,
				from:req.body.from,
				art_pice:req.body.art_pice,
				describe:req.body.describe,
				content:req.body.content,
				create_at:new Date()
			},function(result){
				console.log(result);
				req.session.articleid=result;
				res.send("请求成功")
			})
		}else if(req.params.fun=="edit"){
			var Db=new mysqlUtil();
			Db.modify("user_article",{
				article_id:req.body.acticleid,

			},{
				title:req.body.title,
				tag:req.body.tag,
				from:req.body.from,
				describe:req.body.describe,
				art_pice:req.body.art_pice,
				content:req.body.content,
				update_at:new Date()


			},function(result){
				res.send(result)

			})
		}
		
	})


	/**
	 * 文章管理
	 */

module.exports=router;



