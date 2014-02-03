var Backbone = require('backbone')
  , _ = require('underscore')
  , Follow = require('./follow')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  events: {
    'click #follow': 'toggleFollow',
    'click #change-username': 'changeUsername'
  },

  initialize: function() {
    this.listenTo(window.connection, 'online', this.updateNbMembers)
    this.listenTo(window.connection, 'online', this.updateMembers)
    this.listenTo(window.connection, 'opened', this.updateNav)
    this.follow = new Follow
  },

  updateNav: function() {
    this.$("#settings").removeClass('hidden')
  },

  updateNbMembers: function(data) {
    this.$('#online').html(data.length)
  },

  updateMembers: function(data) {
    var html = _.template(templates['members.html'], { 'members': data })
    this.$('#members').html(html)
  },

  toggleFollow: function(e) {
    if(true === e.currentTarget.checked) {
      this.follow.start()
    } else {
      this.follow.stop()
    }
  },

  changeUsername: function(e) {
    e.preventDefault()
    window.username.show()
  }
})
