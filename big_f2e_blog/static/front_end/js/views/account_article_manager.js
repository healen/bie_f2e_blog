function showArticle(url){
	layer.open({
        title:"查看文章",
        type: 2,
        maxmin: true,
        area: ['1020px',"90%"],
        shadeClose: true, //点击遮罩关闭
        content: url
    });

}

function deleteArticle(url,id){
	layer.confirm("删除不可恢复，确认要删除吗？",{
		btn:["删除","不删除"]
	},function(){
		layer.load();
		$.ajax({
			url:url,
			type:"GET",
			success:function(result){
				layer.closeAll('loading');
				$("tr[data-id="+id+"]").fadeOut();
				layer.msg("删除成功",{
					time:1000
				})

				setTimeout(function(){
					window.location.reload();

				},1200);

			}
		})

	},function(){
		layer.closeAll();
	})
}


// $(".scover").on("click",function(){
// 	var src=$(this).attr("data-bigPice")
// 	layer.open({
//         title:false,
//         type: 1,
//         area:["260px","163px"],
//         shadeClose: true, //点击遮罩关闭
//         content: '<div><img src="'+src+'"></div>'
//     });

// })
