let express  = require('express'),
	router   = express.Router(),
	fm       = global.fm;

module.exports = function () {
    router.get('/logout', function(req, res){
        req.session.user = null;
        req.session.error = null;
        res.redirect('/');
    });
}