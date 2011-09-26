var port = process.env.C9_PORT;
var express = require("express");
var stylus = require("stylus");

var app = express.createServer();

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

app.listen(port);