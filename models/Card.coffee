####Card
class Card
  constructor: (@id, familyId, familyLabel, valueId, valueLabel) ->
    @family= id: familyId, label: familyLabel
    @value= id: valueId, label: valueLabel
  #Card families
  @families:
    en: ["Hearts", "Diamonds", "Spades", "Clubs"]
    fr: ["Cœur", "Carreau", "Pique", "Trèfle"]

  @values:
    en: ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
    fr: ["2", "3", "4", "5", "6", "7", "8", "9", "D", "V", "D", "R", "A"]

exports.Card = Card
