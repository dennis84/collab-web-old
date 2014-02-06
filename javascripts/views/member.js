var Backbone = require('backbone')
  , _ = require('underscore')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  tagName: 'li',

  render: function() {
    this.$el.html(_.template(templates['member.html'], this.model.toJSON()))
    return this
  }
})
