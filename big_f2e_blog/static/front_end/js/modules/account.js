define(['jquery', 'layer', 'laydate', 'jqueryForm', 'jqueryJcrop'], function(W, layer) {
    var foo = {
        set: function(email) {
            W("#avater").on("change", function() {
                layer.load()
                W("#uploadForm").ajaxSubmit({
                    error: function(xhr) {
                        console.log('Error: ' + xhr.status);
                    },
                    success: function(response) {
                        layer.closeAll('loading');
                        layer.open({
                            title: "头像设置",
                            type: 1,
                            maxmin: true,
                            area: ['660px', "90%"],
                            shadeClose: true, //点击遮罩关闭
                            content: response.toString()
                        });
                        W("#avater").val("");

                    }
                });
                return false;

            })
            W("#brithday").on("click", function() {

                laydate({
                    min: "1950-0-0"
                })

            });
            W("#setSelfMsg").on("click", function() {
                layer.load();
                W("#account_submit").ajaxSubmit({
                    error: function(xhr) {
                        console.log('Error: ' + xhr.status);
                    },
                    success: function(response) {
                        layer.closeAll('loading');
                        window.location.href="/account"
                        // alert(response)
                    }

                })


            });

            var reg = {
                username: /\w{4,8}/,
                password: /\w{5,18}/,
                email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]+)(.[a-zA-Z0-9_-])+/
            }
            var emailOperator = {
                "qq": "mail.qq.com",
                "sina": "mail.sina.com.cn",
                "sohu": "mail.sohu.com",
                "163": "mail.163.com",
                "126": "www.126.com",
                "yeah": "www.yeah.net",
                "188": "www.188.com",
                "sogou": "mail.sogou.com",
                "outlook": "www.outlook.com",
                "live": "www.live.com",
                "hotmail": "www.hotmail.com",
                "aliyun": "mail.aliyun.com",
                "21cn": "mail.21cn.com",
                "baidu": "mail.baidu.com",
                "gmail": "gmail.google.com",
                "tom": "mail.tom.com",
                "263": "www.263.net",
                "wo": "mail.wo.com.cn",
                "189": "mail.189.cn",
                "2980": "www.2980.com"
            }
            var emailArr = reg.email.exec(email);
            var moperator = "'" + emailArr[2] + "'";

            function email_verify() {
                W.ajax({
                    url: "/member/email_verify",
                    type: "GET",
                    success: function(massage) {
                        layer.closeAll('loading');

                        layer.alert(massage.msg + "，点击这里<a href='http://" + emailOperator[emailArr[2]] + "' class='mark'>[登录邮箱]</a>去激活")

                    },
                    error: function(data, status, e) {
                        layer.closeAll('loading');
                        layer.msg("错误");
                    }
                })

            }

            W("#verifyEmail").on("click",function(){
                email_verify();
            })

        }

    }
    return foo;
})
