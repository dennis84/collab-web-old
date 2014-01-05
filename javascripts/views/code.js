var Backbone = require('backbone')
  , hljs = require('highlight.js')
  , diff = require('diff')

module.exports = Backbone.View.extend({
  lineHeight: 23,
  code: '',

  initialize: function(options) {
    this.listenTo(window.connection, 'code', this.updateCode)
    this.listenTo(window.connection, 'clean', this.cleanCode)
  },

  cleanCode: function(data) {
    var content = data.content
      , node = document.createElement('code')

    this.renderCode(data.name, content)
  },
  
  updateCode: function(data) {
    var patch = 'Index: foo\n\n' + data.content
      , content = diff.applyPatch(this.code, patch)

    this.renderCode(data.name, content)
  },

  renderCode: function(filename, content) {
    var node = document.createElement('code')
    this.code = content

    node.appendChild(document.createTextNode(content))
    hljs.highlightBlock(node, hljs.tabReplace)

    this.$el.html(node)
  }
})
