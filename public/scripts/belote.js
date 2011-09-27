var socket = io.connect('http://cosson-games.nicompte.c9.io');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

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