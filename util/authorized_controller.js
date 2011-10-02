module.exports = {
	handle_authorized_request: function(req, res, next) {
      if (req.session.username) {
        next();
      } else {
        res.redirect("/login");
      }
    }
}