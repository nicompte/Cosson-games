(function() {
  var auth, bootController, fs, mappingString;
  fs = require("fs");
  auth = require("../util/authorized_controller");
  mappingString = "";
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
                return app.get(a.url, fn);
              } else {
                return app.get(a.url, [auth.handle_authorized_request], fn);
              }
              break;
            case "post":
              if (!a.auth) {
                return app.post(a.url, fn);
              } else {
                return app.post(a.url, [auth.handle_authorized_request], fn);
              }
              break;
            case "put":
              if (!a.auth) {
                return app.put(a.url, fn);
              } else {
                return app.put(a.url, [auth.handle_authorized_request], fn);
              }
              break;
            case "delete":
              if (!a.auth) {
                return app.del(a.url, fn);
              } else {
                return app.del(a.url, [auth.handle_authorized_request], fn);
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
      return fs.readdir(__dirname + "/../controllers", function(err, files) {
        var file, _i, _len;
        if (err) {
          throw err;
        }
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          if (/.js$/.test(file)) {
            bootController(app, file);
            return;
          }
        }
      });
    }
  };
}).call(this);
