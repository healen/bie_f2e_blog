define(['jquery'], function(W) {
    var foo = {
        uptime: function() {
        	var time=parseInt($("#time").html());
			setInterval(function(){
				if(time>1){
					time--
					$("#time").html(time);
				}else{
					window.location.href="/account"
				}
			},1000)

        }

    }
    return foo;
})
