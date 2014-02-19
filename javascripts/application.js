var Backbone = require('backbone')
  , _ = require('underscore')
  , Connection = require('./models/connection')
  , Router = require('./router')
  , Code = require('./views/code')
  , Editor = require('./views/editor')
  , Powerline = require('./views/powerline')
  , Navigation = require('./views/navigation')
  , ChangeNick = require('./views/change-nick')
  , Members = require('./collections/members')
  , Cursors = require('./collections/cursors')

Backbone.$ = jQuery
_.templateSettings.interpolate = /\{\{(.+?)\}\}/g
_.templateSettings.evaluate = /\{\%(.+?)\%\}/g

window.lineHeight = 19
window.members = new Members
window.cursors = new Cursors
window.connection = new Connection({
  url: 'wss://polar-woodland-4270.herokuapp.com'
})

window.connection.on('opened', function(conn) {
  conn.socket.send(JSON.stringify({ 't': 'members' }))
})

window.connection.on('members', function(data) {
  window.members.reset(data)
})

window.connection.on('update-member', function(data) {
  var member = window.members.get(data.id)
  if(member) {
    member.set("name", data.name)
  }
})

window.connection.on('leave', function(id) {
  window.members.remove(id)
  window.cursors.remove(id)
})

window.connection.on('join', function(id) {
  window.members.add({ 'id': id, 'name': id })
})

var $content    = $('#content')
  , $editor     = $('#editor')
  , $powerline  = $('#powerline')
  , $navigation = $('#navigation')
  , $modal      = $('#modal')

window.code = new Code({ el: $content })
window.editor = new Editor({ el: $editor })
window.powerline = new Powerline({ el: $powerline })
window.navigation = new Navigation({ el: $navigation })
window.nick = new ChangeNick({ el: $modal })
window.router = new Router

Backbone.history.start()
