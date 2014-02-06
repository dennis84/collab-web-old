var Backbone = require('backbone')
  , _ = require('underscore')
  , Follow = require('./follow')
  , Member = require('./member')
  , templates = require('../templates')

module.exports = Backbone.View.extend({
  events: {
    'click #follow': 'toggleFollow',
    'click #change-username': 'changeUsername'
  },

  initialize: function() {
    this.listenTo(window.members, 'reset', this.resetMembers)
    this.listenTo(window.members, 'add', this.addMember)
    this.listenTo(window.members, 'remove', this.removeMember)
    this.listenTo(window.connection, 'opened', this.updateNav)
    this.follow = new Follow
  },

  updateNav: function() {
    this.$("#settings").removeClass('hidden')
  },

  resetMembers: function(members) {
    this.$('#members').html('')
    members.each(this.addMember, this)
  },

  addMember: function(member) {
    var view = new Member({
      model: member,
      collection: window.members
    })

    this.$('#members').append(view.render().el)
    this.$('#online').html(window.members.length)
  },

  removeMember: function() {
    this.resetMembers(window.members)
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
