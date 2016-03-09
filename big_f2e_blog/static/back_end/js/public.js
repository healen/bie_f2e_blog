
/*
 * jQuery placeholder, fix for IE6,7,8,9
 * @author JENA
 * @since 20131115.1504
 * @website ishere.cn
 */
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
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            if(self.val().length==0){
                self.val(txt).addClass("placehoder");
            }
            self.focus(function(){
                if($(this).val()==txt){
                     var par=$(this).parent();
                    $(this).val("").removeClass("placehoder");
                }
            })
            self.blur(function(){
                if($(this).val()==""){
                     if($(this).attr("type")=="password"){
                        var par=$(this).parent();
                    }
                    self.val(txt).addClass("placehoder");
                }
                 
            })

        });
    }
};








/**
 * 获取验证码
 * @param  {[string]} ele  [DOM元素]
 * @param  {[number]} time [倒计时时间]
 */
var verify=function(ele,time){
    var timer=null;
    var sce=time;
    // $(ele).on("click",function(){
        var oW=$(this);
        $(ele).attr("disabled","disabled");
        $(ele).val(sce+"秒重新获取");
        clearInterval(timer);
        timer=setInterval(function(){
            sce--
            if(sce<1){
                $(ele).removeAttr("disabled").val("获取验证码");
                clearInterval(timer);
                sce=time
                return
            }
            $(ele).val(sce+"秒重新获取");
        },1000);
    // })
}








/**
 * 人民币格式
 * @param num
 * @return 金额格式的字符串,如'1,234,567.45'
 */
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}

//解决火狐获取焦点不生效
function setFocus(id){
    $('#'+id).focus();
}
/**
 * 浮点数减法
 * @param arg1
 * @param arg2
 * @returns
 */
function floatSub(arg1,arg2){  
    var r1,r2,m,n;  
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
    m=Math.pow(10,Math.max(r1,r2));  
    //动态控制精度长度  
    n=(r1>=r2)?r1:r2;  
    return ((arg1*m-arg2*m)/m).toFixed(n);  
}
function toDecimal(x) {  
    var f = parseFloat(x);              
    if (isNaN(f)) {  
            return;              
    }              
    f = Math.round(x*100)/100;              
    return f;          
} 

//生成圆的方法多次调用的方法
function get_series_data(arr){
    var colors =['#eee', '#8bd8ff'];//
    var data = [    
        {                          
            color: colors[1],
            name: '完成',
            y: arr[0]
        },
        {
            color: colors[0],
            name: '剩余',
            y: arr[1]
        }
    ];
    return data;
}

function highcharts_tubiao(k, spec){
    $(k).highcharts({
        chart: {
            renderTo: 'container',
            type: 'pie',
            backgroundColor:'#ffffff',
            borderColor:"#ffffff",
            borderWidth:0,
            height:60,
            width:60,
            margin:[0,0,0,0]
          
        },
        title: {
            text: ''
        },
        exporting:{
            enabled: false
        },
        tooltip: {
            valueSuffix: '%',
            enabled:false
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                size:60,
                innerSize: '250%',

                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: false,
                borderWidth:0,
                shadow: false
            }
        },
        credits:{
             enabled:false // 禁用版权信息
        },
        series: [
            {
                name: '额度',
                data: spec
               
            }
        ]
    })

}

function createline(obj,arr){
    var spec = get_series_data(arr);
    highcharts_tubiao(obj.find('.svgbox'),spec);
    if(spec[0].y>=0 && spec[0].y<=25){
        obj.find(".comm-position").addClass("position-1");
    }else if(spec[0].y>=26 && spec[0].y<=50){
        obj.find(".comm-position").addClass("position-2");
    }else if(spec[0].y>=51 && spec[0].y<=75){
        obj.find(".comm-position").addClass("position-3");
    }else{
        obj.find(".comm-position").addClass("position-4");
    }
}

function formatMoney(number, places, symbol, thousand, decimal) {
    number = number/10000 || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}

/**
 * 
 * @param annualRate 利率
 * @param repayMode 还款方式
 * @param repayPeriod 期限
 * @param investAmt 投资额
 * @returns
 */

//格式化金额
function foramtmoney(price, len)   
{  
   len = len > 0 && len <= 20 ? len : 2;   
   price = parseFloat((price + "").replace(/[^\d\.-]/g, "")).toFixed(len) + "";   
   var l = price.split(".")[0].split("").reverse(),   
   r = price.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   var re = t.split("").reverse().join("") + "." + r;
   return re.replace("-,","-");
}

function accAdd(arg1,arg2){
   var r1,r2,m;
   try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
   try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
   m=Math.pow(10,Math.max(r1,r2));
   return (arg1*m+arg2*m)/m;
} 


function format(val){
    return parseFloat(val.replace(/\,/g,""));
}
function verify(ele,time){
    var timer=null;
    var sce=time;
    $(ele).on("click",function(){
        var oW=$(this);
        oW.attr("disabled","disabled");
        oW.val(sce+"秒重新获取");
        clearInterval(timer);
        timer=setInterval(function(){
            sce--
            if(sce<1){
                oW.removeAttr("disabled").val("获取验证码");
                clearInterval(timer);
                sce=time
                return
            }
            oW.val(sce+"秒重新获取");
        },1000);
    })
}


          



(function($){
    $.fn.moneformat=function(){
        this.bind("keyup",function(){
              var v, j, sj, rv = "";
              v = $(this).val().replace(/,/g,"").split(".");
              j = v[0].length % 3;
              sj = v[0].substr(j).toString();
              for (var i = 0; i < sj.length; i++)
              {
                rv = (i % 3 == 0) ? rv + "," + sj.substr(i, 1): rv + sj.substr(i, 1);
              }
              var rvalue = (v[1] == undefined) ? v[0].substr(0, j) + rv: v[0].substr(0, j) + rv + "." + v[1];
              if (rvalue.charCodeAt(0) == 44)
              {
                rvalue = rvalue.substr(1);
              }
              $(this).val(rvalue);
        })
        this.bind('blur',function(){
            var vs=$(this).val();
            if(format(vs)>0 && vs.indexOf(".00") < 0 ){
                var v = $(this).val()+".00";
                $(this).val(v);
            }

           
        })
    }
    $.fn.sliderFn=function(time){
            var width=this.find(".imglist li").eq(0).width();
            var length=this.find(".imglist li").length;
            var $slide=this.find(".imglist");
            var $prove=this.find(".prov");
            var $next=this.find(".next");
            var $slidebox=this.find(".slidebox");
            var $crumbs=this.find(".crumbs");
            var p=0;
            this.find(".imglist").css({
                "width":length*width+"px"
            });
            function crumbsFn(index){
                $crumbs.find("a").eq(index).addClass("active");
                $crumbs.find("a").eq(index).siblings("a").removeClass("active");
            }
            $prove.on("click",function(){
                p--
                if(p<0){
                    p=length-1
                }
                $slide.stop(true,false).animate({
                    "left":0-width*p
                },300)
                crumbsFn(p);
            });

            $next.on("click",function(){
                p++
                
                if(p>length-1){
                    p=0
                }
                $slide.stop(true,false).animate({
                    "left":0-width*p
                },300)
                crumbsFn(p);
            });

            $crumbs.find("a").mouseover(function(){
                p=$crumbs.find("a").index(this);
                 $slide.stop(true,false).animate({
                    "left":0-width*p
                },300)

                $(this).addClass("active").siblings("a").removeClass("active")

            })


            if(time){
                var timer=setInterval(function(){
                    $next.trigger("click");
                },time)
                this.stop(true,false).hover(function(){
                    clearInterval(timer);
                },function(){
                    timer=setInterval(function(){
                        $next.trigger("click");
                    },time)
                })
            }

    }
})(jQuery)



function backTheTop(){

    var strin='<div class="backthetop"><span>返回顶部</span><i></i></div>';
    var n=$("body").height()/$(window).height();

    if(n>2){
        if($(".backthetop").length<=0){
            $("body").append(strin);

           
            $(".backthetop").on("click",function(){
                $('html,body').animate({scrollTop:0},500);
            })
            $(window).scroll(function(){
                var scrolltop = $(this).scrollTop();
                if(scrolltop>400){
                    $(".backthetop").fadeIn(600);
                }
                if(scrolltop<400){
                    $(".backthetop").hide();
                }
            })
        }

    }



}


function navRightPosition(elem){

     if($(window).width()<1140){
         elem.css({
            "right":"-50px"
        })
    }else{
        var screenWidth = $(window).width();
        var contentWidth = 1008;
        var rightPosition = parseInt(contentWidth +(screenWidth - contentWidth)/2)+10;
        elem.css({
            "left":rightPosition+"px"
        })

    }

    
}
function init(){
    $('.list_ul li').bind('click',tz);
}
function tz(event){
    var index = $(this).index();
    $(this).addClass("active");
    $('html,body').animate({scrollTop:$('#div'+index).offset().top},500);
}


$(function(){
    JPlaceHolder.init(); 
    backTheTop();

    /*Tab*/
    $(".tabview a").click(function(){
        var num=$(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".viewbtnbox").eq(num).show();
        $(".viewbtnbox").eq(num).siblings(".viewbtnbox").hide();
    })

    $(".navbox li.toggle").hover(function(){
        $(this).addClass("on");
    },function(){
        $(this).removeClass("on");
    });
    /*得到焦点*/
    $(".text_control").bind({
        focus:function(){
            var p=$(this).parents(".inputbox");
            p.addClass("focus");
        },
        blur:function(){
            var p=$(this).parents(".inputbox");
            p.removeClass("focus");
        }
    })
    // /*管理首页路由JS*/
    $('.navbox > ul > li').each(function(){
        var cc = $(this);
        cc.attr('class','');
    });
    if(window.location.href.indexOf('index')>-1 && window.location.href.indexOf('my_index')<0){
        $('#index').attr('class','active');
    }else if(window.location.href.indexOf('crowdfunding')>-1 && window.location.href.indexOf('product_crowdfunding_list')<0 && window.location.href.indexOf('shop_crowdfunding_list')<0){
        $('#investment').attr('class','active');
    }else if(window.location.href.indexOf('product_crowdfunding_list')>-1){
        $('#product_crowdfunding_list').attr('class','active');
    }else if(window.location.href.indexOf('shop_crowdfunding_list')>-1){
        $('#shop_crowdfunding_list').attr('class','active');
    }else if(window.location.href.indexOf('my')>-1){
        $('#my_index').attr('class','active');
    }else if(window.location.href.indexOf('transfer_list')>-1){
        $('#transfer_list').attr('class','active');
    }else if(window.location.href.indexOf('Preheating')>-1){
        $('#Preheating').attr('class','active');
    }else if(window.location.href.indexOf('new3')>-1){
        $('#new3').attr('class','active');
    }else{
        $('.navbox > ul > li').attr('class','');
    }



    $(".tab .tab_lab a").on("click",function(){
        var index = $(this).index();
        var parents=$(this).parents(".tab");

        $(this).addClass("on").siblings("a").removeClass("on");
        parents.find(".tab_content").eq(index).show();
        parents.find(".tab_content").eq(index).siblings(".tab_content").hide()
    })


    $(".inputselect").on("change",function(){
        var txt=$(this).val();
        $(this).next("input").val(txt);
    })

    $(".where .inputbox").hover(function(){
        $(this).addClass("on");
    },function(){
        $(this).removeClass("on");

    })


    /*左侧菜单*/
    $("#leftbar .toggle").on("click",function(){

        var left=parseInt($("#left2bar").css("left"));
        $("#left2bar").find(".slidebtn").show();
        $(this).addClass("active").siblings("li").removeClass("active");
        var index=$(this).index()-1;
        $(this).find(".icoside").show();
        $(this).siblings("li").find(".icoside").hide();
        $("#left2bar > ul").eq(index).show();
        $("#left2bar > ul").eq(index).siblings("ul").hide();
        if(left<-10){
            $("#left2bar").find(".slidebtn .inbtnr").hide();
            $("#left2bar").find(".slidebtn .inbtnl").show();
            $("#left2bar").animate({"left":"74px"},300);
            $("#pagecontent").animate({"margin-left":"134px"},300)
        }
    })

    $("#left2bar").find(".slidebtn .inbtnl").on("click",function(){

         $("#left2bar").find(".slidebtn .inbtnr").hide();
         $("#left2bar").animate({"left":"-64px"},300);
         $("#pagecontent").animate({"margin-left":"0px"},300);
         $(this).hide().siblings("div").show();

    })


    $("#left2bar").find(".slidebtn .inbtnr").on("click",function(){

        $("#left2bar").find(".slidebtn .inbtnr").hide();
        $("#left2bar").animate({"left":"74px"},300);
        $("#pagecontent").animate({"margin-left":"134px"},300)
        $(this).hide().siblings("div").show();

    })
    $(".bar2 > a").on("click",function(){
        var parent=$(this).parents(".bar2");
        if(parent.find("ul").is(":hidden")){
            parent.find("ul").slideDown(200);
            // parent.siblings(".bar2").find("ul").slideUp(200);
            parent.find(".span2").html("-");
             // parent.siblings(".bar2").find(".span2").html("+");
            $(this).addClass("active");
            // parent.siblings("li").find("a").removeClass("acitve");

        }else{
            parent.find("ul").slideUp(200);
            parent.find(".span2").html("+");
            $(this).removeClass("active");

        }
    })

    $("#left2bar > ul > li").on("click",function(){
        $(this).find(">a").addClass("active")
        $(this).siblings("li").find(">a").removeClass("active")
    })

    $("#left2bar > ul > li > ul > li").on("click",function(){
        $(this).find(">a").addClass("active")
        $(this).siblings("li").find(">a").removeClass("active")
    })
    /*左侧菜单接收*/

    $("*").on("click",function(){
        var href=""
        if($(this).attr("data-href")){
            href=$(this).attr("data-href");
            window.location.href=href;
        }
        // var href=$(this).attr("data-href");

    })
})

