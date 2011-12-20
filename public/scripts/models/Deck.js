(function() {
  this.Deck = (function() {
    function Deck(numberOfCards) {
      var i;
      this.deck = [];
      switch (numberOfCards) {
        case 32:
          for (i = 0; i <= 31; i++) {
            this.deck[i] = new Card(i, Math.floor(i / 8), (i % 8) + 5, 'fr');
          }
          break;
        case 52:
          for (i = 0; i <= 51; i++) {
            this.deck[i] = new Card(i, Math.floor(i / 13), i % 13, 'fr');
          }
      }
    }
    return Deck;
  })();
}).call(this);
