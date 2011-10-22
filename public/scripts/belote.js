(function() {
  var cardF, socket, viewModel;
  cardF = function(id) {
    this.id = id;
  };
  viewModel = {
    hand: ko.observableArray(),
    deck: ko.observableArray(),
    addCard: function(id) {
      this.hand.push(new cardF(id));
    },
    setPotentialTrick: function(id) {
      this.deck.push(new cardF(id));
    },
    alerta: function() {
      alert("Hello");
    }
  };
  ko.applyBindings(viewModel);
  socket = io.connect('http://cosson-games.nicompte.c9.io'.socket);
  socket.on('connect', function(data) {
    console.info('Successfully established a working connection');
  });
  socket.on('error', function(reason) {
    console.error('Unable to connect Socket.IO', reason);
  });
  socket.on('connect_failed', function(reason) {
    console.error('Unable to connect to namespace belote', reason);
  });
  socket.on('new_deal', function(data) {
    console.log(data);
    $.each(data.hand, function() {
      viewModel.addCard(this.id);
    });
    viewModel.setPotentialTrick(data.potentialTrick.id);
  });
  socket.on('waiting_for_players', function(data) {
    console.log("Waiting for other players");
  });
  socket.on('new_player', function(data) {
    console.log(data + " joined the game");
  });
  socket.on('end_of_distribution', function(data) {
    console.log(data);
  });
}).call(this);
