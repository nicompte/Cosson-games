####Card deck
class @Deck
  #Build the deck en fonction du nombre de cartes
  constructor: (numberOfCards) ->
    @deck = [];
    switch numberOfCards
      when 32
        for i in [0..31]
          @deck[i] = new Card i, Math.floor(i/8), (i%8)+5, 'fr' 
      when 52
        for i in [0..51]
          @deck[i] = new Card i, Math.floor(i/13) , (i%13), 'fr'
