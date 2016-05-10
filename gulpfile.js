var path = require('path');

var gulp = require('gulp');
var babel = require('gulp-babel');
var stylus = require('gulp-stylus');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
const imagemin = require('gulp-imagemin');
var gulpWB = require('gulp-watchify-browserify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var uglifyify = require('uglifyify');
var eslintify = require('eslintify');
var concat = require('gulp-concat');

gulp.task('default', function() {
  // place code for your default task here
  
});

gulp.task('babel', () => {
        return gulp.src(['app/**/*.js', '!app/bower_components/**/*.js', '!**/*.min.js'])
                .pipe(babel({
                        presets: ['es2015']
                }))
                .pipe(gulp.dest('dist/jsfiles'));
});

gulp.task('stylus', function () {
  return gulp.src(['app/**/*.styl', '!app/bower_components/**/*.styl'])
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
  gulp.src(['app/**/*.css', '!app/bower_components/**/*.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('dist_css', function () {
  return gulp.src(['dist/**/*.css', '!dist/css/bundle.css'])
    .pipe(concatCss('css/bundle.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-img', () => {
  return gulp.src('app/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

/** =====================================================================================
 * @see https://www.npmjs.com/package/gulp-watchify-browserify/
 * @see https://github.com/simbo/gulp-watchify-browserify/blob/master/demo/gulpfile.js
 * */

// "global" variable for watch mode
var watch = false;

/**
 * Browserify / Watchify task
 */
gulp.task('browserify', function(done) {

  var src = './dist/jsfiles',
      dest = './dist2';

  var options = {
    // watch mode
    watch: watch,
    // set cwd to manipulate relative output path
    cwd: src,
    browserify: {
      paths: [
        path.join(src, 'modules'),
        './node_modules'
      ],
      debug: true,
      transform: [
        eslintify,
        [uglifyify, {global: true}]
      ]
    }
  };

  gulpWB('**/*.js', options, streamHandler.bind(this), done);

  /**
   * stream handler to apply further gulp plugins
   * @param  {Object} stream  gulp file stream
   * @return {Object}         processed stream
   */
  function streamHandler(stream) {
    return stream
      .pipe(plumber())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.', {includeContent: true, sourceRoot: '.'}))
      .pipe(gulp.dest(dest));
  }

});

// task for enabling watch mode
gulp.task('enable-watchify', function(done) {
  watch = true;
  done();
});

// enable watch mode and start browserify
gulp.task('watchify', function(done) {
  runSequence('enable-watchify', 'browserify', done);
});

// set default task
//gulp.task('default', ['browserify']);
/** ===================================================================================== */

gulp.task('concatjs', function() {
  return gulp.src(
    [
      'dist2/services/Utils.js',
      'dist2/services/AddressBook.js',
      'dist2/services/AddressBookDemo.js',
      'dist2/controllers/AddressBookCtl.js',
      'dist2/app.js',
      'dist2/js/**/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/'));
});
