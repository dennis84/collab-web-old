var Backbone = require('backbone')

module.exports = Backbone.Model.extend({

  connect: function() {
    var connection = new WebSocket(this.get('url'))
      , model = this

    connection.onmessage = function(e) {
      var r = JSON.parse(e.data)
        , t = r.t
        , d = r.d

      if('online' === t) {
        model.trigger('online', d)
      }

      if('code' === t) {
        model.trigger('code', d)
      }
    }
  }
})