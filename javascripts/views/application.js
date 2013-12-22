var Backbone = require('backbone')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  id: 'application',
  view: null,

  render: function() {
    this.$el.html(templates.application)
    $('body').html(this.el)
  },

  setView: function(view) {
    if(this.view && this.view.close) {
      this.view.close()
    }

    view.setElement(this.$('#container'))
    this.view = view
    return view
  }
})
