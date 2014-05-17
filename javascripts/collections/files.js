var Backbone = require('backbone')
  , _ = require('underscore')
  , File = require('../models/file')

module.exports = Backbone.Collection.extend({
  model: File,

  update: function(data) {
    var model = this.get(data.path)

    if(_.isUndefined(model)) {
      this.add(new File({
        'id': data.path,
        'buffer': data.buffer,
        'lang': data.lang,
        'path': data.path
      }))
    } else {
      model.set(data, { 'silent': true })
      model.trigger('change', model)
    }
  }
})
