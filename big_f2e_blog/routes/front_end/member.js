var express = require("express");

var router=express.Router();

router
	.get("/register",function(req,res){
		res.render("front_end/register.html",{
			title:"用户注册"

		})
	})

module.exports=router;