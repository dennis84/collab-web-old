var gulp = require('gulp')
  , concat = require('gulp-concat')
  , browserify = require('gulp-browserify')
  , es = require('event-stream')
  , path = require('path')
  , util = require('gulp-util')

gulp.task('compile', function() {
  gulp.run('templates')
  gulp.src('javascripts/application.js')
    .pipe(browserify())
    .pipe(concat('application.pack.js'))
    .pipe(gulp.dest('./javascripts'))
})

gulp.task('templates', function() {
  var templates = gulp.src('templates/*.html')
    .pipe(function() {
      var templates = {}
        , first = null

      function bufferContents(file) {
        if(null === first) {
          first = file
        }

        templates[path.basename(file.path, '.html')] = String(file.contents)
      }

      function endStream() {
        var output = 'module.exports = ' + JSON.stringify(templates)
        var joinedFile = new util.File({
          cwd:  first.cwd,
          base: first.base,
          path: first.path,
          contents: new Buffer(output)
        })

        this.emit('data', joinedFile)
        this.emit('end')
      }

      return es.through(bufferContents, endStream)
    }())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./javascripts'))
})

gulp.task('default', function() {
  gulp.watch([
    'javascripts/**',
    'stylesheets/**',
    'templates/*.html'
  ], function(event) {
    gulp.run('compile')
  })
})
