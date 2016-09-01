let mongoose = require('mongoose');
	
mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to mongodb://localhost/test');  
});
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});