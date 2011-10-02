var CardGame = require('./CardGame2').CardGame;
var Deck = require('./Deck2').Deck;

var Belote = CardGame.extend({
    init: function(players){
        var deck = new Deck(32);
        deck.shuffle();
        this._super(deck, players);
        this.teams = new Array();
        this.trick = new Array();
        this.trump = null;
        this.trickTaker = null;
        this.cardValue = [5, 6, 7, 9, 10, 11,  8, 12];
        this.trickValue = [5, 6, 10, 11, 8, 12, 7, 9];
    },
    setTeams: function(t1,t2){
       this.teams[0]=t1;
       this.teams[1]=t2;
    },
    distribute: function(schema, numberOfTimes, startsWith){
        this._super(schema, numberOfTimes, startsWith);
    },
    newDeal: function(){
        this.distribute([3,2], 1, this.round%4);
    },
    play: function(playerId, card){
        var player = this.getPlayerById(playerId);
        this.trump.push([player, card]);
        if(this.trump.length==4){
            return this.getTrumpWinner();
        }else{
            return WHO_HAS_TO_PLAY;
        }
    },
    getTrumpWinner: function(){
        var winningCard = this.trump[0];
        for(var i=1; i<this.trump.length; i++){
            if(!this.winsAgainst(this.trump[i-1], this.trump[i])){
                winningCard = this.trump[i];
            }
        }
    },
    isTrick: function(card){
      return Card.families.getPosition(card.family) == this.trick;  
    },
    getPlayerById: function(playerId){
      this.players.forEach(function(player){
        if(player.id == playerId){
            return player;
        }
      });  
    },
    winsAgainst: function(card1, card2){
        if(!this.isTrick(card1) && !this.isTrick(card2)){
            if(card1.family == card2.family){
                return this.cardValue.indexOf(Card.families.indexOf(card1.value))<this.cardValue.indexOf(Card.families.indexOf(card2.value));
            }else  if(this.isTrick(card1) && !this.isTrick(card2)){
                return false
            }else  if(!this.isTrick(card1) && this.isTrick(card2)){
                return true;
            }else  if(this.isTrick(card1) && this.isTrick(card2)){
                return this.trickValue.indexOf(Card.families.indexOf(card1.value))<this.trickValue.indexOf(Card.families.indexOf(card2.value));
            }
        }
    }
});

exports.Belote = Belote;