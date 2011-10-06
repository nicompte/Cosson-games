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
      Belote.__super__.constructor.apply(this, arguments);
      this.teams = this.trick = [];
      this.trump = this.trickTaker = null;
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
      var player, _i, _len, _ref, _results;
      _ref = this.players;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        _results.push(player.id === playerId ? player : void 0);
      }
      return _results;
    };
    Belote.prototype.newDeal = function() {
      this.distribute([3, 2], 1, this.round % 4);
    };
    Belote.prototype.play = function(playerId, card) {
      var player;
      player = this.getPlayerById(playerId);
      this.trump.push([player, card]);
      if (this.trump.length === 4) {
        return [true, this.getTrumpWinner()];
      } else {
        return [false, WHO_HAS_TO_PLAY];
      }
    };
    Belote.prototype.getTrumpWinner = function() {
      var i, winningCard, _ref, _results;
      winningCard = this.trump[0];
      _results = [];
      for (i = 1, _ref = this.trum.length; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
        _results.push(!this.winsAgainst(this.trump[i - 1], this.trump[i]) ? winningCard = this.trump[i] : void 0);
      }
      return _results;
    };
    Belote.prototype.isTrick = function(card) {
      return Card.families.getPosition(card.family) === this.trick;
    };
    Belote.prototype.getPlayerById = function(playerId) {
      var player, _i, _len, _ref, _results;
      _ref = this.players;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        _results.push(player.id === player ? player : void 0);
      }
      return _results;
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
