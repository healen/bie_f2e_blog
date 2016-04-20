define(['jquery'], function(W) {
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
    		// alert(2)

    	},
    	submitView:function(){
    		// alert(3)

    	},
        review:function(sendData){

            W.ajax({
                url:sendData.url,
                type:sendData.methoded,
                data:datas,
                success:function(){

                },
                error:function(){

                }
            })

        }
    }
    return foo;
})