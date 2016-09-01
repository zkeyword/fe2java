const path       = require('path');
const Freemarker = require('freemarker.js');
const minify     = require('html-minifier').minify;

let base = {};
let fm	 = new Freemarker({
	viewRoot: path.join(__dirname, "../views")
});

base.render = (req, res, tpl, data) => {

	//let ua = req.get('User-Agent');
	//res.render(tml, data);
	
	res.type('html');
	res.send( fm.renderSync(tpl, data) );
	
	//http://www.tuicool.com/articles/jqmEFf  Bigpipe用Nodejs的实现
}

base.compress = () => {
	return (req, res, next) => {
		let send = res.send;
		res.send = (body) => {
		if('string' == typeof body)
			//doc https://github.com/kangax/html-minifier
			body = minify(body,{
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				removeScriptTypeAttributes: true,
				removeEmptyAttributes: true
			});
			send.call(res, body);
		}
		next();
	}
}

base.getClientIp = req => {
	return req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
};

module.exports = base;
