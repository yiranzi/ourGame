var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    console.log('this is glup task');
});


var jsdoc = require('gulp-jsdoc3');
var connect = require('gulp-connect');

gulp.task('doc', function (cb) {

    var config = require('./jsdoc.json');
    gulp.src(['README.md', './lib/**/*.js'], {
            read: false
        })
        .pipe(jsdoc(config, cb));
    connect.server({
        root: './docs/gen',
        livereload: true,
        port: 9001 //服务器端口
    });

});

gulp.task('prod', function (cb) {
    connect.server({
        root: './prod',
        port: 9000,
        middleware: function () {
            return [
                require('connect-gzip').gzip()
            ];
        }
    });
})


//压缩html
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function () {
    gulp.src('./prod/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('prod'));
});

//压缩css
var cssnano = require('gulp-cssnano');
gulp.task('style', function () {
    gulp.src(['./prod/*.css'])
        .pipe(cssnano())
        .pipe(gulp.dest('prod/'));
});

//压缩js
var uglify = require('gulp-uglify');
var pump = require('pump');



gulp.task('compress', function (cb) {
    pump([
            gulp.src('prod/*.js'),
            uglify(),
            gulp.dest('prod')
        ],
        cb
    );
});

gulp.task('build:prod', ['html', 'style', 'compress'], function () {
});