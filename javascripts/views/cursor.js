var Backbone = require('backbone')

module.exports = Backbone.View.extend({
  lineHeight: 23,

  initialize: function() {
    this.listenTo(window.connection, 'cursor', this.update)
  },

  update: function(data) {
    this.$el.css({
      'top':  (data.cursor_y - 1) * this.lineHeight + 'px',
      'left': (data.cursor_x - 1) + 'ch'
    })
  }
})
