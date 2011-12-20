(function() {
  this.Card = (function() {
    function Card(id, family, value, language) {
      this.id = id;
      this.family = Card.families[language][family];
      this.value = Card.values[language][value];
      this.playable = false;
    }
    Card.families = {
      en: ["Hearts", "Diamonds", "Spades", "Clubs"],
      fr: [
        {
          id: 0,
          label: "Cœur",
          shortLabel: "C"
        }, {
          id: 1,
          label: "Carreau",
          shortLabel: "Ca"
        }, {
          id: 2,
          label: "Pique",
          shortLabel: "P"
        }, {
          id: 3,
          label: "Trèfle",
          shortLabel: "T"
        }
      ]
    };
    Card.values = {
      en: ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"],
      fr: [
        {
          id: 0,
          label: 'Deux',
          shortLabel: '2'
        }, {
          id: 1,
          label: 'Trois',
          shortLabel: '3'
        }, {
          id: 2,
          label: 'Quatre',
          shortLabel: '4'
        }, {
          id: 3,
          label: 'Cinq',
          shortLabel: '5'
        }, {
          id: 4,
          label: 'Six',
          shortLabel: '6'
        }, {
          id: 5,
          label: 'Sept',
          shortLabel: '7'
        }, {
          id: 6,
          label: 'Huit',
          shortLabel: '8'
        }, {
          id: 7,
          label: 'Neuf',
          shortLabel: '9'
        }, {
          id: 8,
          label: 'Dix',
          shortLabel: 'D'
        }, {
          id: 9,
          label: 'Valet',
          shortLabel: 'V'
        }, {
          id: 10,
          label: 'Dame',
          shortLabel: 'D'
        }, {
          id: 11,
          label: 'Roi',
          shortLabel: 'R'
        }, {
          id: 12,
          label: 'As',
          shortLabel: 'A'
        }
      ]
    };
    return Card;
  })();
}).call(this);
