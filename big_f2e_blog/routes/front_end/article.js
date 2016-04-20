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

function getUserMsg(parUName,parArt,Db,oper,callback){
	var showclome="user.username,user.email,account.job,account.avater,account.aignature,user_article.*";
	var from="user,account,user_article";
	var where="user.username='"+parUName+"' AND user.account_id=account.account_id AND user.user_id=user_article.user_id AND  user_article.article_id"+oper+parArt+"";
	var tool="";

	var $sql="SELECT "+showclome+" FROM "+from+" WHERE "+where+tool;
	Db.updateQuery($sql,function(err,data){
		if(err){
			console.log(err);
			return ;
		}else{
			callback && callback(data)
			// console.log(data);
		}
	})
}
function getArticle(parArt,Db,oper,callback){
	var showclome="user.username,user.email,account.job,account.avater,account.aignature,user_article.*";
	var from="user,account,user_article";
	var where="user.account_id=account.account_id AND user.user_id=user_article.user_id AND  user_article.article_id"+oper+parArt+"";
	var tool="";

	var $sql="SELECT "+showclome+" FROM "+from+" WHERE "+where+tool;
	Db.updateQuery($sql,function(err,data){
		if(err){
			console.log(err);
			return ;
		}else{
			callback && callback(data)
		}
	})
}
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
	.get("/:username/:articleId",function(req,res,next){
		if(req.params.username==null){
			next()
		}else{
			var Db = new mysqlUtil();
			console.log(url.parse(req.url));

			getUserMsg(req.params.username,req.params.articleId,Db,"=",function(datainfo){
				getUserMsg(req.params.username,req.params.articleId,Db,">",function(nextinfo){
					getUserMsg(req.params.username,req.params.articleId,Db,"<",function(previnfo){
						Db.modify("user_article",{article_id:req.params.articleId},{pv:datainfo[0].pv+=1},function(msg){
						})
						for(var i=0;i<datainfo.length;i++){
							datainfo[i].create_at=datainfo[i].create_at!=null ? (datainfo[i].create_at).Format("yyyy-MM-dd") : "";
							datainfo[i].update_at=datainfo[i].update_at!=null ? (datainfo[i].update_at).Format("yyyy-MM-dd") : "";
						}
						res.render("front_end/article.html",{
							title:datainfo[0].title,
							username:req.session.usermsg ? req.session.usermsg.username : undefined,
							userid:req.session.userid ? req.session.userid : undefined,
							artinfo:datainfo[0],
							nextinfo:nextinfo[0] || "wu",
							previnfo:previnfo[0] || "wu",
							paramasusername:req.params.username,
							return_this:url.parse(req.url).href
						})
					});
				});
			});
		}
	})
	.get("/:articleId",function(req,res,next){
		var Db = new mysqlUtil();
		getArticle(req.params.articleId,Db,"=",function(datainfo){
			var pv=datainfo[0].pv
			Db.modify("user_article",{article_id:req.params.articleId},{pv:pv+1},function(msg){
				
			})		
			getArticle(req.params.articleId,Db,">",function(nextinfo){
				getArticle(req.params.articleId,Db,"<",function(previnfo){
					for(var i=0;i<datainfo.length;i++){
						datainfo[i].create_at=datainfo[i].create_at!=null ? (datainfo[i].create_at).Format("yyyy-MM-dd") : "";
						datainfo[i].update_at=datainfo[i].update_at!=null ? (datainfo[i].update_at).Format("yyyy-MM-dd") : "";
					}
					res.render("front_end/article.html",{
						title:datainfo[0].title,
						username:req.session.usermsg ? req.session.usermsg.username : undefined,
						userid:req.session.userid ? req.session.userid : undefined,
						artinfo:datainfo[0],
						nextinfo:nextinfo[0] || "wu",
						previnfo:previnfo[0] || "wu",
						paramasusername:null
					})
				});
			});
		});	
	})
module.exports=router;