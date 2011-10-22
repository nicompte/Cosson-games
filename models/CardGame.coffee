Deck = require('./Deck.js').Deck
####Card game
class CardGame
  constructor: (@deck, @players) ->
    @round = 0; 
  
  #Distribute the cards, given a schema, a number of iterations and the player you start distributing to
  distribute: (schema, numberOfTimes, startsWith) ->
    currentPlayer = startsWith
    for i in [0..numberOfTimes-1]
      for k in [0..schema.length-1]
        for j in [0..@players.length-1]
          @players[currentPlayer].hand = @players[currentPlayer].hand.concat(@deck.takeCards schema[k])
          if currentPlayer is @players.length          
            currentPlayer=0 
          else 
            currentPlayer++
        currentPlayer = startsWith
    return
  
  #Return a player by its id
  getPlayerById: (playerId) ->
    for player in @players
      if(player.id is playerId)
        return player
    return null

exports.CardGame = CardGame
