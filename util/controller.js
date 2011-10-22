(function() {
  var auth, bootController, fs;
  fs = require("fs");
  auth = require("../util/authorized_controller");
  bootController = function(app, file) {
    var actions, mapping, name;
    name = file.replace(".js", "");
    actions = require("../controllers/" + name);
    mapping = actions["mapping"];
    Object.keys(actions).map(function(action) {
      var a, fn;
      fn = actions[action];
      if (typeof fn === "function") {
        if (a = mapping[action]) {
          switch (a.method) {
            case "get":
              if (!a.auth) {
                app.get(a.url, fn);
              } else {
                app.get(a.url, [auth.handle_authorized_request], fn);
              }
              break;
            case "post":
              if (!a.auth) {
                app.post(a.url, fn);
              } else {
                app.post(a.url, [auth.handle_authorized_request], fn);
              }
              break;
            case "put":
              if (!a.auth) {
                app.put(a.url, fn);
              } else {
                app.put(a.url, [auth.handle_authorized_request], fn);
              }
              break;
            case "delete":
              if (!a.auth) {
                app.del(a.url, fn);
              } else {
                app.del(a.url, [auth.handle_authorized_request], fn);
              }
          }
        } else {
          return console.log("WARNING: no mapping for " + action + " defined");
        }
      }
    });
  };
  module.exports = {
    bootControllers: function(app) {
      fs.readdir(__dirname + "/../controllers", function(err, files) {
        var file, _i, _len, _results;
        if (err) {
          throw err;
        }
        _results = [];
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          if (/.js$/.test(file)) {
            _results.push(bootController(app, file));
          }
        }
        return _results;
      });
    }
  };
}).call(this);
