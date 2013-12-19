var room = location.hash.substr(1)

var connection =
  new WebSocket("wss://polar-woodland-4270.herokuapp.com/" + room)

connection.onopen = function() {
  console.log("Connection: Open")
}

connection.onmessage = function(e) {
  var response = JSON.parse(e.data)
    , node = document.createElement("code")
    , content = response.content
    , lines = content.split('\n')

  if(lines.length > 0) {
    var currentLine = lines[response.cursor_y - 1]
    currentLine = [
      currentLine.slice(0, response.cursor_x - 1),
      "[collab-cursor]",
      currentLine.slice(response.cursor_x - 1)
    ].join("")

    lines[response.cursor_y - 1] = currentLine
    content = lines.join('\n')
  }

  node.appendChild(document.createTextNode(content))

  $("#content").html(node)
  hljs.highlightBlock(node, hljs.tabReplace)

  node.innerHTML = node.innerHTML.replace("[collab-cursor]",
      "<span class='cursor'></span>")

  $("#powerline").html("⇒ " + response.name)
}
