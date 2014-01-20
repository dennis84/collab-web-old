var Backbone = require('backbone')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.listenTo(window.connection, 'code', this.update)
  },

  update: function(data) {
    this.$el.html(data.path)
  }
})
