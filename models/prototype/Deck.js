var Card = require("./Card.js").Card;


function Deck(numberOfCards) {
    this.deck = new Array();
    switch (numberOfCards) {
    case 32:
        for(var i =0; i<32; i++){
            this.deck.push(new Card(i, Card.families['fr'][Math.floor(i/8)] , Card.values['fr'][(i%8)+5]));
        }
        break;
    }
}
    
/**
 * Shuffle the deck.
 */
Deck.prototype.shuffle = function(){
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
};

/**
 * Take a number of cards from the deck.
 */
Deck.prototype.takeCards = function(numberOfCards){
   return this.deck.splice(0, numberOfCards);
};

/**
 * Add cards to deck.
 */
Deck.prototype.addCards = function(cards){
   return this.deck.push(cards);
};

exports.Deck = Deck;