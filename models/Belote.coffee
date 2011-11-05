CardGame = require('./CardGame').CardGame
Deck = require('./Deck').Deck
####Belote game
class Belote extends CardGame
  constructor: (players) ->
    deck = new Deck 32
    deck.shuffle()
    super deck, players
    @teams = @trump = []
    @trick = @trickTaker = @potentialTrick = null
    @trickRound = 0
    @playround = 0
    #Set the card values, specific à la belote
    @cardValue = [5, 6, 7, 9, 10, 11,  8, 12]
    @trickValue = [5, 6, 10, 11, 8, 12, 7, 9]
  
  #Set teams
  setTeams: (t1, t2) ->
    @teams[0]=t1
    @teams[1]=t2
    return
  
  #@see CardGame
  distribute: (schema, numberOfTimes, startsWith) ->
    super
    return
  
  #@see CardGame
  getPlayerById: (playerId) ->
    super
  
  #New deal, 3 then 2 cards          
  newDeal: ->
    @roundTrick = @round
    @distribute([3,2], 1, @round%4)
    return

  #Continue distribution after trick is chosen
  endDistribution: ->
    currentPlayer = @round
    for i in [0..3]
      if @players[i].id is @trickTaker
        @players[currentPlayer].hand = @players[currentPlayer].hand.concat(@deck.takeCards 2)
      else
        @players[currentPlayer].hand = @players[currentPlayer].hand.concat(@deck.takeCards 3)
      if currentPlayer is @players.length          
        currentPlayer=0 
      else 
        currentPlayer++
    return
  
  #Play a card
  play: (playerId, card) ->
    player = @getPlayerById(playerId)
    this.trump.push([player, card])
    if @trump.length==4
      [true, @getTrumpWinner()]
    else
      [false, WHO_HAS_TO_]
      
    
  #Return playable cards
  getPlayableCardsByPlayerId: (playerId) ->
    hand = @getPlayerById(playerId).hand
    return hand if @trump.length is 0
    playableCards = []
    for card in hand
      if card.family is @trump[0].family
        playableCards.push(card)
    if playableCards.length is 0
      for card in hand
        if card.family is @trick
          playableCards.push(card)
    if playableCards.length is 0
      return hand
  
  #Get the trump winner
  getTrumpWinner: ->
    winningCard = @trump[0];
    for i in [1..@trum.length]
      if !@winsAgainst(@trump[i-1], @trump[i])
        winningCard = @trump[i]
    return winningCard
  
  #Return true if a card is trick
  isTrick: (card) ->
    card.family == @trick;
  
  #Return the first card from the deck
  getPotentialTrick: ->
    if @potentialTrick is null
      @potentialTrick = @deck.takeCards(1)[0]
    else
      @potentialTrick
  
  #Set the trick for the current game
  setTrick: (@trick, @trickTaker) ->
    @endDistribution()
    @playRound = @round%4
  
  #Return true if card1 wins agains card2  
  winsAgainst: (card1, card2) ->
    if !@isTrick(card1) && !@isTrick(card2)
      if card1.family == card2.family
        @cardValue.indexOf(card1.value)<@cardValue.indexOf(card2.value)
       else  if @isTrick(card1) && !@isTrick(card2)
         false
       else  if !@isTrick(card1) && @isTrick(card2)
         true
       else  if @isTrick(card1) && @isTrick(card2)
         @trickValue.indexOf(card1.value)<@trickValue.indexOf(card2.value)

exports.Belote = Belote
