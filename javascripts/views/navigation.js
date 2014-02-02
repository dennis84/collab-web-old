var Backbone = require('backbone')
  , _ = require('underscore')
  , Follow = require('./follow')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  events: {
    'click #follow': 'toggleFollow'
  },

  initialize: function() {
    this.listenTo(window.connection, 'online', this.updateNbMembers)
    this.listenTo(window.connection, 'online', this.updateMembers)
    this.follow = new Follow
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
  }
})
