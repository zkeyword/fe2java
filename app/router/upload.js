let express    = require('express'),
	router     = express.Router(),
	fm         = global.fm,
	formidable = require('formidable'),
	fs         = require('fs');

router.get('/', (req, res) => {
	let result,
		data  = { title: 'index' };

	result = fm.renderSync('upload.ftl', data);
	res.type('html');
	res.send(result);
});

router.post('/', (req, res) => {
	let form   = new formidable.IncomingForm(),
        files  = [],
        fields = [];

    form.uploadDir = './public/upload';
	form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
	form.encoding = 'utf-8';		//设置编辑

    form
		.on('field', function(field, value) {
			console.log(field, value);
			fields.push([field, value]);
		})
		.on('file', function(field, file) {
			console.log(field, file);
			files.push([field, file]);
		})
		.on('end', function() {
			console.log('-> upload done');
		});
		
    form.parse(req, (err, fields, files)=>{
		console.log( files.upload.path )

	});
});

module.exports = router;