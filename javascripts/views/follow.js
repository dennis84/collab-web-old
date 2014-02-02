var Backbone = require('backbone')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.body = $('body')
    this.offset = $(window).height() * 0.3
  },

  start: function() {
    this.listenTo(window.connection, 'cursor', this.scrollto)
  },

  stop: function() {
    this.stopListening(window.connection)
  },

  scrollto: function(data) {
    this.body.stop().animate({ scrollTop:
      ((data.y - 1) * window.lineHeight) - this.offset + 'px'
    })
  }
})
