# (coffee --compile --watch .&); nodemon web.js
# node-inspector &
# node --debug-brk web.js
port = process.env.C9_PORT || 1337
express = require "express"
stylus = require "stylus"
io = require "socket.io"
parseCookie = require('connect').utils.parseCookie
MemoryStore = express.session.MemoryStore
sessionStore = new MemoryStore()
controller = require "./util/controller"
Session = require('connect').middleware.session.Session
app = express.createServer()
io.configure(->
  io.set("transports", ["xhr-pooling"])
  io.set("pooling duration", 10)
  return
)
io = io.listen app

Player = require("./models/Player.js").Player
Belote = require("./models/Belote.js").Belote

players = []
for i in [0..1]
  players[i] = new Player i, "player"+i
  
players = []
  

app.configure(->
  @set 'view engine', 'jade'
  @use( stylus.middleware({
    src: __dirname + "/views"
    dest: __dirname + "/public"
    compress: true
  }))
  @use(express.bodyParser())
  @use(express.cookieParser())
  @use(express.session(
    secret: "Cosson forever"
    key: "express.sid"
    store: sessionStore
  ))
  @use(express.logger({ format: ':method :url :status' }))
  @use(express.static(__dirname + '/public'))
  controller.bootControllers(app)
  return
)

io.sockets.authorization((data, accept) ->
  console.log "Starting authorization"
  if data.headers.cookie
    data.cookie = parseCookie(data.headers.cookie)
    if !data.cookie['express.sid']
      accept('Not logged in.', false)
    else
      data.sessionID = data.cookie['express.sid']
      data.sessionStore = sessionStore
      sessionStore.get(data.sessionID, (err, session) ->
        if !err && session && session.username
          data.session = new Session(data, session)
          players.push(new Player(data.sessionID, data.session.username))
          console.log("Connecté")
          accept(null, true)
        else
          accept('Not logged in.', false)
        return
      )
  else
    accept('No cookie transmitted.', false)
)

io.sockets.on('connection', (socket) ->
  console.info('A socket with sessionID ' + socket.handshake.sessionID + ' and name ' + socket.handshake.session.username+' connected!')
  belote = @belote
  #Notify the other player that the player entered the game
  socket.broadcast.emit('new_player', socket.handshake.session.username)
  #If we have 4 players, let the fun begin!  
  if players.length is 4
    @belote = new Belote(players)
    @belote.newDeal()
    #Distribute 5 cards to anyone
    for s in io.sockets.clients()
      s.emit('new_deal', hand: @belote.getPlayerById(s.handshake.session.id).hand, potentialTrick: @belote.getPotentialTrick())
    #Notigfy the first player he can choose the trick
    for s in io.sockets.clients() when s.handshake.session.id is @belote.players[@belote.roundTrick].id
      s.emit('can_choose_trick')
  #If we do not have 4 players, we tell everyone the last ones are late
  else
    socket.emit('waiting_for_players', null)
  
  #Choose the trick for the round
  socket.on('set_trick', (data) =>
    @belote.setTrick(data.trick, socket.handshake.session.id)
    for s in io.sockets.clients()
      #Distribute the rest of the cards
      s.emit('end_of_distribution', new_cards: @belote.getPlayerById(s.handshake.session.id).hand.slice(5,7), trick: @belote.trick, trickTaker: @belote.trickTaker)
      s.emit('can_play', @belote.getPlayableCardsByPlayerId(s.handshake.session.id)) if s.handshake.session.id is @belote.players[@belote.playRound].id
    return
  )
  
  #When the player passes
  socket.on('pass', =>
    @belote.trickRound += 1
    for s in io.sockets.clients() when s.handshake.session.id is @belote.players[@belote.trickRound%4].id
      if @belote.trickRound-@belote.round < 4 
        s.emit('can_choose_trick')
      else
        s.emit('can_choose_any_trick')
    return
  )
  
  #Chat
  socket.on('send_message', (data) =>
    socket.broadcast.emit('receive_message', author: socket.handshake.session.username, message: data.message)
    #socket.emit('receive_message', author: socket.handshake.session.username, message: data.message)
    return
  )

  return
)

app.listen port
