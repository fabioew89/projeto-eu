const  {series, src, dest, watch} = require('gulp');
const html = require('gulp-htmlmin');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

// Limpa e minifica o arquivo html e manda para o ./dist
function clearHtml(){
  return src('./src/index.html')
        .pipe(html({collapseWhitespace:true}))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(dest('./dist/'))
        .pipe(browserSync.stream())
}

// Limpa e minifica o arquivos scss e manda para o ./dist/css/
function clearSass(){
  return src('./src/scss/style.scss')
        .pipe(sass({outputStyle:'compressed'}))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream())

}

// Manda todas as imagens para o ./dist/img/
function copyImg(){
  return src('./src/img/**/*')
  .pipe(dest('./dist/img'))
}

function BS(){
  browserSync.init({
    server:{
      baseDir:'./dist/'
    }
  })

  watch('./src/index.html', clearHtml)
  watch('./src/scss/*.scss', clearSass)
  watch('./src/img/**/*', copyImg)

}

exports.copyImg = copyImg
exports.default = series(clearHtml, clearSass, copyImg, BS)
