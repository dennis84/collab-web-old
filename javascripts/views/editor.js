var Backbone = require('backbone')
  , Pane = require('../views/pane')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.listenTo(window.files, 'add', this.addPane)
    this.listenTo(window.cursors, 'add change:file', this.addCursor)
  },

  addPane: function(file) {
    var view = new Pane({ 'model': file })
    this.$el.prepend(view.render().el)
  },

  addCursor: function(cursor) {
    var file = cursor.get('file')
    if(file) {
      file.cursors.add(cursor)
    }
  }
})
