let express = require('express');
let path    = require('path');
//let ejs     = require('ejs');

let app     = express();
let router  = require('./router.js');

let bodyParser = require('body-parser');
let multer = require('multer');
let session = require('express-session');



let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test');
let Schema = mongoose.Schema


//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
//app.engine('.html', ejs.__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(router);



app.listen(3000);