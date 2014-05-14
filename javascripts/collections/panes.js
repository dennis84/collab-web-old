var Backbone = require('backbone')
  , _ = require('underscore')
  , Pane = require('../models/pane')

module.exports = Backbone.Collection.extend({
  model: Pane,

  update: function(data) {
    var model = this.findWhere({ 'path': data.path })
    if(_.isUndefined(model)) {
      this.add(new Pane(data))
    } else {
      model.set(data, { 'silent': true })
      model.trigger('change', model)
    }
  }
})
