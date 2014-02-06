var Backbone = require('backbone')
  , _ = require('underscore')
  , Connection = require('./models/connection')
  , Router = require('./router')
  , Code = require('./views/code')
  , Cursor = require('./views/cursor')
  , Powerline = require('./views/powerline')
  , Navigation = require('./views/navigation')
  , Username = require('./views/username')
  , Members = require('./collections/members')

Backbone.$ = jQuery
_.templateSettings.interpolate = /\{\{(.+?)\}\}/g
_.templateSettings.evaluate = /\{\%(.+?)\%\}/g

window.lineHeight = 19
window.members = new Members
window.connection = new Connection({
  url: 'wss://polar-woodland-4270.herokuapp.com'
})

window.connection.on('opened', function(conn) {
  conn.socket.send(JSON.stringify({ 't': 'members' }))
})

window.connection.on('members', function(data) {
  window.members.reset(data)
})

window.connection.on('leave', function(id) {
  window.members.remove(id)
})

window.connection.on('join', function(id) {
  window.members.add({ 'id': id, 'name': id })
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
