var port = process.env.C9_PORT;
var express = require("express");

var app = express.createServer();

app.get('/belote/:template', function(req, res){
    res.render(template+'/index.jade', { title: 'My Site' });
});

app.listen(port);