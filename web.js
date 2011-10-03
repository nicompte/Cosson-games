var port = process.env.C9_PORT || 1337, 
express = require("express"), 
stylus = require("stylus"), 
io = require("socket.io"),
parseCookie = require('connect').utils.parseCookie,
MemoryStore = express.session.MemoryStore,
sessionStore = new MemoryStore(),
controller = require("./util/controller"),
Session = require('connect').middleware.session.Session,
app = express.createServer(), 
io = io.listen(app);

require('./util/inheritance.js');
var Hash = require("./util/hash.js").Hash,
Player = require("./models/Player.js").Player,
Belote = require("./models/Belote2.js").Belote;

var players = new Array();
for(var i = 0; i<3; i++){
    players[i] = new Player(i, "player"+i);
}

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

io.sockets.authorization(function(data, accept) {
    if (data.headers.cookie) {
        data.cookie = parseCookie(data.headers.cookie);
        if (!data.cookie['express.sid']) {
            return accept('Not logged in.', false);
        } else {
            data.sessionID = data.cookie['express.sid'];
            data.sessionStore = sessionStore;
            sessionStore.get(data.sessionID, function(err, session) {
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

io.sockets.on('connection', function (socket) {
    console.info('A socket with sessionID ' + socket.handshake.sessionID + ' and name ' + socket.handshake.session.username+' connected!');
    if(players.length== 4){
        this.belote = new Belote(players);
        this.belote.newDeal();
        io.of('belote').broadcast.emit('new_deal', this.belote.getPlayerById(socket.handshake.sessionID).hand);
        }
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