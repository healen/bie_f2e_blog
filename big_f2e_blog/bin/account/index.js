/**
 @Name : big_f2e_blog v1.1 前台查询会员公共组件
 @Author: 张晓东
 @Date: 2016-3-23
 */
var mysqlUtil=require("../mysql-util");
exports.showUserMsg=function(user,account,id,callback){
	var Db=new mysqlUtil();
	var $sql="SELECT "+user+".username,"+user+".email,"+user+".email_verify,"+user+".praise_id,"+account+".* FROM ";
		$sql+= user+","+account;
		$sql+=" WHERE "+user+"_id="+id+" AND "+user+"."+account+"_id="+account+"."+account+"_id";
	Db.query($sql,function(data){
		callback(data[0])
	})

}