(function() {
  var Card;
  Card = (function() {
    var families, values;
    function Card(id, family, value) {
      this.id = id;
      this.family = family;
      this.value = value;
    }
    families = {
      en: ["Hearts", "Diamonds", "Spades", "Clubs"],
      fr: ["Cœur", "Carreau", "Pique", "Trèfle"]
    };
    values = {
      en: ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"],
      fr: ["2", "3", "4", "5", "6", "7", "8", "9", "D", "V", "D", "R", "A"]
    };
    return Card;
  })();
  exports.Card = Card;
}).call(this);
