var clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    exec = require('gulp-exec'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    lr = require('tiny-lr'),
    notify = require('gulp-notify'),
    open = require('gulp-open'),
    refresh = require('gulp-livereload'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    server = lr(),
    size = require('gulp-size'),
    uglify = require('gulp-uglify');

var browserifyTaskDev = 'browserify client/js/app.js > client/build/js/app.js --debug';
var browserifyTaskProd = 'browserify client/js/app.js > client/build/js/app.js -t stripify';

// Development ///////////////////////////////////////////////////////////
gulp.task('scripts', function() {
  return gulp.src('client/js/app.js', { read: false })
    // .pipe(exec('mkdir client/build/dev/js'))
    .pipe(exec(browserifyTaskDev))
    .pipe(refresh(server))
});

gulp.task('size-dev-script', ['scripts'], function () {
  return gulp.src('client/build/js/app.js')
    .pipe(size({
      gzip: false,
      showFiles: true
    }))
    .pipe(size({
      gzip: true,
      showFiles: true
    }))
});

gulp.task('jshintscripts', function () {
  return gulp.src('client/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('enforcejsstyleclient', function () {
  return gulp.src('client/js/**/*.js')
    .pipe(jscs());
});

gulp.task('enforcejsstyleserver', function () {
  return gulp.src('server/**/*.js')
    .pipe(jscs());
});

gulp.task('sass', function () {
  return gulp.src('client/styles/main.scss')
    .pipe(sass({ includePaths: [
      'client/styles',
      'client/styles/libs',
      'client/styles/fonts'
      ],
      errLogToConsole: true
    }))
    .pipe(gulp.dest('client/build/css'))
    .pipe(refresh(server))
});

gulp.task('size-dev-sass', ['sass'], function () {
  return gulp.src('client/build/css/main.css')
    .pipe(size({
      gzip: false,
      showFiles: true
    }))
    .pipe(size({
      gzip: true,
      showFiles: true
    }))
});

gulp.task('lr-server', function() {
  return server.listen(35729, function ( err ) {
    if(err) return console.log(err);
  });
});

gulp.task('reload-jade', function () {
  return gulp.src('client/views')
    .pipe(refresh(server));
});

gulp.task('open', function () {
  var options = {
    url: 'http://localhost:3000',
    app: 'google-chrome' // doesn't want to work in chrome
  };
  return gulp.src('.')
  .pipe(open('', options));
});

gulp.task('test', function () {
  return gulp.src('test.js', { read: false })
    .pipe(cover.instrument({
        pattern: ['server/**','client/**'],
        debugDirectory: 'debug'
    }))
    .pipe(mocha({
      reporter: 'spec',
      ignoreLeaks: false,
      timeout: 3000
    }))
    .pipe(cover.report({
      outFile: 'coverage.html'
    }))
    .on('error', gutil.log);
});

gulp.task('default', ['scripts','sass','open'], function () {

  server.listen(35729, function ( err ) {
    if ( err ) return console.log(err);
    gulp.watch('client/js/**', ['size-dev-script']);
    gulp.watch('client/styles/**', ['size-dev-sass']);
    gulp.watch('client/views/**', ['reload-jade']);
  });

});

// Production ///////////////////////////////////////////////////////////
gulp.task('prod-sass', ['prod-clean-styles'], function () {
  return gulp.src('client/styles/sass/main.scss')
    .pipe(sass({
      includePaths: [
        'client/styles/sass',
        'client/styles/sass/libs',
        'client/img',
        'client/styles/fonts'
      ],
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('client/build/dist/styles/css'))
});

gulp.task('size-prod-sass', ['prod-sass'], function () {
  return gulp.src('client/build/dist/styles/css/main.css')
    .pipe(size({
      gzip: false,
      showFiles: true
    }))
    .pipe(size({
      gzip: true,
      showFiles: true
    }))
});

// doesn't really work
gulp.task('templates', ['prod-clean-views'], function () {
  return gulp.src('client/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('client/build/views'))
});

gulp.task('prod-clean-scripts', function ( cb ) {
  return gulp.src('client/build/dist/js')
   .pipe(clean());
});

gulp.task('prod-clean-styles', function ( cb ) {
  return gulp.src('client/build/dist/styles')
   .pipe(clean());
});

gulp.task('prod-clean-views', function ( cb ) {
  return gulp.src('client/build/views')
   .pipe(clean());
});

gulp.task('test-build', function () {
  return gulp.src('test.js', { read: false })
    .pipe(cover.instrument({
        pattern: ['server/**','client/**'],
        debugDirectory: 'debug'
    }))
    .pipe(mocha({
      reporter: 'Nyan',
      ignoreLeaks: false,
      timeout: 3000
    }))
    .pipe(cover.report({
      outFile: 'coverage-prod.html'
    }))
    .on('error', gutil.log);
});

gulp.task('size-prod-script', ['prod-build'], function () {
  return gulp.src('client/build/js/app.min.js')
    .pipe(size({
      gzip: false,
      showFiles: true
    }))
    .pipe(size({
      gzip: true,
      showFiles: true
    }));
});

gulp.task('prod-build', ['test-build','prod-clean-scripts'] , function () {
  return gulp.src('client/js/src/app.js', { read: false })
    // .pipe(exec('mkdir client/build/js'))
    .pipe(exec(browserifyTaskProd))
    .pipe(gulp.src('client/build/js/app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('client/build/dist/js'));
});

gulp.task('build', ['size-prod-script', 'size-prod-sass'], function () {
  notify({ message: 'Build task complete'});
});

gulp.task('buildbrowser', ['size-prod-script'], function () {
  notify({ message: 'Build task complete'});
});
