define(["jquery", 'layer'], function(W, layer) {

    var foo = {
        login: function() {
            var ele = {
                username: W("#username"),
                password: W("#password"),
                verify: W("#verify")
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
            }

            /**
             * 用户名验证 
             */
            ele.username.on("blur", function() {
                var _this = W(this);
                var parent = W(this).parents(".myform");
                if (W(this).val().length == 0) {
                    log.showErrorMsg(parent, "用户名不能为空！");
                    return;
                }
                if (!reg.username.test(W(this).val())) {
                    log.showErrorMsg(parent, "用户名格式不正确 请输入4到8位字符!");
                    return;
                }
                log.showSuccessMsg(parent, "通过");
            })

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


            ele.verify.on("blur", function() {
                var _this = W(this);
                var parent = W(this).parents(".myform");
                var data = {
                    verify: W(this).val()
                };
                W.ajax({
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
            W("#Login").on("click", function() {
                var loginData = {
                    username: ele.username.val(),
                    password: ele.password.val()
                }
                if (ele.username.val().length == 0) {
                    log.showErrorMsg(ele.username.parents(".myform"), "用户名不能为空");
                    return
                }
                if (ele.password.val().length == 0) {
                    log.showErrorMsg(ele.password.parents(".myform"), "密码不能为空");
                    return
                }

                W.ajax({
                    url: "/member/userVerify",
                    type: "POST",
                    data: { verify: ele.verify.val() },
                    success: function(result) {
                        if (result.code == 200) {
                            log.showSuccessMsg(ele.verify.parents(".myform"), "通过");

                            W.ajax({
                                url: "/member/login",
                                type: "POST",
                                data: loginData,
                                success: function(result) {
                                    if (result.code == 401) {
                                        layer.msg(result.msg);
                                        return;
                                    } else {
                                        // layer.msg(result.msg);

                                        window.location.href = "/account"



                                    }
                                },
                                error: function(data, status, e) {
                                    layer.msg("服务请求错误");

                                }
                            })

                        } else {
                            log.showErrorMsg(ele.verify.parents(".myform"), "验证码错误");
                            return

                        }

                    },
                    error: function(data, status, e) {
                        log.showErrorMsg(ele.verify.parents(".myform"), "系统异常");
                        return

                    }
                })



            })

            function verify() {

                if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
                    window.location.href = window.location.href;
                } else {
                    W.ajax({
                        url: "/member/captcha",
                        type: "GET",
                        success: function(result) {
                            W("#piceVerify").attr("src", "/member/captcha?v="+Date.parse(new Date()))
                        }
                    })

                }


            }

            W("#rechangeVerify").on("click", function() {
                verify();
            })

        }
    }
    return foo

})
