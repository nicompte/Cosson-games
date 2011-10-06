(function() {
  var Card, Deck;
  Card = require("./Card.js").Card;
  Deck = (function() {
    function Deck(numberOfCards) {
      var i;
      this.deck = [];
      switch (numberOfCards) {
        case 32:
          for (i = 0; i <= 31; i++) {
            this.deck[i] = new Card(i, Card.families['fr'][Math.floor(i / 8)], Card.values['fr'][(i % 8) + 5]);
          }
          break;
        case 52:
          for (i = 0; i <= 51; i++) {
            this.deck[i] = new Card(i, Card.families['fr'][Math.floor(i / 13)], Card.values['fr'][i % 13]);
          }
      }
    }
    Deck.prototype.shuffle = function() {
      var j, l, valI, valJ, _ref;
      j = 0;
      valI = valJ = '';
      l = 31;
      while (l > -1) {
        j = Math.floor(Math.random() * l);
        _ref = [this.deck[j], this.deck[l]], this.deck[l] = _ref[0], this.deck[j] = _ref[1];
        l = l - 1;
      }
    };
    Deck.prototype.takeCards = function(numberOfCards) {
      this.deck.splice(0, numberOfCards);
    };
    Deck.prototype.addCards = function(cards) {
      this.deck.push(cards);
    };
    Deck.prototype.getCardById = function(id) {
      var card, _i, _len, _ref;
      _ref = this.deck;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        card = _ref[_i];
        if (card.id === id) {
          card;
        }
      }
    };
    return Deck;
  })();
  exports.Deck = Deck;
}).call(this);
