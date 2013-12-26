var es = require('event-stream')
  , path = require('path')
  , util = require('gulp-util')

module.exports = function(filename) {
  if (!filename) {
    throw new Error("Missing filename option for gulp-templates")
  }

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
      , joinedPath = path.join(first.base, filename)

    var joinedFile = new util.File({
      cwd:  first.cwd,
      base: first.base,
      path: joinedPath,
      contents: new Buffer(output)
    })

    this.emit('data', joinedFile)
    this.emit('end')
  }

  return es.through(bufferContents, endStream)
};
