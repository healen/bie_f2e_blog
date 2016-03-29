/*引入插件*/
var gulp=require("gulp"),
    less=require("gulp-less"),
    clean=require("gulp-clean");
/*task任务编译LESS*/
gulp.task("less",function(){
    gulp.src("./Mosa/less/*.less")
        .pipe(less({compress: false}))
        .on("error",function(e){console.log(e)})
        .pipe(gulp.dest("../../big_f2e_blog/static/back_end/css/"));
});
/*清理CSS*/
gulp.task("clean", function(){
    gulp.src("../../big_f2e_blog/static/back_end/css/*.css", { read:true })
        .pipe(clean());
});




gulp.task("pack",function(){
     // .pipe(zip('css.zip',{Default:true}))
    gulp.src(['./css/fonts/*'])
    .pipe(gulp.dest('../../big_f2e_blog/static/back_end/css/fonts'));

  

    gulp.src(['./img/**/*'])
    .pipe(gulp.dest('../../big_f2e_blog/static/back_end/img'));

    // gulp.src(['*.html'])
    // .pipe(gulp.dest('dist'));

    gulp.src(['./bootstrap/css/**/*'])
    .pipe(gulp.dest('../../big_f2e_blog/static/back_end/bootstrap/css'));



    gulp.src(['./bootstrap/img/**/*'])
    .pipe(gulp.dest('../../big_f2e_blog/static/back_end/bootstrap/img'));

    
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



