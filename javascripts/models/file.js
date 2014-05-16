var Backbone = require('backbone')
  , Cursor = require('../models/cursor')

var Cursors = Backbone.Collection.extend({
  model: Cursor
})

module.exports = Backbone.Model.extend({
  cursors: null,

  initialize: function() {
    this.cursors = new Cursors
  }
})
