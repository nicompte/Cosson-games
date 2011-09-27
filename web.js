var port = process.env.C9_PORT, 
express = require("express"), 
stylus = require("stylus"), 
io = require("socket.io");

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
  app.use (express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
    res.send('Vive Nico');
});

app.get('/belote/:template', function(req, res){
    res.render(req.params.template+'/index', { title: 'Cosson games' });
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(port);