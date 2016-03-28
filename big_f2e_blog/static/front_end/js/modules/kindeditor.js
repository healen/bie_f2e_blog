define(['jquery','kindeditor','kindeditor_cn'],function($,KindEditor){
	var kin={
		show:function(){
			 var options = {
	              uploadJson: '/uploadImg'
	          };
	          KindEditor.ready(function(K) {
	              window.editor = K.create('#editor', options);
	          });

	           $(".submint").on("click",function(){
			        html = editor.html();
			        // 同步数据后可以直接取得textarea的value
			        editor.sync();
			        $("#content").html($("#editor").val())
			    })

		}
	}
	return kin
})