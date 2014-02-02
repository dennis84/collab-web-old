var Backbone = require('backbone')

module.exports = Backbone.Model.extend({
  socket: null,

  connect: function(room) {
    var model = this
    this.socket = new WebSocket(this.get('url') + '/' + room)

    this.socket.onmessage = function(e) {
      var r = JSON.parse(e.data)
      model.trigger(r.t, r.d)
    }

    this.socket.onopen = function() {
      model.trigger('opened', model)
    }
  }
})
