var Backbone = require('backbone')
  , CursorView = require('./cursor')
  , Cursor = require('../models/cursor')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.listenTo(window.connection, 'cursor', this.onCursor)
    this.listenTo(window.connection, 'code', this.onCode)
  },

  onCursor: function(data, sender) {
    var member = window.members.get(sender)
      , cursor = window.cursors.get(sender)

    if(!cursor) {
      cursor = new Cursor({
        'id': sender,
        'x': data.x,
        'y': data.y
      })

      cursor.setMember(member)
      window.cursors.add(cursor)

      var view = new CursorView({
        'model': cursor,
        'collection': window.cursors
      })

      this.$el.append(view.render().el)
    } else {
      cursor.set(data)
    }
  },

  onCode: function(data) {
    this.$('#filename').html(data.path)
  }
})
