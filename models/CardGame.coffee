Deck = require('./Deck.js').Deck

class CardGame
  constructor: (@deck, @players) ->
    @round = 0;

  distribute: (schema, numberOfTimes, startsWith) ->
    deck = @deck;
    for i in [startsWith .. numberOfTimes]
      for player in @players
        player.hand.push deck.takeCards schema[i]
    return

exports.CardGame = CardGame
