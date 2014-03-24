var Backbone = require('backbone')
  , _ = require('underscore')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  className: 'cursor-container',

  initialize: function() {
    this.listenTo(this.model, 'change', this.move)
    this.listenTo(this.model, 'change:name', this.render)
    this.listenTo(this.model, 'remove', this.remove)
  },

  render: function() {
    this.move()
    this.$el.html(_.template(templates['cursor.html'], this.model.toJSON()))
    this.$el.tooltip('destroy')

    var view = this
    // Fixes tooltip position
    setTimeout(function() {
      view.$el.tooltip({
        'placement': 'top',
        'title': view.model.get('name') || this.model.id,
        'container': view.$el
      })

      view.$el.tooltip('show')

      setTimeout(function() {
        view.$el.tooltip('hide')
      }, 3000)
    }, 200)

    return this
  },

  move: function() {
    var x = this.model.get('x')
      , y = this.model.get('y')

    this.$el.css({
      'top':  (y - 1) * window.lineHeight + 'px',
      'left': (x - 1) + 'ch'
    })
  },

  remove: function(cursor) {
    this.$el.tooltip('destroy')
    this.$el.remove()
  }
})
