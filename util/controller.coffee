fs = require("fs")
auth = require("../util/authorized_controller")
mappingString = ""

bootController = (app, file) ->
  name = file.replace(".js", "")
  actions = require("../controllers/" + name)
  mapping = actions["mapping"]
  Object.keys(actions).map (action) ->
    fn = actions[action]
    if typeof (fn) == "function"
      if a = mapping[action]
        switch a.method
          when "get"
            unless a.auth
              app.get a.url, fn
            else 
              app.get a.url, [ auth.handle_authorized_request ], fn
          when "post"
            unless a.auth
              app.post a.url, fn
            else 
              app.post a.url, [ auth.handle_authorized_request ], fn
          when "put"
            unless a.auth 
              app.put a.url, fn
            else 
              app.put a.url, [ auth.handle_authorized_request ], fn
          when "delete"
            unless a.auth 
              app.del a.url, fn
            else 
              app.del a.url, [ auth.handle_authorized_request ], fn
      else console.log "WARNING: no mapping for " + action + " defined"
  return

module.exports = bootControllers: (app) ->
  fs.readdir __dirname + "/../controllers", (err, files) ->
    throw err  if err
    for file in files when /.js$/.test(file)
      bootController app, file
      return
