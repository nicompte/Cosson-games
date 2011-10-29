deck = new Deck(32)

cardF = (@id) ->

viewModel =
  hand: ko.observableArray()
  deck: ko.observableArray()
  belote: ko.observable(new Belote())
  addCard: (id)->
    @hand.push(deck.deck[id])
    return
  setPotentialTrick: (id)->
    viewModel.belote().potentialTrick(deck.deck[id])
    return
  setTrick:->
    socket.emit('set_trick', { trick: @family.id });
    viewModel.hand.push(@)
    viewModel.belote().canChooseTrick(false)
    viewModel.belote().canChooseAnyTrick(false)
    return
  pass:->
    socket.emit('pass');
    viewModel.belote().canChooseTrick(false)
    viewModel.belote().canChooseAnyTrick(true)

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
  $.each(data.new_cards, ->
    viewModel.addCard(this.id)
    return
  )
  return
)

socket.on('can_choose_trick', (data) ->
  console.log("Can choose trick")
  viewModel.belote().canChooseTrick = true;
  console.log viewModel.belote().canChooseTrick
  return
)

