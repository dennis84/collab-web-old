var Backbone = require('backbone')

module.exports = Backbone.Model.extend({
  socket: null,

  connect: function(room) {
    this.trigger('open', this)

    this.socket = new WebSocket(this.get('url') + '/' + room)

    var model = this

    this.socket.onmessage = function(e) {
      var r = JSON.parse(e.data)
      model.trigger(r.t, r.d, r.s)
    }

    this.socket.onopen = function() {
      model.trigger('opened', model)
    }

    this.socket.onclose = function() {
      model.trigger('closed', model)
    }
  }
})
