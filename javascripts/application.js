var Backbone = require('backbone')
  , Connection = require('./models/connection')
  , Router = require('./router')
  , Code = require('./views/code')
  , Cursor = require('./views/cursor')
  , Powerline = require('./views/powerline')
  , Navigation = require('./views/navigation')

Backbone.$ = jQuery

window.connection = new Connection({
  url: 'wss://polar-woodland-4270.herokuapp.com'
})

var $content    = $('#content')
  , $cursor     = $('#cursor')
  , $powerline  = $('#powerline')
  , $navigation = $('#navigation')

window.code = new Code({ el: $content })
window.cursor = new Cursor({ el: $cursor })
window.powerline = new Powerline({ el: $powerline })
window.navigation = new Navigation({ el: $navigation })
window.router = new Router

Backbone.history.start()
