const express  = require('express'),
	  router   = express.Router(),
	  fm       = global.fm;

router.get('/',function(req,res){
	let result,
		data = { title: 'index', appContext: 121 }

	result = fm.renderSync('error.ftl', data);
	res.type('html');
	res.send(result);
});


module.exports = router;