var express=require("express");
var fs=require("fs");
var path=require("path");
var multer = require("multer");

var images=require("images")
var router=express.Router();
var static_dir="uploads/";

var upload = multer({ dest:static_dir})





router
	.get("/",function(req,res){
		res.render("front_end/demo.html",{
			title:"图片上传demo"
		})
	})
	.post("/demo",upload.single("avater"),function(req,res){
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
		
		console.log(req.file);
		if(req.file==undefined){
			res.json({code:400,msg:"没有选中图片",srcOrigin:"",srcImg:"",srcIco:""});
			fs.unlinkSync(req.file['path']);
		}else{
			if(req.file['size']>1048576){
				res.json({code:400,"err":"文件过大，建议压缩后在传,建议 1M以内"});
				fs.unlinkSync(req.file['path']);
				return;
			}
			if(req.file.mimetype == "image/png" || req.file.mimetype == "image/gif" || req.file.mimetype == "image/jpeg" ){
				var extname=path.extname(req.file['originalname'])
				var timstrap=Date.parse(new Date());
				console.log(extname);

				fs.readFile(req.file['path'],function(err,data){
					if(err){
						res.json({code:400,"err":"服务器读取失败"});

					}else{
						fs.writeFile(path.join(static_dir,"origin_"+timstrap+extname), data, function(err,data){
							if(err){
								res.json({code:400,"err":"服务器写入失败"});
							}else{
								res.json({code:200,src:"origin_"+timstrap+extname});
								fs.unlinkSync(req.file['path']);
								fs.unlinkSync(req.file['path']);	
							}
						});
					}
				});
		
				

				// var imagedawp=images(req.file['path']).size().save();
				// if(imagedawp){
					
				// }
			}else{
				res.json({code:400,err:"文件格式错误，请传 jpg / png / gif 图"});
			}
		}

	})


module.exports=router