var Backbone = require('backbone')
  , _ = require('underscore')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.listenToOnce(window.connection, 'open', this.open)
    this.listenToOnce(window.connection, 'opened', this.opened)
    this.listenToOnce(window.connection, 'closed', this.closed)
    this.listenToOnce(window.connection, 'code', this.hide)
  },

  show: function(status) {
    this.$el.html(_.template(templates['status-' + status + '.html'], {}))
    this.$el.show()
  },

  hide: function(data) {
    this.$el.hide()
  },

  opened: function(conn) {
    this.show('open')
  },

  opened: function(conn) {
    this.show('opened')
  },

  closed: function(conn) {
    this.show('closed')
  }
})
