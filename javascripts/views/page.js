var Backbone = require('backbone')

module.exports = Backbone.View.extend({
  render: function(template) {
    this.$el.html(template)
  }
})
