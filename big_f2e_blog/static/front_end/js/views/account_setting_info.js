$("#avater").on("change",function(){
    layer.load()
    $("#uploadForm").ajaxSubmit({
        error:function(xhr){
            console.log('Error: '+ xhr.status);
        },
        success:function(response){
            layer.closeAll('loading');
            layer.open({
                title:"头像设置",
                type: 1,
                maxmin: true,
                area: ['660px',"90%"],
                shadeClose: true, //点击遮罩关闭
                content: response.toString()
            });
            $("#avater").val("");
            
        }
    });
    return false ;

})
$("#brithday").on("click",function(){

    laydate({
        min:"1950-0-0"
    })

})
$("#setSelfMsg").on("click",function(){
     layer.load();
     $("#account_submit").ajaxSubmit({
        error:function(xhr){
            console.log('Error: '+ xhr.status);
        },
        success:function(response){
            layer.closeAll('loading');
           if(response==="操作成功"){
                window.location.href="/account"

            }
        }

     })


})
        