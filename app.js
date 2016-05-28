let express = require('express');
let path    = require('path');
//let ejs     = require('ejs');

let app     = express();
let router  = require('./router.js');


//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
//app.engine('.html', ejs.__express);

app.use(router);



app.listen(3000);