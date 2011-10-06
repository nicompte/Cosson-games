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
      var deck, i, player, _i, _len, _ref;
      deck = this.deck;
      for (i = startsWith; startsWith <= numberOfTimes ? i <= numberOfTimes : i >= numberOfTimes; startsWith <= numberOfTimes ? i++ : i--) {
        _ref = this.players;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          player = _ref[_i];
          player.hand.push(deck.takeCards(schema[i]));
        }
      }
    };
    return CardGame;
  })();
  exports.CardGame = CardGame;
}).call(this);
