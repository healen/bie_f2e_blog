define(['jquery', 'layer'], function(W, layer) {
    var foo = {
        run: function() {
        	var ele = {
				username: $("#username"),
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
				email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]+)(.[a-zA-Z0-9_-])+/
			}
			var emailOperator={
				"qq":"mail.qq.com",
				"sina":"mail.sina.com.cn",
				"sohu":"mail.sohu.com",
				"163":"mail.163.com",
				"126":"www.126.com",
				"yeah":"www.yeah.net",
				"188":"www.188.com",
				"sogou":"mail.sogou.com",
				"outlook":"www.outlook.com",
				"live":"www.live.com",
				"hotmail":"www.hotmail.com",
				"aliyun":"mail.aliyun.com",
				"21cn":"mail.21cn.com",
				"baidu":"mail.baidu.com",
				"gmail":"gmail.google.com",
				"tom":"mail.tom.com",
				"263":"www.263.net",
				"wo":"mail.wo.com.cn",
				"189":"mail.189.cn",
				"2980":"www.2980.com"
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
			$("#FindPassWord").on("click", function() {
				var _this=$(this);
				var findPassData = {
					username: ele.username.val(),
					email: ele.email.val()
				}
				if(ele.username.val().length==0){
					log.showErrorMsg(ele.username.parents(".myform"), "用户名不能为空");
					return 
				}
				if(ele.email.val().length==0){
					log.showErrorMsg(ele.password.parents(".myform"), "密码不能为空");
					return 
				}
				var emailArr=reg.email.exec(ele.email.val());
				console.log(emailOperator[emailArr[2]]);
				layer.load(2);

				$.ajax({
					url:"/member/find_password/send",
					type:"POST",
					data:findPassData,
					success:function(result){
						if(result.code==401){
							layer.alert(result.msg);
							layer.closeAll('loading');
							return;
						}else{
							layer.alert(result.msg+"，点击这里<a href='http://"+emailOperator[emailArr[2]]+"' class='mark'>[登录邮箱]</a>找回密码 无法登录？直接进入自己邮箱验证");
							layer.closeAll('loading');
							_this.attr("disabled","disabled");

						}
					},
					error:function(data,status,e){
						layer.closeAll('loading');
						layer.msg("服务请求错误");

					}
				})

				
				

				
			})





			



        }

    }
    return foo;
})
