define(['vendor/jquery-1.7.2.min'],function(jq){
	var register={
		verify:function(){
			jq("#Register").on("click",function(){
				alert(1);
			})
		}
	}
	return register
});