var Backbone = require('backbone')

module.exports = Backbone.Model.extend({

  connect: function() {
    var connection = new WebSocket(this.get('url'))
      , model = this

    connection.onmessage = function(e) {
      var r = JSON.parse(e.data)
      model.trigger(r.t, r.d)
    }
  }
})
