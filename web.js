var port = process.env.C9_PORT || 1337, 
express = require("express"), 
stylus = require("stylus"), 
io = require("socket.io"),
connections = {};
parseCookie = require('connect').utils.parseCookie,
MemoryStore = express.session.MemoryStore,
sessionStore = new MemoryStore();
require('./models/inheritance.js');


var Player = require("./models/Player.js").Player;
var Belote = require("./models/Belote2.js").Belote;
var players = new Array();
for(var i = 0; i<3; i++){
    players.push(new Player(i, "player"+i));
}
this.belote = new Belote(players);
console.log(this.belote);
/*
var Deck = require("./models/Deck2.js").Deck;
var deck = new Deck(32);
*/
//console.log(deck);

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
  //this.sessionStore = new express.session.MemoryStore({ reapInterval: 60000 * 10 });
  this.use(express.session({
      secret: "Cosson forever",
      key: "express.sid",
      store: sessionStore
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

io.sockets.on('connection', function (socket) {
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