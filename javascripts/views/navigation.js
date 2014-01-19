var Backbone = require('backbone')
  , Follow = require('./follow')

module.exports = Backbone.View.extend({
  events: {
    'click #follow': 'toggleFollow'
  },

  initialize: function() {
    this.listenTo(window.connection, 'online', this.updateNbMembers)
    this.follow = new Follow
  },

  updateNbMembers: function(data) {
    this.$('#online').html(data)
  },

  toggleFollow: function(e) {
    if(true === e.currentTarget.checked) {
      this.follow.start()
    } else {
      this.follow.stop()
    }
  }
})
