cardF = (@id) ->

viewModel =
  hand: ko.observableArray()
  deck: ko.observableArray()
  addCard: (id)->
    @hand.push(new cardF(id))
    return
  setPotentialTrick: (id)->
    @deck.push(new cardF(id))
    return
  alerta:->
    alert("Hello")
    return

ko.applyBindings(viewModel)

socket = io.connect 'http://cosson-games.nicompte.c9.io'.socket

socket.on('connect',  (data) ->
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
  $.each(data.hand, ->
    viewModel.addCard(this.id)
    return
  )
  viewModel.setPotentialTrick(data.potentialTrick.id)
    #socket.emit('set_trick', { trick: 0 });
  return
)

socket.on('waiting_for_players', (data) ->
  console.log "Waiting for other players"
  return
)

socket.on('new_player', (data) ->
  console.log data+" joined the game"
  return
)

socket.on('end_of_distribution', (data) ->
  console.log data
  return
)

