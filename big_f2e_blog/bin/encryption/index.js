var crypto=require("crypto");


exports.encryption = function (pass,model){
	var md5=crypto.createHash(model);
	md5.update(pass);
	return md5.digest("hex");
}
