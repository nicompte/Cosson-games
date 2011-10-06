(function() {
  var Belote, MemoryStore, Player, Session, app, controller, express, i, io, parseCookie, players, port, sessionStore, stylus;
  port = process.env.C9_PORT || 1337;
  express = require("express");
  stylus = require("stylus");
  io = require("socket.io");
  parseCookie = require('connect').utils.parseCookie;
  MemoryStore = express.session.MemoryStore;
  sessionStore = new MemoryStore();
  controller = require("./util/controller");
  Session = require('connect').middleware.session.Session;
  app = express.createServer();
  io = io.listen(app);
  Player = require("./models/Player.js").Player;
  Belote = require("./models/Belote.js").Belote;
  players = [];
  for (i = 0; i <= 3; i++) {
    players[i] = new Player(i, "player" + i);
  }
  app.configure(function() {
    this.set('view engine', 'jade');
    this.use(stylus.middleware({
      src: __dirname + "/views",
      dest: __dirname + "/public",
      compress: true
    }));
    this.use(express.bodyParser());
    this.use(express.cookieParser());
    this.use(express.session({
      secret: "Cosson forever",
      key: "express.sid",
      store: sessionStore
    }));
    this.use(express.logger({
      format: ':method :url :status'
    }));
    this.use(express.static(__dirname + '/public'));
    return controller.bootControllers(app);
  });
  io.sockets.authorization(function(data, accept) {
    if (data.headers.cookie) {
      data.cookie = parseCookie(data.headers.cookie);
      if (!data.cookie['express.sid']) {
        return accept('Not logged in.', false);
      } else {
        data.sessionID = data.cookie['express.sid'];
        data.sessionStore = sessionStore;
        return sessionStore.get(data.sessionID, function(err, session) {
          if (!err && session && session.username) {
            data.session = new Session(data, session);
            players.push(new Player(data.sessionID, data.session.username));
            return accept(null, true);
          } else {
            return accept('Not logged in.', false);
          }
        });
      }
    } else {
      return accept('No cookie transmitted.', false);
    }
  });
  io.sockets.on('connection', function(socket) {
    console.info('A socket with sessionID ' + socket.handshake.sessionID + ' and name ' + socket.handshake.session.username + ' connected!');
    if (players.length === 4) {
      this.belote = new Belote(players);
      this.belote.newDeal();
      return io.of('belote').broadcast.emit('new_deal', this.belote.getPlayerById(socket.handshake.sessionID).hand);
    }
  });
  app.listen(port);
}).call(this);
