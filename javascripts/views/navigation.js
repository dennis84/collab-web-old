var Backbone = require('backbone')
  , _ = require('underscore')
  , Member = require('./member')

module.exports = Backbone.View.extend({
  events: {
    'click #follow': 'toggleFollow',
    'click #change-nick': 'changeNick'
  },

  initialize: function() {
    this.listenTo(window.members, 'reset', this.resetMembers)
    this.listenTo(window.members, 'add', this.addMember)
    this.listenTo(window.members, 'remove', this.removeMember)
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
      window.follow.start()
    } else {
      window.follow.stop()
    }
  },

  changeNick: function(e) {
    e.preventDefault()
    window.nick.show()
  }
})
