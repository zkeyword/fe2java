var cheerio = require('cheerio');
var should = require('should');
var supertest = require('supertest');
var app = require('../app');
var request = supertest(app);


describe('请求 /login', function () {
	
	it('GET /login', function (done) {
		request
			.get('/login')
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				done();
			});
	});
	
	it('POST /login', function (done) {
		request
			.post('/login')
			.send({ username: 'username', password: '123456', _csrf: '111' })
			.end(function (err, res) {
				(res.status).should.eql(500);
				done();
			});
	});
	
});