socket = io.connect 'http://cosson-games.nicompte.c9.io'.socket

socket.of('/belote'.on('connect',  (data) ->
  console.info 'Successfully established a working connection'
  return
)

socket.on('error', (reason) ->
  console.error 'Unable to connect Socket.IO', reason
  return
)

socket.on('connect_failed', (reason) ->
  console.error 'Unable to connect to namespace belote', reason
  return
)

socket.on('new_deal', (data) ->
  console.log data
  return
)
