let express  = require('express'),
	router   = express.Router(),
	csrf     = require('csurf')({ cookie: true }),
	base     = require('./base');
	User     = require('../model').user,
	xss      = require('xss')

router.get('/', csrf, (req, res) => {
	let data  = { title: 'index', token: req.csrfToken() };
		
	User.find({}, function(err, data){
		console.log(data)
	});
	
	base.render(req, res, 'register.ftl', data);
});

router.post('/', csrf, (req, res) => {
	let body = req.body,
		user = new User();
	
	user.username   = xss(body.username);
	user.password   = xss(body.password);
	user.confirmpwd = xss(body.confirmpwd);
	user.email      = xss(body.email);

	user.register().then(function() {
		req.session.username = body.username;
		res.redirect('/register');
	}).catch(function(err) {
		let errorMessage = '';
		switch( err ) {
			case user.USERNAME_IS_NOT_VALIDATE:
			//console.log('用户名格式不正确');
			errorMessage = '用户名格式不正确';
			break;

			case user.PASSWORD_IS_NOT_VALIDATE:
			//console.log('密码格式不正确');
			errorMessage = '密码格式不正确';
			break

			case user.TWO_PASSWORD_IS_NOT_MATCH:
			//console.log('两次输入的密码不一致');
			errorMessage = '两次输入的密码不一致';
			break

			case user.EMAIL_IS_NOT_VALIDATE:
			//console.log('邮箱格式不正确');
			errorMessage = '邮箱格式不正确';
			break

			case user.USERNAME_IS_TO_BE_USED:
			//console.log('用户名已经被注册了');
			errorMessage = '用户名已经被注册了';
			break

			case user.EMAIL_IS_TO_BE_USED:
			//console.log('邮箱已经被注册了');
			errorMessage = '邮箱已经被注册了';
			break

			default:
			//console.log('发生了一点意外');
			errorMessage = '发生了一点意外';
			break;
		}
		res.send(errorMessage);
	});
});

module.exports = router;