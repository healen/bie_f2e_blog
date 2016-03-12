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