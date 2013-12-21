// var App = function($html, endpoint, room) {

//   if(room.length < 3) {
//     throw new Error("The room ID must have a min length of 3 chars")
//   }

//   var connection
//     , lineHeight = 21
//     , $content   = $html.find("#content")
//     , $cursor    = $html.find("#cursor")
//     , $powerline = $html.find("#powerline")

//   var broadcast = function(e) {
//     console.log("Message received")
//       console.log(e)
//     // var response = JSON.parse(e.data.data)
//     //   , node = document.createElement("code")

//     // node.appendChild(document.createTextNode(response.content))
//     // hljs.highlightBlock(node, hljs.tabReplace)

//     // $content.html(node)
//     // $powerline.html("⇒ " + response.name)

//     // $cursor.css({
//     //   "top":  (response.cursor_y - 1) * lineHeight + "px",
//     //   "left": (response.cursor_x - 1) + "ch"
//     // })
//   }

//   var reconnect = function(e) {
//     console.log("Connection closed! Reconnect ...")
//     setTimeout(function() {
//       connect()
//     }, 5000)
//   }

//   var open = function(e) {
//     console.log("Connection open")
//   }

//   function connect() {
//     connection = new WebSocket(endpoint + room)
//     connection.onmessage = broadcast
//     connection.onerror = reconnect
//     connection.onopen = open
//   }

//   connect()
// }



// var ENDPOINT_LOCAL  = "ws://localhost:9000/"
//   , ENDPOINT_HEROKU = "wss://polar-woodland-4270.herokuapp.com/"
//   , app = new App($("body"), ENDPOINT_LOCAL, location.hash.substr(1))
