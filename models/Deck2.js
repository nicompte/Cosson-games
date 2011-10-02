var Card = require("./Card.js").Card;


var Deck = Class.extend({
    init: function(numberOfCards) {
        this.deck = new Array();
        switch (numberOfCards) {
        case 32:
            for(var i =0; i<32; i++){
                this.deck.push(new Card(i, Card.families['fr'][Math.floor(i/8)] , Card.values['fr'][(i%8)+5]));
            }
            break;
        }
    },
    shuffle:  function(){
       var j = 0;
       var valI = '';
       var valJ = valI;
       var l = this.deck.length - 1;
       while(l > -1) {
            j = Math.floor(Math.random() * l);
            valI = this.deck[l];
            valJ = this.deck[j];
            this.deck[l] = valJ;
            this.deck[j] = valI;
            l = l - 1;
        }
    },
    takeCards: function(numberOfCards){
       return this.deck.splice(0, numberOfCards);
    }, 
    addCards: function(cards){
       return this.deck.push(cards);
    }

});

exports.Deck = Deck;