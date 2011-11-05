####Belote
class @Belote
  constructor:->
    @potentialTrick = ko.observable(null)
    @canChooseTrick = ko.observable(false)
    @canChooseAnyTrick = ko.observable(false)
    @playableCards = ko.observableArray()
  canPlay: (card) ->
    for playableCard in @playableCards
      if card.value is playableCard.value and card.family is playableCard.family
        return true
    return false