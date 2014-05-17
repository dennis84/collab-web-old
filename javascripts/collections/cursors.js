var Backbone = require('backbone')
  , _ = require('underscore')
  , Cursor = require('../models/cursor')

module.exports = Backbone.Collection.extend({
  model: Cursor,

  update: function(data, member) {
    var model = this.get(member.id)
    var file = window.files.get(data.path)

    if(_.isUndefined(model)) {
      this.add(new Cursor({
        'id': member.id,
        'name': member.get('name'),
        'file': data.path,
        'x': data.x,
        'y': data.y
      }))
    } else {
      model.set({ 'x': data.x, 'y': data.y, 'file': file })
    }
  }
})
