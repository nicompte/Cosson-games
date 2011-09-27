exports.Deck = function(){

    function Deck(numberOfCards) {
        var families = ["Hearts", "Diamonds", "Spades", "Clubs"];
        var values = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
        switch (numberOfCards) {
        case 32:
            for(var i =0; i<32; i++){
                this.deck.push(new Card(i, Math.floor(i/8) , (32%8)+5));
            }
            break;
        }
    }
    
    /**
     * Shuffle a deck.
     */
    Deck.prototype.shuffle = function(){
       var j = 0;
       var valI = '';
       var valJ = valI;
       var l = this.deck.length - 1;
       while(l > -1) {
            j = Math.floor(Math.random() * l);
            valI = a[l];
            valJ = a[j];
            this.deck[l] = valJ;
            this.deck[j] = valI;
            l = l - 1;
        }
    };
};