####Belote
class @Belote
  constructor:->
    @potentialTrick = ko.observable(null)
    @canChooseTrick = ko.observable(false)
    @canChooseAnyTrick = ko.observable(false)
  canPlay: ->
    false
