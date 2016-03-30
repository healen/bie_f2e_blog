define(['jquery', 'layer'], function(W, layer) {
    var foo = {
        showArt:function(ele,url){
            W(ele).on("click",function(){
                 layer.open({
                    title:"查看文章",
                    type: 2,
                    maxmin: true,
                    area: ['1020px',"90%"],
                    shadeClose: true, //点击遮罩关闭
                    content: url
                });
            });
        },
        deleteArt:function(ele,url,id){
            W(ele).on("click",function(){
                layer.confirm("删除不可恢复，确认要删除吗？",{
                    btn:["删除","不删除"]
                },function(){
                    layer.load();
                    W.ajax({
                        url:url,
                        type:"GET",
                        success:function(result){
                            layer.closeAll('loading');
                            W("tr[data-id="+id+"]").fadeOut();
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
                
            });
        }
    }
    return foo;
})
