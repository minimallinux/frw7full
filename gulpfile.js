var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
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
        .pipe(gulp.dest('js/dist'))
        .pipe(reload())
});
gulp.task('html',function(){
    gulp.src(['//**/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('./pages'))
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
        proxy: "localhost/fw7full"
    });
    gulp.watch('js/**/*.js',['js']);
    gulp.watch('css/**/*.css',['css']);
    gulp.watch('//**/*.html',['html']);
    gulp.watch('img/**/*',['image']);
});
