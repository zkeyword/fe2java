let express = require('express'),
	router = express.Router()
let path    = require('path');
	
let Freemarker = require('freemarker.js');	

let fm = new Freemarker({
	viewRoot: path.join(__dirname, "/views")
});
	
router.get('/', function(req, res) {
    //res.render('index', { title: 'index' });
	var data = { "title": 'index', "detail":"1.阿斯蒂芬\n2.生动丰富\n3.但是佛诶感觉\n4.多少分" }

	var result = fm.renderSync('index.ftl', data);
	res.type('html');
	res.send(result);
});
	
module.exports = router;


// 设置跨域访问
/* app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("x-Powered-By", " 3.2.1");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
}); */