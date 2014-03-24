var Backbone = require('backbone')
  , hljs = require('highlight.js')

module.exports = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(window.connection, 'code', this.updateCode)
  },

  updateCode: function(data) {
    var language = hljs.getLanguage(data.lang)
      , $code = $('<code class="hljs ' + data.lang + '"></code>')

    if(!language) {
      var content = hljs.highlightAuto(data.buffer).value
    } else {
      var content = hljs.highlight(data.lang, data.buffer).value
    }

    $code.html(this.withLineNumbers(content))
    this.$el.html($code)
  },

  withLineNumbers: function(code) {
    var linesNum = (1 + code.split('\n').length)
      , lines = new Array(linesNum)

    lines = lines.join('<span></span>')

    return code + '<span class="line-numbers-rows">' + lines + '</span>'
  }
})
