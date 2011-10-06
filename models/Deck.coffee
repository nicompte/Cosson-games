Card = require("./Card.js").Card

class Deck
  constructor: (numberOfCards) ->
    @deck = [];
    switch numberOfCards
      when 32
        for i in [0..31]
          @deck[i] = new Card i, Card.families['fr'][Math.floor(i/8)] , Card.values['fr'][(i%8)+5] 
       when 52
         for i in [0..51]
            @deck[i] = new Card i, Card.families['fr'][Math.floor(i/13)] , Card.values['fr'][(i%13)]

  shuffle: ->
    j = 0
    valI = valJ = ''
    l = 31
    while l > -1
      j = Math.floor Math.random() * l
      [@deck[l], @deck[j]] = [@deck[j], @deck[l]]
      l = l - 1
    return
        
  takeCards: (numberOfCards)->
    @deck.splice 0, numberOfCards
    return
    
  addCards: (cards) ->
    @.deck.push cards
    return

  getCardById: (id) ->
    for card in @deck
      if card.id == id
        card
    return

exports.Deck = Deck
