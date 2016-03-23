/**
 @Name : big_f2e_blog v1.1 上传图片demo
 @Author: 张晓东
 @Date: 2016-3-23
 */
var express=require("express");
var path=require("path");
var multer = require("multer");
var images=require("images")
var router=express.Router();
var static_dir="uploads/";
var upPice=require("../../bin/up-pice");
var upload = multer({ dest:"/temp"})
router
	.get("/",function(req,res){
		res.render("front_end/demo.html",{
			title:"图片上传demo"
		})
	})
	.post("/demo",upload.single("avater"),function(req,res){
		upPice.upAvater(req,res,"avater/origin","front_end/avater_set.html")
	})
	.post("/makeMmg",function(req,res){
		upPice.cuttingAvater(req,res)
	})
module.exports=router