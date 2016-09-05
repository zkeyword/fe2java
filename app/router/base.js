const path       = require('path');
const Freemarker = require('freemarker.js');
const minify     = require('html-minifier').minify;

let base = {};
let fm	 = new Freemarker({
	viewRoot: path.join(__dirname, "../views")
});

base.render = (req, res, tpl, data) => {

	//let ua = req.get('User-Agent');
	res.render(tpl, data);	
	//http://www.tuicool.com/articles/jqmEFf  Bigpipe用Nodejs的实现
};

base.leech = () => {
	var url = require('url');
	var path = require('path');

	// 防盗链类型
	var img = [ '.png', '.jpg', '.jpeg', '.gif', '.swf', '.flv' ];
	
	// 允许访问域名
	var host = ['localhost:3000', 'localhost'];

	// 信任域名
	var isTrustSite = (referer) => {
		// referer 未指定不信任
		if (!referer) {
			return false;
		}
		var url_obj = url.parse(referer);
		for (var i = 0; i < host.length; i++) {
			if (url_obj.host == host[i]) {
			  return true;
			}
		}
		return false;
	};

	// 防止类型
	var filter = (url) => {
		var ext = path.extname(url);
		for (var i = 0; i < img.length; i++) {
			if (ext == img[i]) {
			  return true;
			}
		}
		return false;
	};

	return (req, res, next) => {
		var referer = req.headers.referer;
		var url = req.url;

		if (filter(url)) {
			if (!isTrustSite(referer)) {
			  res.send('');
			  return;
			}
		}

		next();
	}

};

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
};

base.getClientIp = req => {
	return req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
};

module.exports = base;
