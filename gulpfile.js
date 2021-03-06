var gulp = require( 'gulp' );
var browserSync = require( 'browser-sync' );
var plumb = require( 'gulp-plumber' );
var jshint = require( 'gulp-jshint' );
var annotate = require( 'gulp-ng-annotate' );
var add = require( 'gulp-add-src' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var chmod = require( 'gulp-chmod' ); 
var sass = require( 'gulp-sass' );
var filter = require( 'gulp-filter' );
var rename = require( 'gulp-rename' );


/* -------------------------------------------------------------------------- *
 * CONFIG
 * -------------------------------------------------------------------------- */
var config = {
	sass: {
		watch: 'sass/**/*.scss',
		src: 'sass/main.scss',
		dest: 'css',
		name: 'tritonfeedback.css'
	},
	js: {
		watch: 'src/**/*.js',
		deps: [
			'lib/*.js'
		],
		src: [
			'src/app.js',
			'src/*/*.js',
			'src/boot.js'
		],
		dest: 'js',
		name: 'tritonfeedback.min.js'
	},
};  


/* -------------------------------------------------------------------------- *
 * BROWSERSYNC SERVER
 * -------------------------------------------------------------------------- */
gulp.task( 'sync', function() {
	browserSync({
		proxy: 'tritonday.loc/'
	});
});


/* -------------------------------------------------------------------------- *
 * JS
 *
 * We are trying to keep Browserify out of this. It's just a pain in the butt
 * with Angular. So instead we just concatenate in order: dependencies,
 * non-Angular modules, the Angular app definition, and then Angular modules.
 * -------------------------------------------------------------------------- */
gulp.task( 'js', function(){

	gulp.src( config.js.src )
		.pipe( plumb() )
		.pipe( jshint() )
		.pipe( jshint.reporter('default') )
		.pipe( annotate() )
		.pipe( add.prepend( config.js.deps ) )
		.pipe( concat( config.js.name ) )
		.pipe( uglify() )
		.pipe( chmod( 755 ) )
		.pipe( gulp.dest( config.js.dest ) );
		browserSync.reload();
}); 


/* -------------------------------------------------------------------------- *
 * SASS
 * -------------------------------------------------------------------------- */
gulp.task( 'sass', function(){
  return gulp.src( config.sass.src )
    .pipe( sass({ outputStyle: 'compressed', errLogToConsole: true }) )
    .pipe( rename( config.sass.name ) )
    .pipe( gulp.dest( config.sass.dest ) )
		.pipe( filter( '**/*.css' ) )
    .pipe( browserSync.reload({ stream:true }) );
});


/* -------------------------------------------------------------------------- *
 * WATCH
 * -------------------------------------------------------------------------- */
gulp.task( 'watch', function(){
	gulp.watch( config.sass.watch, ['sass'] );
	gulp.watch( config.js.watch, ['js'] );
});


/* -------------------------------------------------------------------------- *
 * GO GO GADGET GULP
 * -------------------------------------------------------------------------- */
gulp.task( 'default', ['sync', 'watch'] );

