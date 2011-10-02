var CardGame = require('./CardGame').CardGame;
var Deck = require('./Deck').Deck;

function Belote(players){
    this.deck = new Deck(32).shuffle();
    this.players = players;
    //CardGame.apply(this.deck, this.players);
    this.distribute([3,2], 1);
}

Belote.prototype = new CardGame;
Belote.prototype.constructor = Belote;

exports.Belote = Belote;