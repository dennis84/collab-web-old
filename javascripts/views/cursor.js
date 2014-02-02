var Backbone = require('backbone')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.listenTo(window.connection, 'cursor', this.update)
  },

  update: function(data) {
    this.$el.css({
      'top':  (data.y - 1) * window.lineHeight + 'px',
      'left': (data.x - 1 + 6) + 'ch'
    })
  }
})
