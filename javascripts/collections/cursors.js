var Backbone = require('backbone')
  , Cursor = require('../models/cursor')

module.exports = Backbone.Collection.extend({
  model: Cursor
})
