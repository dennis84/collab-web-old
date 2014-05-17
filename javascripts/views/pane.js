var Backbone = require('backbone')
  , _ = require('underscore')
  , hljs = require('highlight.js')
  , templates = require('../templates')
  , Cursor = require('./cursor')

module.exports = Backbone.View.extend({
  className: 'pane',

  initialize: function() {
    this.listenTo(this.model, 'change', this.update)
    this.listenTo(this.model.cursors, 'add', this.addCursor)
    this.listenTo(this.model.cursors, 'add change', this.scrollTo)
  },

  render: function() {
    this.$el.html(_.template(templates['pane.html'], this.model.toJSON()))
    this.update(this.model)
    return this
  },

  update: function(model) {
    var buffer = model.get('buffer')
      , lang = model.get('lang')
      , language = hljs.getLanguage(lang)
      , $code = $('<code class="hljs ' + lang + '"></code>')

    if(!language) {
      var content = hljs.highlightAuto(buffer).value
    } else {
      var content = hljs.highlight(lang, buffer).value
    }

    $code.html(this.withLineNumbers(content))
    this.$('.content').html($code)

    if(true === window.follow) {
      $('#editor .pane').hide()
      this.$el.show()
    }
  },

  addCursor: function(cursor) {
    var view = new Cursor({ 'model': cursor })
    this.$('.cursors').append(view.render().el)
  },

  withLineNumbers: function(code) {
    var linesNum = (1 + code.split('\n').length)
      , lines = new Array(linesNum)

    lines = lines.join('<span></span>')
    return code + '<span class="line-numbers-rows">' + lines + '</span>'
  },

  scrollTo: function(cursor) {
    if(this.model.id !== cursor.get('file').id) {
      this.model.cursors.remove(cursor, { 'silent': true })
      return
    }

    if(false === window.follow) {
      return;
    }

    var offset = $(window).height() * 0.3

    this.$el.stop().animate({ scrollTop:
      ((cursor.get('y') - 1) * window.lineHeight) - offset + 'px'
    })
  }
})
