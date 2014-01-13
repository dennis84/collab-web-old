var Backbone = require('backbone')

module.exports = Backbone.View.extend({
  lineHeight: 23,

  initialize: function() {
    this.listenTo(window.connection, 'cursor', this.update)
  },

  update: function(data) {
    this.$el.css({
      'top':  (data.y - 1) * this.lineHeight + 'px',
      'left': (data.x - 1) + 'ch'
    })
  }
})
