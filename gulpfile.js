/**
 * gulp 配置文件
 * @author      {coa}
 * @verstion    {1.0}
 * @create      {2017/09}
 * @update      {2017/09}
 */
let gulp = require('gulp');
// 更名
let rename = require("gulp-rename");
// 压缩js
let uglify = require('gulp-uglify');

// 路径及文件
const PATH = {
    src: './src.js',
    dist: './',
}

// 处理器
let handle = {
    Errors: function(err){
        console.log('-------------- '+ chalk.bold.red('~ Error ~') +' ------------')
        console.log('message => ' + err.message)
        console.log('plugin => ' + chalk.bold.red(err.plugin))
        gulp.src(err.fileName) 
            .pipe( notify("Error => <%= file.relative %>\nLine => " + err.lineNumber) )
    },
    Success: function(event){
        console.log('-------------- '+ chalk.bold.green(event.type) +' ------------')
        console.log('fileName => ' + event.path);   
    }
}

// 压缩 js 文件
gulp.task('compress', function() {
    gulp.src(PATH.src)
        .pipe(uglify())
        // .on('error', handle.Errors)
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(PATH.dist));
});

// 监听任务
gulp.task('default', function(){  
    let watchJs = gulp.watch(PATH.src, ['compress']);  
    // watchJs.on('change', handle.Success)
})
