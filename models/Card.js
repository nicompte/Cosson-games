function Card(id, family, value){
    this.id = id;
    this.family = family;
    this.value = value;
}

Card.families = {
    en: ["Hearts", "Diamonds", "Spades", "Clubs"],
    fr: ["Cœur", "Carreau", "Pique", "Trèfle"]
};

Card.values = {
    en: ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"],
    fr: ["2", "3", "4", "5", "6", "7", "8", "9", "D", "V", "D", "R", "A"]
};

exports.Card = Card;