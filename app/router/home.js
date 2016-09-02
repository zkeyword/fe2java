const express  = require('express'),
	  router   = express.Router(),
	  base     = require('./base');

router.get('/',function(req,res){
	let data = { title: 'index', appContext: 121 }

	base.render(req, res, 'error.ftl', data);
});

module.exports = router;