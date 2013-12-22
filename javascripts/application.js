var Backbone = require('backbone')
  , Router = require('./router')
  , Application = require('./views/application')

Backbone.$ = jQuery

window.app = new Application
window.router = new Router
window.app.render()
Backbone.history.start()
