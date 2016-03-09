// var mysqlUtil=require("../../bin/mysql-util");
// var Db=new mysqlUtil();
var md5=require("../../bin/encryption");

var express = require("express");
var captchapng = require('captchapng');
var fs=require("fs");
var router=express.Router();

router
	.get("/articles",function(req,res){
		res.render("back_end/article_list.html",{
			title:"ffdsfds",
			username:req.session.admin.login_name,
			crumbs:[
				{content:"文章管理",href:null},
				{content:"管理员发布管理",href:null},
				{content:"普通文章",href:null}

			]
		})

	})

module.exports=router;