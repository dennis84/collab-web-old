var Backbone = require('backbone')
  , _ = require('underscore')
  , Connection = require('./models/connection')
  , Router = require('./router')
  , Editor = require('./views/editor')
  , Navigation = require('./views/navigation')
  , ChangeNick = require('./views/change-nick')
  , Members = require('./collections/members')
  , Cursors = require('./collections/cursors')
  , Page = require('./views/page')
  , Status = require('./views/status')
  , Panes = require('./collections/panes')

Backbone.$ = jQuery
_.templateSettings.interpolate = /\{\{(.+?)\}\}/g
_.templateSettings.evaluate = /\{\%(.+?)\%\}/g

window.follow = false
window.lineHeight = 23
window.members = new Members
window.cursors = new Cursors
window.panes = new Panes
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

window.connection.on('code', function(data) {
  window.panes.update(data)
})

window.connection.on('cursor', function(data, sender) {
  var member = window.members.get(sender)
  window.cursors.update(data, member)
})

var $content    = $('#content')
  , $editor     = $('#editor')
  , $navigation = $('#navigation')
  , $modal      = $('#modal')
  , $page       = $('#page')
  , $status     = $('#status')

//window.follow = new Follow
window.page = new Page({ el: $page })
window.editor = new Editor({ el: $editor })
window.navigation = new Navigation({ el: $navigation })
window.navigation.$('#follow').click()
window.nick = new ChangeNick({ el: $modal })
window.status = new Status({ el: $status })
window.router = new Router

Backbone.history.start()
