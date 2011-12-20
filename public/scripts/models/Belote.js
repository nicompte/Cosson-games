(function() {
  this.Belote = (function() {
    function Belote() {
      this.potentialTrick = ko.observable(null);
      this.canChooseTrick = ko.observable(false);
      this.canChooseAnyTrick = ko.observable(false);
      this.playableCards = ko.observableArray();
    }
    Belote.prototype.canPlay = function(card) {
      var playableCard, _i, _len, _ref;
      _ref = this.playableCards;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        playableCard = _ref[_i];
        if (card.value === playableCard.value && card.family === playableCard.family) {
          return true;
        }
      }
      return false;
    };
    return Belote;
  })();
}).call(this);
