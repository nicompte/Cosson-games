module.exports = 
  handle_authorized_request: (req, res, next) ->
    if req.session.username
      next()
    else
      res.redirect("/login")
