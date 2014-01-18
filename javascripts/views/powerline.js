var Backbone = require('backbone')
  , Television = require('./television')

module.exports = Backbone.View.extend({
  events: {
    'click #tv': 'toggleTvMode'
  },

  initialize: function() {
    this.television = new Television
    this.listenTo(window.connection, 'code', this.update)
    this.listenTo(window.connection, 'online', this.updateNbMembers)
  },

  update: function(data) {
    this.$('#filename').html('⇒ ' + data.path)
  },

  updateNbMembers: function(data) {
    this.$('#online').html('Online (' + data + ')')
  },

  toggleTvMode: function(e) {
    if(true === e.currentTarget.checked) {
      this.television.start()
    } else {
      this.television.stop()
    }
  }
})
