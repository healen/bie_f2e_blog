define(['jquery',"layer","datefmt"], function(W,layer,datefmt) {
    var foo = {
    	renderForm:function(){
            var url=W("#reviewForm").attr("data-ajaxURL");
    		W.ajax({
                url:url,
                type:"GET",
                success:function(data){
                    W("#reviewForm")[0].innerHTML=data;

                },
                error:function(e){
                      W("#reviewForm")[0].innerHTML=e;
                }
            })

    	},
    	renderReviewList:function(){
            var url=W("#reviewlist").attr("data-ajaxURL");
            W.ajax({
                url:url,
                type:"GET",
                success:function(data){
                    W("#reviewlist")[0].innerHTML=data;

                },
                error:function(e){
                      W("#reviewlist")[0].innerHTML=e;
                }
            })
    		// alert(2)

    	},
    	submitView:function(){
    		// alert(3)

    	},
        review:function(sendData){
            var sendBtn=W("#sendReview");
            sendBtn.live("click",function(){
                if(W("#reviewContent").val().length<10){
                    layer.msg("评论内容不能低于10个字符")
                }else{
                    datas={
                        user_id:W("#userId").val(),
                        art_id:W("#articleId").val(),
                        content:W("#reviewContent").val()
                    }
                    W.ajax({
                        url:sendData.url,
                        type:sendData.methoded,
                        data:datas,
                        success:function(data){
                           
                            var avaterPice=W("#avaterpice").attr("src");
                            var thisUsername=W("#thisUsername").html();
                            var content=W("#reviewContent").val();
                            console.log(content);
                            datefmt.datefmt();
                            var time=new Date().Format("yyyy-M-d hh:mm");

                            var listHTML='<div class="reviewlist" style="padding:30px;"><span class="loop"></span>楼<br /><img src="'+avaterPice+'" alt="" /><span>'+thisUsername+'</span><br />'+content+' <br /><span class="time">'+time+'</span><hr /></div>';
                            W("#reviewlist").prepend(listHTML);
                            W(".reviewlist").each(function(){
                                var i=W(this).index();
                                // alert(i)
                                W(this).find(".loop").html(i+1);
                            })

                            layer.msg("评论成功")

                            W("#reviewContent").val("");
                        },
                        error:function(e){
                            alert(e)
                        }
                    })

                }
            })
        },
        reply:function(sendDate){
            var user_reply_btn=W(".user_reply_btn");
            user_reply_btn.live("click",function(){
                var replybox=W(this).next(".replybox");
                if(replybox.length==0){
                    alert("请先登录")
                }else{
                    if(replybox.is(":hidden")){
                        replybox.show();
                    }else{
                        replybox.hide();
                    }
                }
                
            })

        }
    }
    return foo;
})