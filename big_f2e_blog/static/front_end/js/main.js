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

