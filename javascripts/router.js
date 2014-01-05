var Backbone = require('backbone')

module.exports = Backbone.Router.extend({
  routes: {
    '':    'home',
    ':id': 'room'
  },

  home: function() {
  },

  room: function(id) {
    if(id.length < 3) {
      throw new Error('The room ID must have a min length of 3 chars')
    }

    window.connection.connect(id)
  }
})
