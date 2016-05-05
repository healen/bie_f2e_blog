/**
 @Name : big_f2e_blog v1.1 文章模块
 @Author: 张晓东
 @Date: 2016-3-23
 */
var express = require("express");
var qs=require("querystring");
var url=require("url");
var mysqlUtil=require("../../bin/mysql-util");
var date=require("../../bin/date")();
var router=express.Router();





router
	/**
	 * 1.访问量+1
	 * 2.读取词条数据的文章
	 * 3.上一条，下一条
	 * 4.评论
	 * 5回复@
	 * 6.评论 未登录不能评，登录之后获取 用户名，头像，评论内容，点击头像进入该会员的博客，回复功能通过 
	 * @XXX
	 */
	.get("/:articleId",function(req,res){
		var Db = new mysqlUtil();
		var $sql="SELECT * FROM user,account WHERE user.user_id="+req.session.userid+" AND user.account_id=account.account_id";
		if(req.session.userid){
			Db.query($sql,function(data){
				res.render("front_end/article_review.html",{
					username:req.session.usermsg ? req.session.usermsg.username : undefined,
					review_article_id:req.params.articleId,
					review_data:data[0]
				})
			})
		}
	})
	.post("/",function(req,res){
		var sendReviewData={
			user_id:req.body.user_id,
            art_id:req.body.art_id,
            content:req.body.content,
            create_at:new Date()
		}

		console.log(sendReviewData);
		var Db=new mysqlUtil();

		Db.insert("user_review",sendReviewData,function(insertId){
			res.json(sendReviewData)
		})	
	})

	.post("/reply",function(req,res){
		var sendReviewData={
			user_id:req.body.user_id,
            art_id:req.body.art_id,
            content:req.body.content,
            create_at:new Date()
		}

		console.log(sendReviewData);
		var Db=new mysqlUtil();

		Db.insert("user_review",sendReviewData,function(insertId){
			res.json(sendReviewData)
		})	
	})

	.get("/article_review_list/:article_id",function(req,res){
		var Db=new mysqlUtil();
		var $reviewSql="SELECT user.username,account.avater,user_review.* FROM user,account,user_review ";
		$reviewSql+="WHERE user_review.user_id=user.user_id AND user.account_id=account.account_id AND user_review.art_id="+req.params.article_id+" ORDER BY create_at DESC";
		var $sql="SELECT * FROM user,account WHERE user.user_id="+req.session.userid+" AND user.account_id=account.account_id";

		Db.query($reviewSql,function(data){
			for(var i=0;i<data.length;i++){
				data[i].create_at=data[i].create_at!=null ? (data[i].create_at).Format("yyyy-MM-dd hh:mm") : "";
				data[i].update_at=data[i].update_at!=null ? (data[i].update_at).Format("yyyy-MM-dd hh:mm") : "";
			}

			if(req.session.userid){
				Db.query($sql,function(review_data){
						res.render("front_end/article_review_list.html",{
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						review_article_id:req.params.articleId,
						list:data,
						review_data:review_data[0]
					})
				})
			}else{
				res.render("front_end/article_review_list.html",{
					list:data
				})
			}
		
		})
	})
module.exports=router;