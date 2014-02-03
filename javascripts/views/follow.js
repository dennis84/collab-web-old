var Backbone = require('backbone')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.editor = $('#editor')
    this.offset = $(window).height() * 0.3
  },

  start: function() {
    this.listenTo(window.connection, 'cursor', this.scrollto)
  },

  stop: function() {
    this.stopListening(window.connection)
  },

  scrollto: function(data) {
    this.editor.stop().animate({ scrollTop:
      ((data.y - 1) * window.lineHeight) - this.offset + 'px'
    })
  }
})
