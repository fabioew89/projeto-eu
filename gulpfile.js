const  {series, src, dest, watch} = require('gulp');
const html = require('gulp-htmlmin');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

function clearHtml(){
  return src('./src/index.html')
        .pipe(html({collapseWhitespace:true}))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(dest('./dist/'))
        .pipe(browserSync.stream())
}

function clearSass(){
  return src('./src/scss/style.scss')
        .pipe(sass({outputStyle:'collapsed'}))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())

}

function BS(){
  browserSync.init({
    server:{
      baseDir:'./dist/'
    }
  })

  watch('./src/index.html', clearHtml)
  watch('./src/scss/style.scss', clearSass)
}

exports.default = series(BS, clearHtml, clearSass)
