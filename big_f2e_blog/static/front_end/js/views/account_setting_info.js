
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
        