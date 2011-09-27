var port = process.env.C9_PORT, 
express = require("express"), 
stylus = require("stylus"), 
io = require("socket.io"),
connections = {};
parseCookie = require('connect').utils.parseCookie;

//var deckModel = require("./models/Deck.js").Deck();
//var deck = new deckModel(32);

var app = express.createServer(), io = io.listen(app);

app.configure(function() {
  this.set ('view engine', 'jade');
  this.use( stylus.middleware({
    src: __dirname + "/views",
    dest: __dirname + "/public",
    compress: true
  }));
  this.use(express.bodyParser());
  this.use(express.cookieParser());
  this.sessionStore = new express.session.MemoryStore({ reapInterval: 60000 * 10 });
  this.use(express.session({
      secret: "Cosson forever",
      key: "express.sid",
      sessionStore: this.sessionStore
  }));
  this.use(express.static(__dirname + '/public'));
});

function requireLogin (req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get('/secured', [requireLogin], function (req, res, next) {
   res.send('Accès sécurisé');
});

app.get('/', function(req, res){
    res.send('Vive Nico');
});

app.get('/belote/:template', [requireLogin], function(req, res){
    res.render(req.params.template+'/index', { title: 'Cosson games' });
});

app.get('/login', function(req, res){
    res.render('login', { title: 'Login' });
});

app.post('/login', function(req, res){
    if(!req.body.username || !req.body.password){
        res.render('login', { title: 'Login', error: 'Please enter login information' });
    }else{
        if(req.body.username == 'nbarbotte' && req.body.password == 'mdp'){
            req.session.username = req.body.username;
            res.redirect("/secured");
            //res.render('stackoverflow/index', { title: 'Cosson games' });
        }
    }
});
/*
io.of('/belote').on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/
/*
io.configure(function (){
    io.set('authorization', function (handshakeData, callback) {
      var cookies = parseCookie(handshakeData.headers.cookie);
      console.log(cookies);
      var sessionID = cookies['connect.sid'];
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
*/

io.set('authorization', function (data, accept) {
    if (data.headers.cookie) {
        data.cookie = parseCookie(data.headers.cookie);
        console.log(data.cookie);
        data.sessionID = data.cookie['express.sid'];
        if(!data.sessionID) return accept('Not logged in.', false);
        app.sessionStore.get(data.sessionID, function (err, session) {
          if (!err && session && session.username) {
            data.username = session.username;
            callback(null, true);
          } else {
            return accept('Not logged in.', false);
          }
    });
    } else {
       return accept('No cookie transmitted.', false);
    }
    accept(null, true);
});

io.sockets.on('connection', function (socket) {
    console.log('A socket with sessionID ' + socket.handshake.sessionID 
        + ' connected!');
});
/*
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