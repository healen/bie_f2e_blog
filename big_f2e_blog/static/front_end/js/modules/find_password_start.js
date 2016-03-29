define(['jquery', 'layer'], function(W, layer) {
    var foo = {
        run: function() {

            var ele = {

                password: W("#password"),
                password1: W("#password1")
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
                var _this = W(this);
                var parent = W(this).parents(".myform");
                if (W(this).val().length == 0) {
                    log.showErrorMsg(parent, "密码不能为空");
                    return;
                }
                if (!reg.password.test(W(this).val())) {
                    log.showErrorMsg(parent, "密码格式不正确，请输入5到17位");
                    return;
                }
                log.showSuccessMsg(parent, "通过");
            })
            ele.password1.on("blur", function() {
                var _this = W(this);
                var parent = W(this).parents(".myform");
                if (W(this).val() !== ele.password.val()) {
                    log.showErrorMsg(parent, "两次密码输入不一致");
                    return;
                }
                log.showSuccessMsg(parent, "通过");
            })

            W("#submitForPassword").on("click", function() {

                var registerData = {
                    password: ele.password.val()
                }

                if (ele.password.val().length == 0) {
                    log.showErrorMsg(ele.password.parents(".myform"), "密码不能为空");
                    return
                }
                if (ele.password.val() != ele.password1.val()) {
                    log.showErrorMsg(ele.password1.parents(".myform"), "两次密码不一致");
                    return
                }

                W.ajax({
                    url: "/member/confirmPassword",
                    type: "POST",
                    data: registerData,
                    success: function(result) {
                        if (result.code == 401) {
                            layer.msg(result.msg);
                            return;
                        } else {
                            layer.msg(result.msg);
                            setTimeout(function() {
                                window.location.href = "/member/login"

                            }, 3000);

                        }
                    },
                    error: function(data, status, e) {
                        layer.msg("服务请求错误");

                    }
                })


            })

        }

    }
    return foo;
})
