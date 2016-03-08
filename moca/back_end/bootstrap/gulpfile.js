/*引入插件*/
var gulp=require("gulp"),
    less=require("gulp-less"),
    clean=require("gulp-clean")
    fs = require('fs');
/*task任务编译LESS*/
gulp.task("less",["clean"],function(){
    gulp.src(["./less/bootstrap.less"])
        .pipe(less({compress: false}))
        .on("error",function(e){console.log(e)})
        .pipe(gulp.dest("./css/"));
});


/*清理CSS*/
gulp.task("clean", function(){
    gulp.src(["./css/bootstrap.css"], { read:true })
        .pipe(clean());
});


/*监考任务*/
gulp.task('watch', function () {
   gulp.watch(['./less/*.less'],function(){
     gulp.run('less','clean','watch');
   });
});



/*自动跑任务*/
gulp.task('default',function(){
    gulp.run('less','clean','watch');
})







