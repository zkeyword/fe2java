const express  = require('express');

let router = express.Router(),
	base   = require('./base');

router.get('/', (req,res) => {
	let data = { title: 'index', appContext: 121 }

	base.render(req, res, 'home.html', data);
});

router.post('/', (req, res) => {
	
});

router.get('/logout', (req, res) => {
	req.session.user = null;
	req.session.error = null;
	res.redirect('/');
});

module.exports = router;