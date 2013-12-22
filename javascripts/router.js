var Backbone = require('backbone')
  , Home = require('./views/home')
  , Code = require('./views/code')

module.exports = Backbone.Router.extend({
  routes: {
    '':    'home',
    ':id': 'room'
  },

  home: function() {
    var home = new Home
    window.app.setView(home).render()
  },

  room: function(id) {
    if(id.length < 3) {
      throw new Error('The room ID must have a min length of 3 chars')
    }

    var code = new Code({ room: id })
    window.app.setView(code).render()
  }
})
