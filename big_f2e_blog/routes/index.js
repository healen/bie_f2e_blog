var express=require("express");
var router=express.Router();



router.get("/",function(req,res,next){
	res.render("front_end/index")
})

module.exports=router;