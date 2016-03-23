/**
 @Name : big_f2e_blog v1.1 封面视图
 @Author: 张晓东
 @Date: 2016-3-23
 */
var express = require("express");

var router=express.Router();

router
	.get("/",function(req,res){

            
                            res.render("front_end/index.html",{
                                    title:"首页",
                                    username:req.session.usermsg ? req.session.usermsg.username : undefined
                             })

                 
	})

module.exports=router;