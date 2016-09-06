var cheerio = require('cheerio');
var should = require('should');
var supertest = require('supertest');
var app = require('../app');
var request = supertest(app);


describe('请求 /register', function () {
	let _csrf = '';
	/* before((done)=>{
		request
			.get('/register')
			.expect(200)
			.end(function (err, res) {
				let $ = cheerio.load( res.text );
				_csrf = $('input[name="_csrf"]').val();
				should.not.exist(err);
				done();
			});
	}); */
	
	it('GET /register', function (done) {
		request
			.get('/register')
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				done();
			});
	});
	
	it('POST /register', function (done) {
		request
			.post('/register')
			.send({ username: 'username', password: '123456', _csrf: '111' })
			.end(function (err, res) {
				(res.status).should.eql(500);
				//(res.status === 500).should.be.true;
				//true.should.not.be.ok;
				done();
			});
	});
});