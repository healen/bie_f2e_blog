var url=require("url");
var qs=require("querystring");

exports.limitpage=function(req,pagesize){
	var page=qs.parse(url.parse(req.url).query).page
		page = page==null ? 1 : page
	return " LIMIT "+(page-1)*pagesize+","+pagesize
}