var port = process.env.C9_PORT || 1337, 
express = require("express"), 
stylus = require("stylus"), 
io = require("socket.io"),
connections = {};
parseCookie = require('connect').utils.parseCookie,
MemoryStore = express.session.MemoryStore,
sessionStore = new MemoryStore()
controller = require("./util/controller");;
require('./models/inheritance.js');


var Player = require("./models/Player.js").Player;
var Belote = require("./models/Belote2.js").Belote;
var players = new Array();
for(var i = 0; i<3; i++){
    players.push(new Player(i, "player"+i));
}
this.belote = new Belote(players);

var app = express.createServer(), io = io.listen(app);

app.configure(function(){
  this.set ('view engine', 'jade');
  this.use( stylus.middleware({
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
  app.use(express.logger({ format: ':method :url :status' }));
  this.use(express.static(__dirname + '/public'));
  controller.bootControllers(app);
});

/*
io.of('/belote').on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/

var Session = require('connect').middleware.session.Session;
io.of('/belote').authorization(function(data, accept) {
    if (data.headers.cookie) {
        data.cookie = parseCookie(data.headers.cookie);
        if (!data.cookie['express.sid']) {
            return accept('Not logged in 1.', false);
        } else {
            data.sessionID = data.cookie['express.sid'];
            data.sessionStore = sessionStore;
            sessionStore.get(data.sessionID, function(err, session) {
                if (!err && session && session.username) {
                    data.session = new Session(data, session);
                    return accept(null, true);
                } else {
                    return accept('Not logged in 2.', false);
                }
            });
        }
    } else {
        return accept('No cookie transmitted.', false);
    }
    //accept(null, true);
});

io.of('belote').on('connection', function (socket) {
    console.log('A socket with sessionID ' + socket.handshake.sessionID + ' and name ' + socket.handshake.session.username+' connected!');
});
/*
io.on('disconnect', function () {
    var userConnections = connections[sessionID];
    if (userConnections.length && userConnections[socket.id]) {
      userConnections.length --;
      delete userConnections[socket.id];
    }
    if (userConnections.length === 0) {
      io.emit('bye', username, Date.now());
    }
});
*/

app.listen(port);