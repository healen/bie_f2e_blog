var ele = {

	password: $("#password"),
	password1: $("#password1"),
	verify: $("#verify")
}
var log = {
	showErrorMsg: function(ele, log) {
		ele.addClass("has-error");
		ele.find(".log").show().text(log);
		ele.removeClass("go");
	},
	showSuccessMsg: function(ele, log) {
		ele.removeClass("has-error");
		ele.find(".log").show().text(log);
		ele.addClass("go");

	}
}
var reg = {
	password: /\w{5,18}/
	
}

/**
 * 用户名验证 
 */


/**
 * 密码验证 
 */
ele.password.on("blur", function() {
	var _this = $(this);
	var parent = $(this).parents(".myform");
	if ($(this).val().length == 0) {
		log.showErrorMsg(parent, "密码不能为空");
		return;
	}
	if (!reg.password.test($(this).val())) {
		log.showErrorMsg(parent, "密码格式不正确，请输入5到17位");
		return;
	}
	log.showSuccessMsg(parent, "通过");
})
ele.password1.on("blur", function() {
	var _this = $(this);
	var parent = $(this).parents(".myform");
	if ($(this).val() !== ele.password.val()) {
		log.showErrorMsg(parent, "两次密码输入不一致");
		return;
	}
	log.showSuccessMsg(parent, "通过");
})


ele.verify.on("blur", function() {
	var _this = $(this);
	var parent = $(this).parents(".myform");
	var data = {
		verify: $(this).val()
	};
	$.ajax({
		url: "/member/userVerify",
		type: "POST",
		data: data,
		success: function(result) {
			if (result.code == 200) {
				log.showSuccessMsg(parent, "通过");

			} else {
				log.showErrorMsg(parent, "验证码错误");
			
			}

		},
		error: function(data, status, e) {

		}
	})
})

$("#submitForPassword").on("click", function() {
	
	var registerData = {
		password: ele.password.val()
	}

	if(ele.password.val().length==0){
		log.showErrorMsg(ele.password.parents(".myform"), "密码不能为空");
		return 
	}
	if(ele.password.val() != ele.password1.val()){
		log.showErrorMsg(ele.password1.parents(".myform"), "两次密码不一致");
		return 
	}


	var data = {
		verify:ele.verify.val()
	};


	$.ajax({
		url: "/member/userVerify",
		type: "POST",
		data: data,
		success: function(result) {
			if (result.code == 200) {
				log.showSuccessMsg(ele.verify.parents(".myform"), "通过");

				$.ajax({

					url:"/member/confirmPassword",
					type:"POST",
					data:registerData,
					success:function(result){
						if(result.code==401){
							layer.msg(result.msg);
							return;
						}else{
							layer.msg(result.msg);
							// setTimeout(function(){
							// 	window.location.href="/member/email_verify"

							// }, 3000);

						}
					},
					error:function(data,status,e){
						layer.msg("服务请求错误");

					}
				})

			} else {
				log.showErrorMsg(ele.verify.parents(".myform"), "验证码错误");
				return;
			
			}

		},
		error: function(data, status, e) {

		}
	})
	
})

function verify(){

		if ((navigator.userAgent.indexOf('MSIE') >= 0) 
		    && (navigator.userAgent.indexOf('Opera') < 0)){
		    window.location.href=window.location.href;
		}else{
			$.ajax({
				url:"/member/captcha",
				type:"GET",
				success:function(result){
					$("#piceVerify").attr("src","/member/captcha")
				}
			})
			
		}

	
}

$("#rechangeVerify").on("click",function(){
	verify();
})

