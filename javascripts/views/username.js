var Backbone = require('backbone')
  , _ = require('underscore')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  events: {
    'click #save-username': 'save'
  },

  initialize: function() {
    this.$el.on('hidden.bs.modal', _.bind(this.close, this))
  },

  show: function() {
    this.$el.html(_.template(templates['username.html'], {}))
    this.$el.modal('show')
  },

  close: function() {
    this.$el.html('')
    this.stopListening()
  },

  save: function(e) {
    e.preventDefault()
    var username = this.$('#username').val()
    if(_.isEmpty(username)) {
      this.$el.modal('hide')
    }

    window.connection.socket.send(JSON.stringify({
      't': 'member',
      'd': username
    }))

    this.$el.modal('hide')
  }
})
