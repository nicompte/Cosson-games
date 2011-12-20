(function() {
  var cardF, deck, socket, viewModel;
  deck = new Deck(32);
  cardF = function(id) {
    this.id = id;
  };
  viewModel = {
    hand: new ko.observableArray(),
    deck: new ko.observableArray(),
    belote: new ko.observable(new Belote()),
    messages: new ko.observableArray(),
    message: new ko.observable(),
    addCard: function(id) {
      this.hand.push(deck.deck[id]);
    },
    setPotentialTrick: function(id) {
      viewModel.belote().potentialTrick(deck.deck[id]);
    },
    setTrick: function(id) {
      socket.emit('set_trick', id);
      viewModel.hand.push(viewModel.belote().potentialTrick());
      viewModel.belote().canChooseTrick(false);
      viewModel.belote().canChooseAnyTrick(false);
    },
    pass: function() {
      socket.emit('pass');
      viewModel.belote().canChooseTrick(false);
      viewModel.belote().canChooseAnyTrick(false);
    },
    chat: function() {
      viewModel.addMessage(viewModel.message(), "You");
      socket.emit('send_message', {
        message: viewModel.message()
      });
      viewModel.message("");
    },
    addMessage: function(message, author) {
      viewModel.messages.push(new Message(message, author));
    }
  };
  ko.applyBindings(viewModel);
  socket = io.connect('http://localhost');
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
      viewModel.belote().canChooseTrick(false);
      viewModel.belote().canChooseAnyTrick(false);
      viewModel.belote().potentialTrick(null);
    });
  });
  socket.on('can_choose_trick', function(data) {
    viewModel.belote().canChooseTrick(true);
  });
  socket.on('can_choose_any_trick', function(data) {
    viewModel.belote().canChooseAnyTrick(true);
  });
  socket.on('receive_message', function(data) {
    return viewModel.addMessage(data.message, data.author);
  });
  socket.on('can_play', function(data) {
    var card, cardInHand, _i, _len, _results;
    console.log(data);
    viewModel.belote().playableCards().push(data);
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      card = data[_i];
      _results.push((function() {
        var _j, _len2, _ref, _results2;
        _ref = viewModel.hand();
        _results2 = [];
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          cardInHand = _ref[_j];
          _results2.push(card.id === cardInHand.id ? cardInHand.playable = true : void 0);
        }
        return _results2;
      })());
    }
    return _results;
  });
}).call(this);
