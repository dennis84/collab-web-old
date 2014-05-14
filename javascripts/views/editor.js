var Backbone = require('backbone')
  , Pane = require('../views/pane')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.listenTo(window.panes, 'add', this.addPane)
    this.listenTo(window.cursors, 'add change:file', this.addCursor)
  },

  addPane: function(pane) {
    var view = new Pane({ 'model': pane })
    this.$el.prepend(view.render().el)
  },

  addCursor: function(cursor) {
    var pane = window.panes.findWhere({ 'path': cursor.get('file') })
    if(pane) {
      pane.cursors.add(cursor)
    }
  }
})
