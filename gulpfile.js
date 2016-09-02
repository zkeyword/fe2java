var gulp         = require("gulp"),
	less         = require("gulp-less"),
	postcss      = require('gulp-postcss'),
	cssurl       = require('gulp-cssurl'),
	base64       = require('gulp-base64'),
	lessFunction = require('less-plugin-functions')	,
	processors   = [
		require('autoprefixer'),
		require('css-mqpacker'),
		require('postcss-pxtorem')({
			rootValue: 33.75 * 3,// 1080/3 1080的设计稿 flexible.js
			unitPrecision: 5,
			propWhiteList:[],
			selectorBlackList: [],
			replace: true,
			mediaQuery: false,
			minPixelValue: 0
		}),
		require('cssnano')({
			zindex: false,
			colormin: false
		})
	],
	dev          = {
		views: 'app/views/',
		static: 'static/',
	},
	bulid        = {
		views: 'public/WEB-INF/templates/',
		static: 'public/static/',
		bulid: 'test/'
	}
	

gulp.task("help",function(){
	var tasks = Object.keys(gulp.tasks);
	for(var task in tasks){
		console.log("gulp %s",tasks[task]);
	}
});
	

/**
* M站部分
*/
/* styles */
gulp.task('styles:less', function () {
    gulp.src(dev.static + "/less/styles.less")
        .pipe(less({plugins: [new lessFunction()]}))
        .pipe(postcss(processors))
        .pipe(cssurl())
        .pipe(base64({maxImageSize: 20 * 1024}))
        .pipe(gulp.dest(bulid.static + "/css/app/"))
});
gulp.task('styles', ['styles:less'], function () {
    gulp.src(dev.static + '/fonts/fonts/*')
        .pipe(gulp.dest(bulid.static + "/css/app/fonts"))
    gulp.src(dev.static + '/images/*')
        .pipe(gulp.dest(bulid.static + "/css/app/images"))
    gulp.watch(dev.static+ "/less/**/*.less", ['styles:less'])
	gulp.watch(dev.static+ '/fonts/fonts/*', ['styles:less'])
});

/* 发布 */
let replace = require('gulp-replace');
let tool    = require('./bin/tool')
gulp.task('bulid', function () {
	
    gulp.src(dev.static)
        .pipe(gulp.dest(bulid.bulid))
		
	let s = gulp.src(dev.views + '/**/*.ftl')
		.pipe( tool({dd:111}) )
        .pipe(gulp.dest(bulid.bulid))
		
	// gulp.src(dev.views + '/**/*.ftl')
		// .pipe( replace(/<script src="(.*)">/g, '<@js serverName="fastued" src="$1" />') )
        // .pipe(gulp.dest(bulid.bulid))
    // gulp.src(dev.views)
        // .pipe(gulp.dest(bulid.bulid))
});



gulp.task('w', ()=>{
	gulp.src('app.js')
		.pipe( require('gulp-uglify')() )
		.pipe(gulp.dest('a'));	
})