/**
 * gulp 配置文件
 * @author      {Coac}
 * @verstion    {1.0}
 * @create      {2017/06}
 * @update      {2017/09}
 */
const gulp = require('gulp');
// ES6 to ES5
const babel = require('gulp-babel');
// 更名
const rename = require("gulp-rename");
// 压缩js
const uglify = require('gulp-uglify');
// 桌面通知
const notify = require('gulp-notify');

// 路径及文件
const PATH = {
    src: './src.js',
    dist: './',
}

// 处理错误
const reportError = function (error) {
    notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);

    console.log(error.toString());

    this.emit('end');
}

function compress() {
    gulp.src(PATH.src)
        .pipe(babel(
            {
                'presets': ['es2015']
            }
        ))
        .pipe(uglify())
        .on('error', reportError)
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(PATH.dist));
}

compress();

// 压缩 js 文件
gulp.task('compress', compress);

// 监听任务
gulp.task('default', function(){  
    gulp.watch(PATH.src, ['compress']);  
})
