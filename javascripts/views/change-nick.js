var Backbone = require('backbone')
  , _ = require('underscore')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  events: {
    'click #save-nick': 'save'
  },

  initialize: function() {
    this.$el.on('hidden.bs.modal', _.bind(this.close, this))
    this.$el.on('shown.bs.modal', _.bind(this.focus, this))
  },

  show: function() {
    this.$el.html(_.template(templates['change-nick.html'], {}))
    this.$el.modal('show')
  },

  close: function() {
    this.$el.html('')
    this.stopListening()
  },

  focus: function() {
    this.$('#nick').focus()
  },

  save: function(e) {
    e.preventDefault()
    var nick = this.$('#nick').val()
    if(_.isEmpty(nick)) {
      this.$el.modal('hide')
    }

    window.connection.socket.send(JSON.stringify({
      't': 'update-nick',
      'd': nick
    }))

    this.$el.modal('hide')
  }
})
