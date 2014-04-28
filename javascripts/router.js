var Backbone = require('backbone')
  , templates = require('./templates')

module.exports = Backbone.Router.extend({
  routes: {
    '':    'home',
    ':id': 'room'
  },

  home: function() {
    $('#layout').hide()
    window.page.$el.show()
    window.page.render(templates['home.html'])
  },

  room: function(id) {
    if(id.length < 3) {
      throw new Error('The room ID must have a min length of 3 chars')
    }

    window.page.$el.hide()
    $('#layout').show()
    window.connection.connect(id)
  }
})
