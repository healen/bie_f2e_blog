/*引入插件*/
var gulp=require("gulp"),
    less=require("gulp-less"),
    zip = require('gulp-zip'),
    clean=require("gulp-clean");
/*task任务编译LESS*/
gulp.task("less",function(){
    gulp.src("./Mosa/less/*.less")
        .pipe(less({compress: false}))
        .on("error",function(e){console.log(e)})
        .pipe(gulp.dest("../../big_f2e_blog/static/front_end/css/"));
});
/*清理CSS*/
gulp.task("clean", function(){
    gulp.src("../../big_f2e_blog/static/front_end/css/*.css", { read:true })
        .pipe(clean());
});


// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}

gulp.task("pack",function(){
     // .pipe(zip('css.zip',{Default:true}))
    gulp.src(['./css/fonts/*'])
    .pipe(gulp.dest('../../big_f2e_blog/static/front_end/css/fonts'));

    gulp.src(['./js/**/*'])
    .pipe(gulp.dest('../../big_f2e_blog/static/front_end/js'));

    gulp.src(['./img/**/*'])
    .pipe(gulp.dest('../../big_f2e_blog/static/front_end/img'));

    // gulp.src(['*.html'])
    // .pipe(gulp.dest('dist'));

    gulp.src(['./bootstrap/css/**/*'])
    .pipe(gulp.dest('../../big_f2e_blog/static/front_end/bootstrap/css'));

    gulp.src(['./bootstrap/js/*.js'])
    .pipe(gulp.dest('../../big_f2e_blog/static/front_end/bootstrap/js'));

    gulp.src(['./bootstrap/img/**/*'])
    .pipe(gulp.dest('../../big_f2e_blog/static/front_end/bootstrap/img'));

    
})

// gulp.task("zipend",function(){
//      // .pipe(zip('css.zip',{Default:true}))
//     gulp.src(['./dist/**/*'])
//     .pipe(zip('众筹后台'+ (new Date()).Format("yyyyMMddhhmmss")+".zip"))
//     .pipe(gulp.dest(''));
// })




 




gulp.task('tpl',function(){
    fs=require('fs')
    fs.readdir("./tpl",function(err,file){
        var HTMLfileFilter=[];
        var TPLfileFilter=[];
        var fileArr=file;
        var HTMLreg=/.*\.html$/;
        var TPLreg=/.*\.tpl$/;
        // var page = fs.existsSync("./page");
        var dataFIS;

      
        // if(!page){
        //     fs.mkdir('./page',function(err){
        //         if(err){
        //             console.log('文件夹创建出错')
        //         }
        //     })
        // }
        //var INCLUDEreg=/^%\s*inc=\'(.*\..*)\'\s*%$/   //{% inc='footer.tpl' %}
        var write=[];
        /*过滤*/
        for(var i=0;i<fileArr.length;i++){
            if(HTMLreg.test(fileArr[i])){
                HTMLfileFilter.push(fileArr[i])
            }
            if(TPLreg.test(fileArr[i])){
                TPLfileFilter.push(fileArr[i])
            }
        }
        /*写入读取*/
        for(var i=0;i<HTMLfileFilter.length;i++){
            var filenames= HTMLfileFilter[i];
            dataFIS=fs.readFileSync("./tpl/"+HTMLfileFilter[i]);
            for (j in TPLfileFilter){
                Tpldata=fs.readFileSync("./tpl/"+TPLfileFilter[j]);
                console.log("模板tpl:"+TPLfileFilter[j]);
                dataFIS = dataFIS.toString().replace(new RegExp("{%.*inc='"+TPLfileFilter[j]+"'.*%}","g"),Tpldata.toString());
            }
            console.log("页面HTML:"+HTMLfileFilter[i]);
            fs.writeFile("./"+HTMLfileFilter[i],dataFIS,function(err){});
            console.log("-----------"+HTMLfileFilter[i]+"写入成功-----------");
        }
    })
})

/*监考任务*/
gulp.task('watch', function () {
   gulp.watch(['./Mosa/**/*.less','./bootstrap/css/**/*'],function(){
     gulp.run('less','watch','pack');
   });
});



/*自动跑任务*/
gulp.task('default',function(){
    gulp.run('less','watch','pack');
})



