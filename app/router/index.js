let base     = require('./base');
	home     = require('./home'),
	login    = require('./login'),
	register = require('./register'),
	upload   = require('./upload')

module.exports = app => {
	
	app.use(base.compress());
	
	app.use('/', home);
	
	app.use('/login', login);
	
	app.use('/register', register);
	
	app.use('/upload', upload);
	
	app.use((err, req, res, next) => {
		if( err.code == 'EBADCSRFTOKEN' ){
			res.send('非法请求')
		}
		console.log(err)
		res.status(500);
		//res.status(500).render('5xx', {error: err});
	});
	
	app.use((req, res, next) => {
		res.status(404);
		next();
	});
	
};
