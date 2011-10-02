var Deck = require('./Deck.js').Deck;

function CardGame(deck, players){
    this.deck = deck;
    this.players = players;
    //console.log(this.deck);
}

CardGame.prototype.distribute = function(schema, numberOfTimes){
    var deck = this.deck;
    for(var i=0; i<numberOfTimes; i++){
        this.players.forEach(function(player){
            player.hand.push(deck.takeCards(schema[i]));
        });
    }
};

exports.CardGame = CardGame;