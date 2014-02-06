var Backbone = require('backbone')
  , Member = require('../models/member')

module.exports = Backbone.Collection.extend({
  model: Member
})
