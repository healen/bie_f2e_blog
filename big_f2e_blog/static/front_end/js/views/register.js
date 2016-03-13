var ele = {
	username: $("#username"),
	password: $("#password"),
	password1: $("#password1"),
	email: $("#email"),
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
	username: /\w{4,8}/,
	password: /\w{5,18}/,
	email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
}

/**
 * 用户名验证 
 */
ele.username.on("blur", function() {
	var _this = $(this);
	var parent = $(this).parents(".myform");
	if ($(this).val().length == 0) {
		log.showErrorMsg(parent, "用户名不能为空！");
		return;
	}
	if (!reg.username.test($(this).val())) {
		log.showErrorMsg(parent, "用户名格式不正确 请输入4到8位字符!");
		return;
	}

	$.ajax({
		url: "/member/usertesting",
		type: "POST",
		data: {
			username: _this.val()
		},
		success: function(result) {
			if (result.code == 200) {
				log.showSuccessMsg(parent, "用户名验证通过可以注册");
			} else {
				log.showErrorMsg(parent, "用户名已被占用!");
				return;

			}
		},
		error: function(data, status, e) {
			if (status == "error") {
				log.showErrorMsg(parent, "服务器错误" + status);
				return;
			}
		}

	})
	log.showSuccessMsg(parent, "通过");
})

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
ele.email.on("blur", function() {
	var _this = $(this);
	var parent = $(this).parents(".myform");
	if ($(this).val().length == 0) {
		log.showErrorMsg(parent, "邮箱不能为空");

		return;
	}
	if (!reg.email.test($(this).val())) {
		log.showErrorMsg(parent, "邮箱格式错误");
		return;
	}
	$.ajax({
		url: "/member/emailtesting",
		type: "POST",
		data: {
			email: _this.val()
		},
		success: function(result) {
			if (result.code == 200) {
				log.showSuccessMsg(parent, "此邮箱没有注册过可以使用");
			} else {
				log.showErrorMsg(parent, "此邮箱已被占用!");
				return;

			}
		},
		error: function(data, status, e) {
			if (status == "error") {
				log.showErrorMsg(parent, "服务器错误" + status);
				return;
			}
		}

	})
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
$("#Register").on("click", function() {
	
	var registerData = {
		username: ele.username.val(),
		password: ele.password.val(),
		email: ele.email.val()
	}
	if(ele.username.val().length==0){
		log.showErrorMsg(ele.username.parents(".myform"), "用户名不能为空");
		return 
	}
	if(ele.password.val().length==0){
		log.showErrorMsg(ele.password.parents(".myform"), "密码不能为空");
		return 
	}
	if(ele.password.val() != ele.password1.val()){
		log.showErrorMsg(ele.password1.parents(".myform"), "两次密码不一致");
		return 
	}
	if(ele.email.val().length==0){
		log.showErrorMsg(ele.email.parents(".myform"), "邮箱不能为空");
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
					url:"/member/register",
					type:"POST",
					data:registerData,
					success:function(result){
						if(result.code==401){
							layer.msg(result.msg);
							return;
						}else{
							layer.msg(result.msg);
							setTimeout(function(){
								window.location.href="/member/email_verify"

							}, 3000);

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
	$.ajax({
		url:"/member/captcha",
		type:"GET",
		success:function(result){
			$("#piceVerify").attr("src","/member/captcha")

		}
	})
}

$("#rechangeVerify").on("click",function(){
	verify();
})
verify();
