(function() {
  var Card;
  Card = (function() {
    function Card(id, familyId, familyLabel, valueId, valueLabel) {
      this.id = id;
      this.family = {
        id: familyId,
        label: familyLabel
      };
      this.value = {
        id: valueId,
        label: valueLabel
      };
    }
    Card.families = {
      en: ["Hearts", "Diamonds", "Spades", "Clubs"],
      fr: ["Cœur", "Carreau", "Pique", "Trèfle"]
    };
    Card.values = {
      en: ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"],
      fr: ["2", "3", "4", "5", "6", "7", "8", "9", "D", "V", "D", "R", "A"]
    };
    return Card;
  })();
  exports.Card = Card;
}).call(this);
