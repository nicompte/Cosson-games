(function() {
  var auth, util;
  util = require("util");
  auth = require("../util/authorized_controller");
  module.exports = {
    mapping: {
      "index": {
        "url": "/",
        "method": "get",
        "description": "Cosson games main page",
        "auth": false
      },
      "secured": {
        "url": "/secured",
        "method": "get",
        "description": "Secured page",
        "auth": true
      },
      "login": {
        "url": "/login",
        "method": "get",
        "description": "Login page",
        "auth": false
      },
      "login_process": {
        "url": "/login",
        "method": "post",
        "description": "Login process",
        "auth": false
      }
    },
    index: function(req, res) {
      res.send('Cosson games');
    },
    secured: function(req, res) {
      res.send('Acc�s s�curis�');
    },
    login: function(req, res) {
      res.render('login', {
        title: 'Login'
      });
    },
    login_process: function(req, res) {
      if (!req.body.username || !req.body.password) {
        res.render('login', {
          title: 'Login',
          error: 'Please enter login information'
        });
      } else if (req.body.username === 'nbarbotte' && req.body.password === 'mdp') {
        req.session.username = req.body.username;
        res.redirect('/belote/stackoverflow', {
          title: 'Cosson games'
        });
      }
    }
  };
}).call(this);
