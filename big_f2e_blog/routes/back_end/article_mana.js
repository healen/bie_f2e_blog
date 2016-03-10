var mysqlUtil=require("../../bin/mysql-util");

var md5=require("../../bin/encryption");

var express = require("express");
var captchapng = require('captchapng');
var fs=require("fs");
var router=express.Router();
var GL=require("./global").global;
var path=require("path");

var basename=path.basename(__filename,".js");


router
	.get("/",function(req,res){
		var Db=new mysqlUtil();
		if(req.session.admin){
			console.log(__dirname);

			res.render("back_end/article_list.html",{
				title:"文章管理",//__filename,
				memuName:basename,
				mid:2,
				username:req.session.admin.login_name,
				crumbs:[
					{content:"文章管理",href:null},
					{content:"管理员发布管理",href:null},
					{content:"普通文章",href:null}
				],
				memu:GL(req,res).Memu
			})

		}else{
			res.redirect('/admin/login');
		}
	})

module.exports=router;