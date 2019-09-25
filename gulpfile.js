const {series, src, dest, watch} = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();


//Minificar o HTML e mandar para a pasta ./dist
function clearHtml(){
	return src('./src/index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.on("error", notify.onError("Error: <%= error.message %>"))
	.pipe(dest('./dist/'))
	.pipe(browserSync.stream())
}

//Minifica o compila o scss, minifica e manda o pra pasta ./dist
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

// Faz o stream dos arquivos para o navegador
function BS(){
	browserSync.init({
		server:{
			baseDir:'./dist/'
		}
	})
	watch('./src/index.html', clearHtml)
	watch('./src/scss/**/*.scss', clearSass)
	watch('./src/img/', copyImg)
}

// exports.clearHtml = clearHtml
// exports.clearSass = clearSass
// exports.copyImg = copyImg

exports.default = series(clearHtml, clearSass, copyImg, BS)