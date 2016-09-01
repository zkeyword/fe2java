const express  = require('express'),
	  router   = express.Router(),
	  fm       = global.fm;

router.get('/', (req,res) => {
	let result,
		data = { title: 'index', appContext: 121 }

	result = fm.renderSync('login.ftl', data);
	res.type('html');
	res.send(result);
});

router.post('/', (req, res) => {
	
});

router.get('/logout', (req, res) => {
	req.session.user = null;
	req.session.error = null;
	res.redirect('/');
});

module.exports = router;