(function() {
  this.Message = (function() {
    function Message(message, author) {
      this.message = message;
      this.author = author;
    }
    return Message;
  })();
}).call(this);
