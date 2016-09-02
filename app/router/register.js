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

router.get('/captcha', csrf, (req, res) => {
	
	
	
	/* var captchapng = require('captchapng');
	var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
	p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
	p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

	var img = p.getBase64();
	var imgbase64 = new Buffer(img,'base64');
	res.writeHead(200, {
		'Content-Type': 'image/png'
	});
	res.end(imgbase64); */
	
	var ccap = require('ccap')(256,40,35);
	
	var ary = ccap.get();

    var txt = ary[0];

    var buf = ary[1];
	
	res.writeHead(200, {
		'Content-Type': 'image/png'
	});
	
	req.session.ccap = txt;

    res.end(buf);
});

router.get('/gm', csrf, (req, res) => {
	
	var fs = require('fs')
	  , gm = require('gm');

	// resize and remove EXIF profile data
	gm('/static/img/kf.png')
		.resize(240, 240)
		.noProfile()
		.write('/test/kf.png', function (err) {
		  if (!err) console.log('done');
		});
	
	
});


router.get('/images', csrf, (req, res) => {
	
	var images = require("images");

		images("/static/img/kf.png", 50, 50, 50, 50)                     //Load image from file 
												//加载图像文件
			//.size(400)                          //Geometric scaling the image to 400 pixels width
												//等比缩放图像到400像素宽
			//.draw(images("logo.png"), 10, 10)   //Drawn logo at coordinates (10,10)
												//在(10,10)处绘制Logo
			.save("/test/kf.png");
	
});

module.exports = router;