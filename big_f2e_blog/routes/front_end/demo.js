var express=require("express");

var router=express.Router();

var path=require("path");

var static_dir="uploads/";
var fs=require("fs");

var multer = require("multer");
var upload = multer({ dest:static_dir})





router
	.get("/",function(req,res){
		res.render("front_end/demo.html",{
			title:"图片上传demo"
		})

	})
	.post("/demo",upload.single("recfile"),function(req,res){
		// var src=req.body.src;
		// 
		/**
		 * 支持格式
		 * png image/png
		 * gif image/gif
		 * jpg image/jpeg
		 * 
		 * maxsize 1048576
		 */
		if(req.file==undefined){
			res.json({code:400,msg:"没有选中图片",srcOrigin:"",srcImg:"",srcIco:""});
		}else{
			if(req.file['size']>1048576){
				res.json({"err":"文件过大，建议压缩后在传,建议 1M以内"});
				return;
			}

			if(req.file.mimetype == "image/png" || req.file.mimetype == "image/gif" || req.file.mimetype == "image/jpeg" ){
				var extname=path.extname(req.file['originalname'])
				res.json({src:"1"});
				console.log(extname);
			}else{
				res.json({err:"文件格式错误，请传 jpg / png / gif 图"});
			}
		}	
	})


module.exports=router