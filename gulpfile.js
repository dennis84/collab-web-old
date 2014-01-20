var gulp = require('gulp')
  , concat = require('gulp-concat')
  , browserify = require('gulp-browserify')
  , less = require('gulp-less')
  , templates = require('./gulp-templates')

gulp.task('stylesheets', function() {
  gulp.src('stylesheets/main.less')
    .pipe(less({ compress: true }))
    .pipe(gulp.dest('./stylesheets'))
})

gulp.task('javascripts', function() {
  gulp.run('templates')
  gulp.src('javascripts/application.js')
    .pipe(browserify())
    .pipe(concat('application.pack.js'))
    .pipe(gulp.dest('./javascripts'))
})

gulp.task('templates', function() {
  gulp.src('templates/**')
    .pipe(templates('templates.js'))
    .pipe(gulp.dest('./javascripts'))
})

gulp.task('default', function() {
  gulp.watch([
    'javascripts/**',
    '!javascripts/application.pack.js',
    '!javascripts/templates.js',
    'templates/**',
    'stylesheets/*.less',
    'index.html'
  ], function(event) {
    gulp.run('stylesheets', 'javascripts')
  })
})
