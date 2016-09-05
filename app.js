const fs           = require('fs');
const path         = require('path');
const express      = require('express');
const app          = express();
const ejs          = require('ejs');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const session      = require('express-session')
const compression  = require('compression');

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
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

/* 日志 */
app.use(logger('dev'));
app.use(logger('combined', {stream: fs.createWriteStream(path.join(__dirname, '/log/access.log'), {flags: 'a'}) }));
// 日志分割 https://github.com/expressjs/morgan

/* 设定静态文件目录 */
app.use(express.static(path.join(__dirname, '/public/static')));
app.use(favicon(__dirname + '/public/favicon.ico'));

/* 设置模板引擎 */
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

/* 添加路由 */
require('./app/router')(app);


// 数据库
require('./app/db');
//var _ = require('lodash');

app.locals.CDN = function(str){
	return 'aaa' + str;
}

module.exports = app;