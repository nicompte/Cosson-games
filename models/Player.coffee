#A player basically just has a hand of cards
class Player
  constructor: (@id, @name) ->
    this.hand = []

exports.Player = Player
