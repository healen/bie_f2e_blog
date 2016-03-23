
/**
 @Name : big_f2e_blog v1.1 加密方法
 @Author: 张晓东
 @Date: 2016-3-23
 */

var crypto=require("crypto");


exports.encryption = function (pass,model){
	var md5=crypto.createHash(model);
	md5.update(pass);
	return md5.digest("hex");
}
