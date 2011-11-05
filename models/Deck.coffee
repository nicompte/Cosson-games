Card = require("./Card.js").Card
####Card deck
class Deck
  #Build the deck en fonction du nombre de cartes
  constructor: (numberOfCards) ->
    @deck = [];
    switch numberOfCards
      when 32
        for i in [0..31]
          @deck[i] = new Card  i, Math.floor(i/8), (i%8)+5 
      when 52
        for i in [0..51]
          @deck[i] = new Card  i, Math.floor(i/13), (i%13) 
  #Shuffle the deck
  shuffle: ->
    j = 0
    valI = valJ = ''
    l = 31
    while l > -1
      j = Math.floor Math.random() * l
      [@deck[l], @deck[j]] = [@deck[j], @deck[l]]
      l = l - 1
    return
  #Take a given number of cards from the deck
  takeCards: (numberOfCards)->
    @deck.splice 0, numberOfCards
  #Add cards to the deck
  addCards: (cards) ->
    @.deck.push cards
    return
  #Return a cards en fonction de son id
  getCardById: (id) ->
    for card in @deck
      if card.id == id
        card
    return

exports.Deck = Deck
