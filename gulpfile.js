/************ dev vs prod env ***************/
const devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() == 'development');

/************ dirs. locations ***************/
const dir = {
	root	: 'support/',
	src		: 'support/src/',
	build	: 'support/build/'
};

/**************** modules *******************/
const gulp  		= require('gulp');
const noop 			= require('gulp-noop');
const imagemin 		= require('gulp-imagemin');
const newer			= require('gulp-newer');
const size 			= require('gulp-size');
const sass			= require('gulp-sass');
const postcss 		= require('gulp-postcss');
const cleancss		= require('gulp-clean-css');
const concat		= require('gulp-concat');
const uglify		= require('gulp-uglify');
const sourcemaps	= devBuild ? require('gulp-sourcemaps') : null;
const browsersync	= devBuild ? require('browser-sync').create() : null;
const reload		= devBuild ? browsersync.reload : null;




/************* image section ***************/
const imgConfig = {
	src		: dir.src + 'images/**/*',
	build	: dir.build + 'images/',
	//	minOpts	: {
	//		optimizationLevel : 5
	//	},
	minOpts : [
		imagemin.gifsicle({interlaced:true}),
		imagemin.jpegtran({progressive:true}),
		imagemin.optipng({optimizationLevel:5})
	]
};

function images() {
	return gulp.src(imgConfig.src)				// gulp src is passed the source folder
		.pipe(newer(imgConfig.build))			// gulp newer removes any new images already in build folder
		.pipe(imagemin(imgConfig.minOpts))		// gulp imagemin optimizes remaining files
		.pipe(size({ showFiles:true  }))		// gulp size reports size of processed files
		.pipe(gulp.dest(imgConfig.build));		// files saved to gulp.dest build folder
}


/*************** css section ***************/
const cssConfig = {
	src		: dir.src + 'sass/main.scss',
	build	: dir.build + 'css/',
	watch	: dir.src + 'sass/**/*',

	sassOpts: {
		sourceMap		: devBuild,
		imagePath		: '/images/',
		outputStyle		: 'expanded',
		precision		: 3,
		errLogToConsole	: true
	},

	srcMaps: {
		loadMaps	: true,
		largeFile	: true
	},

	postCSS: [
		require('usedcss')({				// removes unused selectors
			html 		: ['index.html']
		}),
		require('autoprefixer')({ 			// postCSS plugin adds vendor prefixes according to caniuse.com
			browsers	: ['> 1%']
		}),
		require('cssnano')					// minifies resulting css file -- remove whitespace, etc...
	]
};

function css() {
	return gulp.src(cssConfig.src)
		.pipe(sourcemaps ? sourcemaps.init({ loadMaps:true }) : noop())  // if devBuild, then sourcemaps
		.pipe(sass(cssConfig.sassOpts).on('error', sass.logError))		 // preprocesses main.scss to css
		.pipe(postcss(cssConfig.postCSS))								 // applies plugins in postCSS array
		.pipe(sourcemaps ? sourcemaps.write() : noop())					 // if sourcemaps, then append to css file
		.pipe(size({ showFiles:true  }))								 // display final size of css file
		.pipe(gulp.dest(cssConfig.build))								 // files saved to gulp.dest build folder
		.pipe(browsersync ? browsersync.reload({ stream:true }) : noop());
}
/*
function concatCSS() {
	return gulp.src(cssConfig.build)
		.pipe(sourcemaps ? sourcemaps.init(cssConfig.srcMaps) : noop())
		.pipe(concat('style.min.css'))
		.pipe(cleancss())
		.pipe(sourcemaps ? sourcemaps.write('./maps/') : noop())
		.pipe(cleancss())
		.pipe(gulp.dest(cssConfig.src))
}
*/

/*************** js section ****************/
const jsConfig = {
	src		: dir.src + 'js/',
	build	: dir.build + 'js/',
//	watch	:
};

function javascripting() {
	return gulp.src(jsConfig.src)
		.pipe(concat('----'))
		.pipe(uglify())
		.pipe(gulp.dest(jsConfig.build));
}


/************** watch section **************/
const watchConfig = {
	server	: {
		baseDir	: './',
		index	: 'index.html'
	},
	port	: 8080,
	open	: 'external',
//	proxy 	: 'http://localhost:8888/gen2'
};

function watch() {
	browsersync.init(watchConfig);
	gulp.watch(cssConfig.watch, css)
	gulp.watch(jsConfig.src, javascripting);
	gulp.watch(imgConfig.src, images);
	gulp.watch(['./index.html', jsConfig.build + 'supp-gen.js', 'style.css']).on('change', browsersync.reload);
}

/************ exports section *************/
exports.images			= images;
exports.css 			= gulp.series(images, css);
//exports.concatCSS		= concatCSS;
exports.javascripting	= javascripting;
exports.watch			= watch;

const build = gulp.parallel(watch);
gulp.task('default', build)
