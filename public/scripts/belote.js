var socket = io.connect('http://cosson-games.nicompte.c9.io');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});