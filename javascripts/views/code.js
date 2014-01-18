var Backbone = require('backbone')
  , hljs = require('highlight.js')

module.exports = Backbone.View.extend({
  lineHeight: 23,

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

    $code.html(content)
    this.$el.html($code)
  }
})
