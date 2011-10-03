var socket = io.connect('http://cosson-games.nicompte.c9.io').socket;

socket.of('/belote').on('connect', function (data){
    console.info('Successfully established a working connection');
});

socket.on('error', function (reason){
    console.error('Unable to connect Socket.IO', reason);
});

socket.on('connect_failed', function (reason) {
    console.error('Unable to connect to namespace belote', reason);
});

socket.on('new_deal', function (data) {
    console.log(data);
});