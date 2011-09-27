var port = process.env.C9_PORT;
var express = require("express");
var stylus = require("stylus");
var io = require("socket.io");

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

app.get('/belote/:template', function(req, res){
    res.render(req.params.template+'/index', { title: 'My Site' });
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(port);