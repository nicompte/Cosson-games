var util = require("util"),
auth = require("../util/authorized_controller");

module.exports = {

    mapping: {
		"belote" : {
			"url": "/belote/:template",
			"method": "get",
			"description": "Belote main page",
			"auth": true
		}
	},
    
    belote: function(req, res){
        res.render(req.params.template+'/index', { title: 'Cosson games' });
    }
}