const { src, dest, series, watch, parallel } = require('gulp')
const babel = require('gulp-babel')
const rename = require("gulp-rename")
const uglify = require('gulp-uglify')
const browserSync = require("browser-sync").create()
const pluginName = 'fluidscroll'

function babelTask () {
  return src('./src/index.js')
          .pipe(rename(`${pluginName}.js`))
          .pipe(babel({
            presets: ['@babel/preset-env']
          }))
          .pipe(dest('./dist/'))
          .pipe(browserSync.stream())
}
function uglifyTask () {
  return src(`./dist/${pluginName}.js`)
          .pipe(rename(`${pluginName}.min.js`))
          .pipe(uglify())
          .pipe(dest('./dist/'))
          .pipe(browserSync.stream())
}

function serverTask() {
  browserSync.init({
    server: {
      baseDir: "./demo"
    }
  })
  watch('./src/*', jsTask)
  watch('./demo/*.html').on('change', browserSync.reload);
}

const jsTask = series(babelTask, uglifyTask)

exports.build = jsTask
exports.default = parallel(serverTask, jsTask)
