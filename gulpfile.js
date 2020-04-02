const { src, dest, series } = require('gulp')
const babel = require('gulp-babel')
const rename = require("gulp-rename")
const uglify = require('gulp-uglify')
const pluginName = 'fluidscroll'

function babelTask () {
  return src('./src/index.js')
          .pipe(rename(`${pluginName}.js`))
          .pipe(babel({
            presets: ['@babel/preset-env']
          }))
          .pipe(dest('./dist/')) 
}
function uglifyTask () {
  return src(`./dist/${pluginName}.js`)
          .pipe(rename(`${pluginName}.min.js`))
          .pipe(uglify())
          .pipe(dest('./dist/'))
}

function copyToDemoTask () {
  return src(`./dist/${pluginName}.min.js`)
          .pipe(dest('./demo/'))
}

exports.default = series(babelTask, uglifyTask, copyToDemoTask)
