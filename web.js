var port = process.env.C9_PORT, 
express = require("express"), 
stylus = require("stylus"), 
io = require("socket.io"),
connections = {};
//const parseCookie = require('connect').utils.parseCookie;


//var deckModel = require("./models/Deck.js").Deck();

//var deck = new deckModel(32);

var app = express.createServer(), io = io.listen(app);

app.configure(function() {
  app.set ('view engine', 'jade');
  app.use( stylus.middleware({
    src: __dirname + "/views",
    dest: __dirname + "/public",
    compress: true
  }));
  /*
  this.sessionStore = new express.session.MemoryStore({ reapInterval: 60000 * 10 });
  this.use(express.session({
    "secret": "some private string",
    "store":  this.sessionStore                                            
  }));
  */
  app.use (express.static(__dirname + '/public'));
});

/* Middleware for limited access */
/*
function requireLogin (req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/");
  }
}
*/
 
/* Home page (requires authentication) */
app.get('/secured', /*[requireLogin],*/ function (req, res/*, next*/) {
   res.send('Accès sécurisé');
});

app.get('/', function(req, res){
    res.send('Vive Nico');
});

app.get('/belote/:template', function(req, res){
    res.render(req.params.template+'/index', { title: 'Cosson games' });
});
/*
io.of('/belote').on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

io.configure(function (){
    io.set('authorization', function (handshakeData, callback) {
      var cookies = parseCookie(handshakeData.headers.cookie);
      //console.log(cookies);
      var sessionID = null;//cookies['connect.sid'];
      if (!sessionID) {
        callback('No session', false);
      } else {
        handshakeData.sessionID = sessionID;
        app.sessionStore.get(sessionID, function (err, session) {
          if (!err && session && session.username) {
            handshakeData.username = session.username;
            callback(null, true);
          } else {
            callback(err || 'User not authenticated', false);
          }
        });
      }
    });
});


io.on('connection', function (socket) { 
  var sessionID = socket.handshake.sessionID;
  var username = socket.handshake.username;
  if ('undefined' == typeof connections[sessionID]) {
    connections[sessionID] = { "length": 0 };
    io.emit('join', username, Date.now());
  }
  connections[sessionID][socket.id] = socket;
  connections[sessionID].length ++;
});

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
//http://naholyr.fr/2011/07/authentification-et-websocket-avec-node-js-express-et-socket-io/