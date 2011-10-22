util = require "util"
auth = require "../util/authorized_controller"

module.exports =
  mapping: 
    "index": 
      "url": "/"
      "method": "get"
      "description": "Cosson games main page"
      "auth": false
		
    "secured": 
      "url": "/secured"
      "method": "get"
      "description": "Secured page"
      "auth": true

    "login": 
      "url": "/login"
      "method": "get"
      "description": "Login page"
      "auth": false

    "login_process":
      "url": "/login"
      "method": "post"
      "description": "Login process"
      "auth": false

  index: (req, res) ->
    res.send 'Cosson games\' main page'
    return
    
  secured: (req, res) ->
    res.send 'Accès sécurisé'
    return
    
  login: (req, res) ->
    res.render 'login',  title: 'Login'
    return
    
  login_process: (req, res)  ->
    if !req.body.username || !req.body.password
      res.render 'login',  title: 'Login', error: 'Please enter login information'
    else if req.body.password == 'mdp'
        req.session.username = req.body.username
        res.redirect('/belote/stackoverflow')
     return
