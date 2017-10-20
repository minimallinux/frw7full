var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var browserify = require('gulp-browserify');
var minifyHtml = require('gulp-minify-html');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
gulp.task('css',function(){
    gulp.src(['css/**/*.css'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(gulp.dest('css/dist'))
        .pipe(reload())
});
gulp.task('js',function(){
    gulp.src(['js/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
          .pipe(browserify())
        .pipe(gulp.dest('js/dist'))
        .pipe(reload())
});
gulp.task('image',function(){
    gulp.src(['img/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(cache(imageMin()))
        .pipe(gulp.dest('images/dist'))
        .pipe(reload())
});
gulp.task('default',function(){
    browserSync.init({
        proxy: "./fw7full"
    });
    gulp.watch('js/**/*.js',['js']);
    gulp.watch('css/**/*.css',['css']);
    gulp.watch('img/**/*',['image']);
});
