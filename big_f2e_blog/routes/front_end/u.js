/**
 @Name : big_f2e_blog v1.1 封面视图
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

	.get("/",function(req,res){
		var pagesize=2;
		var page=qs.parse(url.parse(req.url).query).page;
			page = page==null ? 1 : page;
		var Db=new mysqlUtil();

		var $sql="SELECT user.username,user.email,user.create_at,account.* FROM user,account WHERE user.account_id=account.account_id LIMIT "+(page-1)*pagesize+","+pagesize;

			var $total="SELECT * FROM user";
			var total=0;
			Db.query($total,function(data){
				total=data.length;
			})


		Db.query($sql,function(data){
			res.render("front_end/ulist.html",{
	            title:"会员列表",
	            username:req.session.usermsg ? req.session.usermsg.username : undefined,
	            userlist:data,
	            returnurl:"/account"+req.url,
				pageSize:pagesize,
				total:total,
				currentPage:page,
				pathname:"/u"+url.parse(req.url).pathname,
				totalPage:Math.ceil(total/pagesize)
	        })

		})
	})
module.exports=router;