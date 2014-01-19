var gulp = require('gulp')
  , concat = require('gulp-concat')
  , browserify = require('gulp-browserify')
  , less = require('gulp-less')

gulp.task('stylesheets', function() {
  gulp.src('stylesheets/main.less')
    .pipe(less({ compress: true }))
    .pipe(gulp.dest('./stylesheets'))
})

gulp.task('javascripts', function() {
  gulp.src('javascripts/application.js')
    .pipe(browserify())
    .pipe(concat('application.pack.js'))
    .pipe(gulp.dest('./javascripts'))
})

gulp.task('default', function() {
  gulp.watch([
    'javascripts/**',
    '!javascripts/application.pack.js',
    'stylesheets/*.less',
    'index.html'
  ], function(event) {
    gulp.run(['stylesheets', 'javascripts'])
  })
})
