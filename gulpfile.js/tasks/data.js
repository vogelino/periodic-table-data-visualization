var config       = require('../config')
if(!config.tasks.data) return

var browserSync  = require('browser-sync')
var gulp         = require('gulp')
var handleErrors = require('../lib/handleErrors')
var path         = require('path')
var fs           = require('fs')

var paths = {
  src: [path.join(config.root.src, config.tasks.data.src, '/**/*.json')],
  dest: path.join(config.root.dest, config.tasks.data.dest),
}

var dataTask = function() {
  return gulp.src(paths.src)
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('data', dataTask)
module.exports = dataTask
