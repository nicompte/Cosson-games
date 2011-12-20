(function() {
  var Belote, MemoryStore, Player, Session, app, controller, express, i, io, parseCookie, players, port, sessionStore, stylus;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
  for (i = 0; i <= 1; i++) {
    players[i] = new Player(i, "player" + i);
  }
  players = [];
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
    controller.bootControllers(app);
  });
  io.sockets.authorization(function(data, accept) {
    console.log("Starting authorization");
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
            console.log("Connecté");
            accept(null, true);
          } else {
            accept('Not logged in.', false);
          }
        });
      }
    } else {
      return accept('No cookie transmitted.', false);
    }
  });
  io.sockets.on('connection', function(socket) {
    var belote, s, _i, _j, _len, _len2, _ref, _ref2;
    console.info('A socket with sessionID ' + socket.handshake.sessionID + ' and name ' + socket.handshake.session.username + ' connected!');
    belote = this.belote;
    socket.broadcast.emit('new_player', socket.handshake.session.username);
    if (players.length === 4) {
      this.belote = new Belote(players);
      this.belote.newDeal();
      _ref = io.sockets.clients();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        s.emit('new_deal', {
          hand: this.belote.getPlayerById(s.handshake.session.id).hand,
          potentialTrick: this.belote.getPotentialTrick()
        });
      }
      _ref2 = io.sockets.clients();
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        s = _ref2[_j];
        if (s.handshake.session.id === this.belote.players[this.belote.roundTrick].id) {
          s.emit('can_choose_trick');
        }
      }
    } else {
      socket.emit('waiting_for_players', null);
    }
    socket.on('set_trick', __bind(function(data) {
      var s, _k, _len3, _ref3;
      this.belote.setTrick(data.trick, socket.handshake.session.id);
      _ref3 = io.sockets.clients();
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        s = _ref3[_k];
        s.emit('end_of_distribution', {
          new_cards: this.belote.getPlayerById(s.handshake.session.id).hand.slice(5, 7),
          trick: this.belote.trick,
          trickTaker: this.belote.trickTaker
        });
        if (s.handshake.session.id === this.belote.players[this.belote.playRound].id) {
          s.emit('can_play', this.belote.getPlayableCardsByPlayerId(s.handshake.session.id));
        }
      }
    }, this));
    socket.on('pass', __bind(function() {
      var s, _k, _len3, _ref3;
      this.belote.trickRound += 1;
      _ref3 = io.sockets.clients();
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        s = _ref3[_k];
        if (s.handshake.session.id === this.belote.players[this.belote.trickRound % 4].id) {
          if (this.belote.trickRound - this.belote.round < 4) {
            s.emit('can_choose_trick');
          } else {
            s.emit('can_choose_any_trick');
          }
        }
      }
    }, this));
    socket.on('send_message', __bind(function(data) {
      socket.broadcast.emit('receive_message', {
        author: socket.handshake.session.username,
        message: data.message
      });
    }, this));
  });
  app.listen(port);
}).call(this);
