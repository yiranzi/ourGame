var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var FTPS = require('ftps');
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
gulp.task('build-manifest', function(){
    var files = fs.readdirSync('prod/')
    var manifest = []
    files.map(file => {
        if (file.indexOf('bundle') !== -1 || file.indexOf('vendors-dll') !== -1) {
            manifest.push({
                name: file,
                res: 'https://h5test.ichangtou.com/minic/vinda/' + file,
                type: file.split('.')[file.split('.').length - 1]
            })
        }
    })
    fs.writeFileSync('prod/manifest.js', JSON.stringify(manifest))
})
gulp.task('uploadFiles', function(){
    var ftps = new FTPS({
        host: '121.40.131.112',
        port: '22000',
        username: 'root',
        password: '5u$L!U3*9l8JD%.h'
    })
    ftps.cd('/home/wwwroot/ichangtou/webapps/h5game/')
    .raw('rm -r ./zhanheng_b')
    .mv('./zhanheng', './zhanheng_b')
    .raw('mkdir')
    .mirror({
        remoteDir: './zhanheng',
        loacalDir: './prod',
        parallel: true,
        upload: true
    }).exec(function (err, res) {
        if (err) {
            console.log('shit')
        } else {
            console.log('yeah')
        }
    })
})
gulp.task('build:prod', ['html', 'style', 'compress', 'build-manifest', 'uploadFiles'], function () {
});

gulp.task('run-webpack-build')