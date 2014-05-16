var Backbone = require('backbone')
  , _ = require('underscore')
  , File = require('../models/file')

module.exports = Backbone.Collection.extend({
  model: File,

  update: function(data) {
    var model = this.findWhere({ 'path': data.path })
    if(_.isUndefined(model)) {
      this.add(new File(data))
    } else {
      model.set(data, { 'silent': true })
      model.trigger('change', model)
    }
  }
})
