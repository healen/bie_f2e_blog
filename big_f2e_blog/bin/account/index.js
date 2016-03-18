var mysqlUtil=require("../mysql-util");
exports.showUserMsg=function(user,account,id,callback){
	var Db=new mysqlUtil();
	var $sql="SELECT "+user+".username,"+user+".email,"+account+".* FROM ";
		$sql+= user+","+account;
		$sql+=" WHERE "+user+"_id="+id+" AND "+user+"."+account+"_id="+account+"."+account+"_id";
	Db.query($sql,function(data){
		callback(data[0])
	})

}