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
	 * 6.评论 未登录不能评，登录之后获取 用户名，头像，评论内容，点击头像进入该会员的博客，回复功能通过 @XXX
	 * 
	 * 
	 */
	.get("/:username/:id",function(req,res,next){
		if(req.params.username==null){
			next()
		}else{
			res.send("artilce "+ req.params.username)
		}
		
	})
	
	.get("/:id",function(req,res){
		res.send("artilce ")
	})
module.exports=router;