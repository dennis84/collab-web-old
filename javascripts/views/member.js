var Backbone = require('backbone')
  , _ = require('underscore')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
    this.listenToOnce(window.connection, 'code', this.coding)
  },

  render: function() {
    this.$el.html(_.template(templates['member.html'], this.model.toJSON()))
    return this
  },

  coding: function(data, sender) {
    if(sender === this.model.id) {
      this.model.set('is_coding', true)
    }
  }
})
