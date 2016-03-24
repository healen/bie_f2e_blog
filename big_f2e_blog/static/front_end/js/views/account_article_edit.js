/*上传图片*/
        $("#upCoverbtn").on("click",function(){
            $("#cover").trigger("click")
        })
        $("#cover").on("change",function(){
            layer.load()
            $("#uploadFormCover").ajaxSubmit({
                error:function(xhr){
                    console.log('Error: '+ xhr.status);
                },
                success:function(response){
                    layer.closeAll('loading');
                    $("#cover").val("")
                    layer.open({
                        title:"封面图设置",
                        type: 1,
                        maxmin: true,
                        area: ['1020px',"100%"],
                        shadeClose: true, //点击遮罩关闭
                        content: response.toString()
                    });
                    $("#avater").val("");
                    
                }
            });
            return false ;
        })

        /*提交form表单*/

        $("#SendArticle").on("click",function(){
            editor.html();
            editor.sync();

            if($("#editor").val().length==0){
                layer.alert("内容不能为空");
                return;
            }
            if($("#title").val().length==0){
                layer.alert("标题不能为空");
                return;
            }

            var ii = layer.load();
            var _this=$(this);
            $("#account_article_edit").ajaxSubmit({
                 error:function(xhr){
                    console.log('Error: '+ xhr.status);
                },
                success:function(response){
                    layer.close(ii);
                    
                 
                    window.location.href=_this.attr("data-return")
                 
                    $("#avater").val("");
                    
                }

            })
        })