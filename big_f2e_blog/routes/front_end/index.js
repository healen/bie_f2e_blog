var express = require("express");

var router=express.Router();

router
	.get("/ss",function(req,res){
		res.send("sfsd")
	})

module.exports=router;