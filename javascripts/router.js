var Backbone = require('backbone')
  , templates = require('./templates')

module.exports = Backbone.Router.extend({
  routes: {
    '':    'home',
    ':id': 'room'
  },

  home: function() {
    window.editor.$el.hide()
    window.navigation.$el.hide()
    window.page.$el.show()
    window.page.render(templates['home.html'])
  },

  room: function(id) {
    if(id.length < 3) {
      throw new Error('The room ID must have a min length of 3 chars')
    }

    window.page.$el.hide()
    window.editor.$el.show()
    window.navigation.$el.show()
    window.connection.connect(id)
  }
})
