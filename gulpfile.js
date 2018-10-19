var gulp = require('gulp');
var html = require('gulp-htmlmin');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

// html
gulp.task('html', function() {
    gulp.src('src/index.html')
      .pipe(html({collapseWhitespace:true}))
      .on("error", notify.onError("Error: <%= error.message %>"))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream())
});

// sass
gulp.task('sass', function() {
    gulp.src('src/scss/style.scss')
      .pipe(sass({outputStyle:"compressed"}))
      .on("error", notify.onError("Error: <%= error.message %>"))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream())
});

// img
gulp.task('moveImg', function() {
    gulp.src('src/img/**/*')
      .pipe(gulp.dest('dist/img/'));
});

// Static server
gulp.task('bs',['html','sass','moveImg'], function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });

    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

// default
gulp.task('default',['bs']);