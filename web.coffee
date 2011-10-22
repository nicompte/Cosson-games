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
io = io.listen app

Player = require("./models/Player.js").Player
Belote = require("./models/Belote.js").Belote

players = []
for i in [0..2]
  players[i] = new Player i, "player"+i

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
          accept(null, true)
        else
          accept('Not logged in.', false)
        return
      )
  else
    accept('No cookie transmitted.', false)
)

io.sockets.on('connection', (socket) ->
  #console.info('A socket with sessionID ' + socket.handshake.sessionID + ' and name ' + socket.handshake.session.username+' connected!')
  belote = @belote
  socket.broadcast.emit('new_player', socket.handshake.session.username)
  if players.length==4
    @belote = new Belote(players)
    @belote.newDeal()
    for s in io.sockets.clients()
      s.emit('new_deal', hand: @belote.getPlayerById(s.handshake.session.id).hand, potentialTrick: @belote.getPotentialTrick())
  else
    socket.emit('waiting_for_players', null)

  socket.on('set_trick', (data) =>
    @belote.setTrick(data.trick, socket.handshake.session.id)
    for s in io.sockets.clients()
      s.emit('end_of_distribution', new_cards: @belote.getPlayerById(socket.handshake.session.id).hand.slice(5,7), trick: @belote.trick, trickTaker: @belote.trickTaker)
    return
  )
  return
)
###
io.sockets.on('set_trick', (socket) ->
  @belote.setTrick(data.trick, socket.handshake.session.sessionID)
  console.log "SET_TRICK"
  console.log socket.handshake.session.sessionID
  console.log @belote.trickTaker
  return
)
###

app.listen port
