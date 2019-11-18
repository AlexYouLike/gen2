var settings = {
	clean: true,
	scripts: true,
	polyfills: true,
	styles: true,
	svgs: true,
	copy: true,
	reload: true,
	images: true
};

var paths = {
	input: 'src/',
	output: 'dist/',
	scripts: {
		input: 'src/js/*',
		polyfills: '.polyfill.js',
		output: 'dist/js/'
	},
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'dist/css/'
	},
	svgs: {
		input: 'src/svg/*.svg',
		output: 'dist/svg/'
	},
	copy: {
		input: 'src/copy/**/*',
		output: 'dist/'
	},
	images: {
		input: 'src/images/**/*',
		output: 'dist/images/'
	},
	reload: './dist/'
};

var banner = {
	main: ''
};

var {gulp, src, dest, watch, series, parallel} = require('gulp');
var del = require('del');
var flatmap = require('gulp-flatmap');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-terser');
var optimizejs = require('gulp-optimize-js');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var prefix = require('autoprefixer');
var minify = require('cssnano');
var svgmin = require('gulp-svgmin');
var browserSync = require('browser-sync');


var cleanDist = function (done) {

	if (!settings.clean) return done();

	del.sync([
		paths.output
	]);

	return done();

};

var jsTasks = lazypipe()
	.pipe(header, banner.main, {package: package})
	.pipe(optimizejs)
	.pipe(dest, paths.scripts.output)
	.pipe(rename, {suffix: '.min'})
	.pipe(uglify)
	.pipe(optimizejs)
	.pipe(header, banner.main, {package: package})
	.pipe(dest, paths.scripts.output);

var buildScripts = function (done) {

	if (!settings.scripts) return done();

	return src(paths.scripts.input)
		.pipe(flatmap(function(stream, file) {

			if (file.isDirectory()) {

				var suffix = '';

				if (settings.polyfills) {

					suffix = '.polyfills';

					src([file.path + '/*.js', '!' + file.path + '/*' + paths.scripts.polyfills])
						.pipe(concat(file.relative + '.js'))
						.pipe(jsTasks());

				}

				src(file.path + '/*.js')
					.pipe(concat(file.relative + suffix + '.js'))
					.pipe(jsTasks());

				return stream;

			}

			return stream.pipe(jsTasks());

		}));

};

var lintScripts = function (done) {

	if (!settings.scripts) return done();

	return src(paths.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

};

var buildStyles = function (done) {

	if (!settings.styles) return done();

	return src(paths.styles.input)
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}))
		.pipe(postcss([
			prefix({
				cascade: true,
				remove: true
			})
		]))
		.pipe(header(banner.main, {package: package}))
		.pipe(dest(paths.styles.output))
		.pipe(rename({suffix: '.min'}))
		.pipe(postcss([
			minify({
				discardComments: {
					removeAll: true
				}
			})
		]))
		.pipe(dest(paths.styles.output));

};

var buildSVGs = function (done) {

	if (!settings.svgs) return done();

	return src(paths.svgs.input)
		.pipe(svgmin())
		.pipe(dest(paths.svgs.output));

};

var copyFiles = function (done) {

	if (!settings.copy) return done();

	return src(paths.copy.input)
		.pipe(dest(paths.copy.output));

};

var copyImages = function (done) {

	if (!settings.images) return done();

	return src(paths.images.input)
		.pipe(dest(paths.images.output))

}

var startServer = function (done) {

	if (!settings.reload) return done();

	browserSync.init({
		server: {
			baseDir: paths.reload
		}
	});

	done();

};

var reloadBrowser = function (done) {
	if (!settings.reload) return done();
	browserSync.reload();
	done();
};

var watchSource = function (done) {
	watch(paths.input, series(exports.dev, reloadBrowser));
	done();
};

exports.default = series(
	cleanDist,
	parallel(
		buildScripts,
		lintScripts,
		buildStyles,
		buildSVGs,
		copyImages,
		copyFiles
	)
);

exports.dev = series(
	parallel(
		buildScripts,
		lintScripts,
		buildStyles,
		buildSVGs,
		copyFiles
	)
)

exports.watch = series(
	exports.default,
	startServer,
	watchSource
);
