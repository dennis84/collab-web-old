var Backbone = require('backbone')

module.exports = Backbone.Model.extend({

  connect: function(room) {
    var connection = new WebSocket(this.get('url') + '/' + room)
      , model = this

    connection.onmessage = function(e) {
      var r = JSON.parse(e.data)
      model.trigger(r.t, r.d)
    }
  }
})
