const express  = require('express');

let router = express.Router(),
	base   = require('./base');

router.get('/', (req,res) => {
	let data = { title: 'index', appContext: 121 }


	console.log(req.headers)

	base.render(req, res, 'home.html', data);
});

module.exports = router;