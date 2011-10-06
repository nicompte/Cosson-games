CardGame = require('./CardGame').CardGame
Deck = require('./Deck').Deck

class Belote extends CardGame
  constructor: (players) ->
    deck = new Deck 32
    deck.shuffle()
    super
    @teams = @trick = []
    @trump = @trickTaker = null
    @cardValue = [5, 6, 7, 9, 10, 11,  8, 12]
    @trickValue = [5, 6, 10, 11, 8, 12, 7, 9]
    
  setTeams: (t1, t2) ->
    @teams[0]=t1
    @teams[1]=t2
    return

  distribute: (schema, numberOfTimes, startsWith) ->
   super
   return

  getPlayerById: (playerId) ->
    for player in @players
      if(player.id == playerId)
        player
            
  newDeal: ->
    @distribute([3,2], 1, @round%4)
    return
    
  play: (playerId, card) ->
    player = @getPlayerById(playerId)
    this.trump.push([player, card])
    if @trump.length==4
      [true, @getTrumpWinner()]
    else
      [false, WHO_HAS_TO_PLAY]
        
  getTrumpWinner: ->
    winningCard = @trump[0];
    for i in [1..@trum.length]
      if !@winsAgainst(@trump[i-1], @trump[i])
        winningCard = @trump[i]
      
    
  isTrick: (card) ->
    Card.families.getPosition(card.family) == @trick;  
    
  getPlayerById: (playerId) ->
    for player in @players
      if player.id == player
        player
      
    
  winsAgainst: (card1, card2) ->
    if !@isTrick(card1) && !@isTrick(card2)
      if card1.family == card2.family
        @cardValue.indexOf(Card.families.indexOf(card1.value))<@cardValue.indexOf(Card.families.indexOf(card2.value))
       else  if @isTrick(card1) && !@isTrick(card2)
         false
       else  if !@isTrick(card1) && @isTrick(card2)
         true;
       else  if @isTrick(card1) && @isTrick(card2)
         @trickValue.indexOf(Card.families.indexOf(card1.value))<@trickValue.indexOf(Card.families.indexOf(card2.value))

exports.Belote = Belote
