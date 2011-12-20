(function() {
  var Player;
  Player = (function() {
    function Player(id, name) {
      this.id = id;
      this.name = name;
      this.hand = [];
    }
    return Player;
  })();
  exports.Player = Player;
}).call(this);
