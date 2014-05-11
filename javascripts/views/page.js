var Backbone = require('backbone')

module.exports = Backbone.View.extend({
  events: {
    'click .btn-next-section': 'nextSection'
  },

  render: function(template) {
    this.$el.html(template)
  },

  nextSection: function(e) {
    e.preventDefault()
    var elem = $(e.target).closest('section').next()
    $('body').animate({
      scrollTop: elem.offset().top
    }, 200)
  }
})
