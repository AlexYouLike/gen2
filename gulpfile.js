const { src, dest, parallel, series, watch } = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const browserSync = require('browser-sync').create()
const del = require('del')
const watchify = require('watchify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const log = require('gulplog')
const glob = require('glob')
const es = require('event-stream')
const browserify = require('browserify')
const imagemin = require('gulp-imagemin')




const { routes } = require('./routes')

const clean = () => del(['dist'])


function views(cb) {
  routes.forEach(route => {
    return src(`${route.src}/index.html`)
      .pipe(dest(`${route.dist}`))
      .pipe(browserSync.reload({stream:true}))
  })
  cb()
}

function css(cb) {
  routes.forEach(route => {
    return src(`${route.src}/styles/main.scss`)
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(concat('main.css'))
      .pipe(dest(`${route.dist}styles/`))
      .pipe(browserSync.reload({stream:true}))
  })
  cb()
}

function images(cb) {
  routes.forEach(route => {
    return src(`${route.src}/images/*`)
      .pipe(imagemin())
      .pipe(dest(`${route.dist}images/`))
      .pipe(browserSync.reload({stream:true}))
  })
  cb()
}

// TODO je crois qu'il faut ajouter les modules car sinon browserify les trouve pas...

function js(cb) {
  routes.forEach(route => {
    return browserify({
      entries: [`${route.src}scripts/main.js`]
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(dest(`${route.dist}scripts/`))
    .pipe(browserSync.reload({stream:true}))
  })
  cb()
}

function serve() {
  browserSync.init({
    server: './dist/'
  })
}

function watchTask() {
  routes.forEach(route => {
    watch(
      [`${route.src}index.html`, `${route.src}**/*.js`, `${route.src}**/*.scss`],
      series(clean, views, css, images, js)
    )
  })
}



exports.w = watchTask

const bld = series(clean, views, css, images, js)

exports.build = bld

exports.start = parallel(bld, serve, watchTask)
