(function() {
  var CardGame, Deck;
  Deck = require('./Deck.js').Deck;
  CardGame = (function() {
    function CardGame(deck, players) {
      this.deck = deck;
      this.players = players;
      this.round = 0;
    }
    CardGame.prototype.distribute = function(schema, numberOfTimes, startsWith) {
      var currentPlayer, i, j, k, _ref, _ref2, _ref3;
      currentPlayer = startsWith;
      for (i = 0, _ref = numberOfTimes - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        for (k = 0, _ref2 = schema.length - 1; 0 <= _ref2 ? k <= _ref2 : k >= _ref2; 0 <= _ref2 ? k++ : k--) {
          for (j = 0, _ref3 = this.players.length - 1; 0 <= _ref3 ? j <= _ref3 : j >= _ref3; 0 <= _ref3 ? j++ : j--) {
            this.players[currentPlayer].hand = this.players[currentPlayer].hand.concat(this.deck.takeCards(schema[k]));
            if (currentPlayer === this.players.length) {
              currentPlayer = 0;
            } else {
              currentPlayer++;
            }
          }
          currentPlayer = startsWith;
        }
      }
    };
    CardGame.prototype.getPlayerById = function(playerId) {
      var player, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.id === playerId) {
          return player;
        }
      }
      return null;
    };
    return CardGame;
  })();
  exports.CardGame = CardGame;
}).call(this);
