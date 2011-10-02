var socket = io.connect('http://cosson-games.nicompte.c9.io/belote').socket;

socket.of('/belote').on('connect', function (){
    console.info('Successfully established a working connection');
    socket.of('/belote').emit('i_want_to_play');
});

socket.of('/belote').on('error', function (reason){
    console.error('Unable to connect Socket.IO', reason);
});

socket.of('/belote').on('connect_failed', function (reason) {
    console.error('Unable to connect to namespace belote', reason);
});

socket.of('/belote').on('new_deal', function (data) {
    console.log(data);
});