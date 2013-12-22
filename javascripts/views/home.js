var Backbone = require('backbone')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  id: 'home',

  render: function() {
    this.$el.html(templates.home)
  }
})
