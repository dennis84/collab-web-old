var Backbone = require('backbone')
  , _ = require('underscore')
  , Connection = require('./models/connection')
  , Router = require('./router')
  , Code = require('./views/code')
  , Cursor = require('./views/cursor')
  , Powerline = require('./views/powerline')
  , Navigation = require('./views/navigation')
  , Username = require('./views/username')

Backbone.$ = jQuery
_.templateSettings.interpolate = /\{\{(.+?)\}\}/g
_.templateSettings.evaluate = /\{\%(.+?)\%\}/g

window.lineHeight = 19
window.connection = new Connection({
  url: 'wss://polar-woodland-4270.herokuapp.com'
})

var $content    = $('#content')
  , $cursor     = $('#cursor')
  , $powerline  = $('#powerline')
  , $navigation = $('#navigation')
  , $modal      = $('#modal')

window.code = new Code({ el: $content })
window.cursor = new Cursor({ el: $cursor })
window.powerline = new Powerline({ el: $powerline })
window.navigation = new Navigation({ el: $navigation })
window.username = new Username({ el: $modal })
window.router = new Router

Backbone.history.start()
