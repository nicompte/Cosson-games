var Deck = require('./Deck2.js').Deck;

var CardGame = Class.extend({
    init: function(deck, players){
        this.deck = deck;
        this.players = players;
        this.round = 0;
    }, 
    distribute: function(schema, numberOfTimes, startsWith){
       var deck = this.deck;
        for(var i=startsWith; i<numberOfTimes; i++){
            this.players.forEach(function(player){
                player.hand.push(deck.takeCards(schema[i]));
            }); 
        }
    }
});

exports.CardGame = CardGame;