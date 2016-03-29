define(['jquery', 'layer','jqueryJcrop','jqueryForm'], function(W, layer) {
    var foo = {
        run: function() {
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

            W("#setSelfMsg").on("click", function() {
                layer.load();
                W("#account_submit").ajaxSubmit({
                    error: function(xhr) {
                        console.log('Error: ' + xhr.status);
                    },
                    success: function(response) {
                        layer.closeAll('loading');

                        if (response === "操作成功") {
                            window.location.href = "/account"

                        }

                    }

                })
            })
        }
    }
    return foo;
})
