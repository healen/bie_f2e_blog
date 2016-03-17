var images=require("images");
var fs=require("fs");
var path=require("path");
var static_dir="uploads/";
exports.upAvater=function(req,res,directory,tpl,tplvar){
	if(req.file==undefined){
			res.json({code:400,msg:"没有选中图片",srcOrigin:"",srcImg:"",srcIco:""});
			fs.unlinkSync(req.file['path']);
		}else{
			// console.log(req.file.width);
			if(req.file['size']>1048576){
				res.json({code:400,"err":"文件过大，建议压缩后在传,建议 1M以内"});
				fs.unlinkSync(req.file['path']);
				return;
			}
			if(req.file.mimetype == "image/png" || req.file.mimetype == "image/gif" || req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/pjpeg" || req.file.mimetype == "image/x-png"){
				var extname=path.extname(req.file['originalname'])
				var timstrap=Date.parse(new Date());

				fs.readFile(req.file['path'],function(err,data){
					if(err){
						res.json({code:400,"err":"服务器读取失败"});
						fs.unlinkSync(req.file['path']);	

					}else{
						fs.writeFile(path.join(static_dir,directory,timstrap+extname), data, function(err,data){
							if(err){
								res.json({code:400,"err":"服务器写入失败"});
								fs.unlinkSync(req.file['path']);
							}else{
								var widths=images(path.join(static_dir,directory,timstrap+extname)).width();
								var maketo
								if(widths>=800){
									maketo=images(path.join(static_dir,directory,timstrap+extname)).resize(800).save(path.join(static_dir,directory,timstrap+extname));
								}else if(widths<=100){
									maketo=images(path.join(static_dir,directory,timstrap+extname)).resize(200).save(path.join(static_dir,directory,timstrap+extname));

								}else{
									maketo=images(path.join(static_dir,directory,timstrap+extname)).save(path.join(static_dir,directory,timstrap+extname));
								}
								if(maketo){
								
									res.render(tpl,{
										src:timstrap+extname,
										data:tplvar
									})
									fs.unlinkSync(req.file['path']);	
								}
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
}


exports.cuttingAvater=function(req,res,callback){
		var x=parseInt(req.body.x);
		var y=parseInt(req.body.y);
		var w=parseInt(req.body.w);
		var h=parseInt(req.body.h);
		var makeInit=images(images(path.join(static_dir,"avater","origin",req.body.pice)),x,y,w,h).resize(w,h).save(path.join(static_dir,"avater","init",req.body.pice));
		var make150=images(images(path.join(static_dir,"avater","origin",req.body.pice)),x,y,w,h).resize(150,150).save(path.join(static_dir,"avater","150x150",req.body.pice));
		var make64=images(images(path.join(static_dir,"avater","origin",req.body.pice)),x,y,w,h).resize(64,64).save(path.join(static_dir,"avater","64x64",req.body.pice));
		var make32=images(images(path.join(static_dir,"avater","origin",req.body.pice)),x,y,w,h).resize(32,32).save(path.join(static_dir,"avater","32x32",req.body.pice));
		if(make32){
			res.send("上传成功")
		}else{
			res.send("大图上传失败")
		}
}