var gulp = require('gulp')
  , concat = require('gulp-concat')
  , browserify = require('gulp-browserify')
  , less = require('gulp-less')
  , templates = require('./gulp-templates.js')

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
  gulp.src('templates/*.html')
    .pipe(templates('templates.js'))
    .pipe(gulp.dest('./javascripts'))
})

gulp.task('default', function() {
  gulp.watch([
    'javascripts/**',
    '!javascripts/templates.js',
    '!javascripts/application.pack.js',
    'stylesheets/*.less',
    'templates/*.html'
  ], function(event) {
    gulp.run(['stylesheets', 'javascripts'])
  })
})
