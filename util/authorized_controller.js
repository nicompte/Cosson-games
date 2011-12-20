(function() {
  module.exports = {
    handle_authorized_request: function(req, res, next) {
      if (req.session.username) {
        return next();
      } else {
        return res.redirect("/login");
      }
    }
  };
}).call(this);
