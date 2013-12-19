var room       = location.hash.substr(1)
  , lineHeight = 21
  , $content   = $("#content")
  , $cursor    = $("#cursor")
  , $powerline = $("#powerline")

if(room.length > 2) {
  var connection =
    new WebSocket("wss://polar-woodland-4270.herokuapp.com/" + room)

  connection.onmessage = function(e) {
    var response = JSON.parse(e.data)
      , node = document.createElement("code")

    node.appendChild(document.createTextNode(response.content))
    hljs.highlightBlock(node, hljs.tabReplace)

    $content.html(node)
    $powerline.html("⇒ " + response.name)

    $cursor.css({
      "top":  (response.cursor_y - 1) * lineHeight + "px",
      "left": (response.cursor_x - 1) + "ch"
    })
  }
}
