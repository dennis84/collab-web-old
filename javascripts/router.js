var Backbone = require('backbone')
  , templates = require('./templates')

module.exports = Backbone.Router.extend({
  routes: {
    '':    'home',
    ':id': 'room'
  },

  home: function() {
    window.connection.trigger('code', {
      'buffer': templates['welcome.md'],
      'lang':   'markdown',
      'path':   'welcome.md'
    })
  },

  room: function(id) {
    if(id.length < 3) {
      throw new Error('The room ID must have a min length of 3 chars')
    }

    window.connection.connect(id)
  }
})
