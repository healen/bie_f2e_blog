/**
 @Name : big_f2e_blog v1.1 数据库操作类公用函数
 @Author: 张晓东
 @Date: 2016-3-23
 */
var fs=require("fs");
var sys=require("util");
var path=require("path");


exports.getJson=function(fileName,key){
	var configJson={};
	try{
		var str=fs.readFileSync(path.join(__dirname,fileName), "utf-8");
		configJson=JSON.parse(str);

	}catch(e){

		sys.debug("Json 解析错误")

	}
	return configJson[key];
}