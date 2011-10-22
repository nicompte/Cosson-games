(function() {
  var Belote, CardGame, Deck;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  CardGame = require('./CardGame').CardGame;
  Deck = require('./Deck').Deck;
  Belote = (function() {
    __extends(Belote, CardGame);
    function Belote(players) {
      var deck;
      deck = new Deck(32);
      deck.shuffle();
      Belote.__super__.constructor.call(this, deck, players);
      this.teams = [];
      this.trump = this.trick = this.trickTaker = this.potentialTrick = null;
      this.cardValue = [5, 6, 7, 9, 10, 11, 8, 12];
      this.trickValue = [5, 6, 10, 11, 8, 12, 7, 9];
    }
    Belote.prototype.setTeams = function(t1, t2) {
      this.teams[0] = t1;
      this.teams[1] = t2;
    };
    Belote.prototype.distribute = function(schema, numberOfTimes, startsWith) {
      Belote.__super__.distribute.apply(this, arguments);
    };
    Belote.prototype.getPlayerById = function(playerId) {
      return Belote.__super__.getPlayerById.apply(this, arguments);
    };
    Belote.prototype.newDeal = function() {
      this.distribute([3, 2], 1, this.round % 4);
    };
    Belote.prototype.endDistribution = function() {
      var currentPlayer, i;
      currentPlayer = this.round;
      for (i = 0; i <= 3; i++) {
        if (this.players[i].id === this.trickTaker) {
          this.players[currentPlayer].hand = this.players[currentPlayer].hand.concat(this.deck.takeCards(2));
        } else {
          this.players[currentPlayer].hand = this.players[currentPlayer].hand.concat(this.deck.takeCards(3));
        }
        if (currentPlayer === this.players.length) {
          currentPlayer = 0;
        } else {
          currentPlayer++;
        }
      }
    };
    Belote.prototype.play = function(playerId, card) {
      var player;
      player = this.getPlayerById(playerId);
      this.trump.push([player, card]);
      if (this.trump.length === 4) {
        return [true, this.getTrumpWinner()];
      } else {
        return [false, WHO_HAS_TO_];
      }
    };
    Belote.prototype.getTrumpWinner = function() {
      var i, winningCard, _ref;
      winningCard = this.trump[0];
      for (i = 1, _ref = this.trum.length; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
        if (!this.winsAgainst(this.trump[i - 1], this.trump[i])) {
          winningCard = this.trump[i];
        }
      }
      return winningCard;
    };
    Belote.prototype.isTrick = function(card) {
      return Card.families.getPosition(card.family) === this.trick;
    };
    Belote.prototype.getPotentialTrick = function() {
      if (this.potentialTrick === null) {
        return this.potentialTrick = this.deck.takeCards(1)[0];
      } else {
        return this.potentialTrick;
      }
    };
    Belote.prototype.setTrick = function(trick, trickTaker) {
      this.trick = trick;
      this.trickTaker = trickTaker;
      return this.endDistribution();
    };
    Belote.prototype.winsAgainst = function(card1, card2) {
      if (!this.isTrick(card1) && !this.isTrick(card2)) {
        if (card1.family === card2.family) {
          return this.cardValue.indexOf(Card.families.indexOf(card1.value)) < this.cardValue.indexOf(Card.families.indexOf(card2.value));
        } else if (this.isTrick(card1) && !this.isTrick(card2)) {
          return false;
        } else if (!this.isTrick(card1) && this.isTrick(card2)) {
          return true;
        } else if (this.isTrick(card1) && this.isTrick(card2)) {
          return this.trickValue.indexOf(Card.families.indexOf(card1.value)) < this.trickValue.indexOf(Card.families.indexOf(card2.value));
        }
      }
    };
    return Belote;
  })();
  exports.Belote = Belote;
}).call(this);
