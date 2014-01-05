var Backbone = require('backbone')
  , Connection = require('../models/connection')
  , templates = require('../templates')
  , hljs = require('highlight.js')
  , diff = require('diff')

module.exports = Backbone.View.extend({
  id: 'code',
  lineHeight: 23,
  code: '',

  initialize: function(options) {
    var conn = new Connection({
      url: 'wss://iolar-woodland-4270.herokuapp.com/' + options.room
    })

    conn.connect()
    this.listenTo(conn, 'code', this.updateCode)
    this.listenTo(conn, 'clean', this.cleanCode)
    this.listenTo(conn, 'cursor', this.updateCursor)
    this.listenTo(conn, 'online', this.updateNbMembers)
  },

  render: function() {
    this.$el.html(templates.code)
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

    this.$('#content').html(node)
    this.$('#filename').html('⇒ ' + filename)
  },

  updateCursor: function(data) {
    this.$('#cursor').css({
      'top':  (data.cursor_y - 1) * this.lineHeight + 'px',
      'left': (data.cursor_x - 1) + 'ch'
    })
  },

  updateNbMembers: function(data) {
    this.$('#online').html('Online (' + data + ')')
  }
})
