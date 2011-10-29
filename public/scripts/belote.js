(function() {
  var cardF, deck, socket, viewModel;
  deck = new Deck(32);
  cardF = function(id) {
    this.id = id;
  };
  viewModel = {
    hand: ko.observableArray(),
    deck: ko.observableArray(),
    belote: ko.observable(new Belote()),
    addCard: function(id) {
      this.hand.push(deck.deck[id]);
    },
    setPotentialTrick: function(id) {
      viewModel.belote().potentialTrick(deck.deck[id]);
    },
    setTrick: function() {
      socket.emit('set_trick', {
        trick: this.family.id
      });
      viewModel.hand.push(this);
      viewModel.belote().canChooseTrick(false);
      viewModel.belote().canChooseAnyTrick(false);
    },
    pass: function() {
      socket.emit('pass');
      viewModel.belote().canChooseTrick(false);
      return viewModel.belote().canChooseAnyTrick(true);
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
    $.each(data.new_cards, function() {
      viewModel.addCard(this.id);
    });
  });
  socket.on('can_choose_trick', function(data) {
    console.log("Can choose trick");
    viewModel.belote().canChooseTrick = true;
    console.log(viewModel.belote().canChooseTrick);
  });
}).call(this);
