var Backbone = require('backbone')
  , Connection = require('../models/connection')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  id: 'code',
  lineHeight: 23,

  initialize: function(options) {
    var conn = new Connection({
      url: 'wss://polar-woodland-4270.herokuapp.com/' + options.room
    })

    conn.connect()
    this.listenTo(conn, 'code', this.updateCode)
    this.listenTo(conn, 'online', this.updateNbMembers)
  },

  render: function() {
    this.$el.html(templates.code)
  },

  updateCode: function(data) {
    var node = document.createElement('code')
    node.appendChild(document.createTextNode(data.content))
    hljs.highlightBlock(node, hljs.tabReplace)

    this.$('#content').html(node)
    this.$('#cursor').css({
      'top':  (data.cursor_y - 1) * this.lineHeight + 'px',
      'left': (data.cursor_x - 1) + 'ch'
    })

    this.$('#filename').html('⇒ ' + data.name)
  },

  updateNbMembers: function(data) {
    this.$('#online').html('Online (' + data + ')')
  }
})
