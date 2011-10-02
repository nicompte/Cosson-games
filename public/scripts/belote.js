var socket = io.connect('http://cosson-games.nicompte.c9.io/belote');

socket.on('error', function (reason){
  console.error('Unable to connect Socket.IO', reason);
});

socket.on('connect', function (){
  console.info('successfully established a working connection');
});

/*
var sio = io.connect();

sio.socket.on('error', function (reason){
  console.error('Unable to connect Socket.IO', reason);
});

sio.on('connect', function (){
  console.info('successfully established a working connection \o/');
});
*/