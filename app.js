const fs           = require('fs');
const path         = require('path');
const express      = require('express');
const app          = express();
//const ejs          = require('ejs');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const session      = require('express-session')
const compression  = require('compression');

//const server       = require('http').createServer(app);

//console.log( process.env.NODE_ENV  )

/* 监听端口并启用 */
app.listen(3000, function () {
  console.log('Server listening at port %d', 3000);
});

/* 关闭x-powered-by */
app.disable('x-powered-by');

/* gzip */ 
app.use(compression());

/* post参数的解析 */ 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie session
app.use(cookieParser());
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));

/* 日志 */
app.use(logger('dev'));
app.use(logger({stream: fs.createWriteStream('log/access.log', {flags: 'a'}) }));

/* 设定静态文件目录 */
app.use(express.static(path.join(__dirname, '/public/static')));
app.use(favicon(__dirname + '/public/favicon.ico'));

/* 设置模板引擎 */
// global.fm = new Freemarker({
	// viewRoot: path.join(__dirname, "app/views")
// });
// app.set('views', path.join(__dirname, 'app/views'));
// app.set('view engine', 'html');
// app.engine('.html', ejs.__express);

/* 添加路由 */
require('./app/router')(app);


// 数据库
require('./app/db');
//var _ = require('lodash');

app.locals.CDN = function(str){
	return 'aaa' + str;
}