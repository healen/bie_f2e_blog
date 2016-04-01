require.config({
	shim:{
		'jqueryColor':['jquery'],
		'jqueryForm':['jquery'],
		'jqueryJcrop':['jquery'],
		'layer':['jquery'],
		"laydate":['jquery']
	},
	paths:{
		jquery:"vendor/jquery-1.7.2.min",
		jqueryColor:"vendor/jquery.color",
		jqueryForm:"vendor/jquery.form.min",
		jqueryJcrop:"vendor/jquery.Jcrop.min",
		underscore:"vendor/underscore",
		laydate:"vendor/laydate/laydate",
		layer:"vendor/layer/layer",
		kindeditor:"/kindeditor/kindeditor",
		kindeditor_cn:"/kindeditor/lang/zh_CN"

	},
	urlArgs: "t=" + (new Date()).getTime()
});



require(['jquery'],function(W){
	var  JPlaceHolder = {
	    //检测
	    _check : function(){
	        return 'placeholder' in document.createElement('input');
	    },
	    //初始化
	    init : function(){
	        if(!this._check()){
	            this.fix();
	        }
	    },
	    //修复
	    fix : function(){
	        W(':input[placeholder]').each(function(index, element) {
	            var self = W(this), txt = self.attr('placeholder');
	            if(self.val().length==0){
	                self.val(txt).addClass("placehoder");
	            }
	            self.focus(function(){
	                if(W(this).val()==txt){
	                     var par=W(this).parent();
	                    W(this).val("").removeClass("placehoder");
	                }
	            })
	            self.blur(function(){
	                if(W(this).val()==""){
	                     if(W(this).attr("type")=="password"){
	                        var par=W(this).parent();
	                    }
	                    self.val(txt).addClass("placehoder");
	                }
	                 
	            })

	        });
	    }
	};
	 JPlaceHolder.init();
})
