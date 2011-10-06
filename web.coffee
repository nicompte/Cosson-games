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
for i in [0..3]
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
)

io.sockets.authorization((data, accept) ->
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
      )
  else
    accept('No cookie transmitted.', false)
)

io.sockets.on('connection', (socket) ->
  console.info('A socket with sessionID ' + socket.handshake.sessionID + ' and name ' + socket.handshake.session.username+' connected!')
  if players.length==4
    @belote = new Belote(players)
    @belote.newDeal()
    io.of('belote').broadcast.emit('new_deal', @belote.getPlayerById(socket.handshake.sessionID).hand)
)

app.listen port
