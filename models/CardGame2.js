var Deck = require('./Deck2.js').Deck;

var CardGame = Class.extend({
    init: function(deck, players){
        this.deck = deck;
        this.players = players;
        this.round = 0;
    }, 
    distribute: function(schema, numberOfTimes){
       var deck = this.deck;
        for(var i=0; i<numberOfTimes; i++){
            for(var j = startsWith; j<this.players.length; j++){
                this.players[j].hand.push(deck.takeCards(schema[i]));
                if(j==players.length){
                    j=0;
                }
            } 
        }
    }
});

exports.CardGame = CardGame;