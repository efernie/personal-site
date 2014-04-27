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
  return gulp.src('client/styles/main.scss')
    .pipe(rename({suffix: '.min'}))
    .pipe(sass({
      includePaths: [
        'client/styles',
        'client/styles/libs',
        'client/img',
        'client/styles/fonts'
      ],
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('client/build/css'))
});

gulp.task('size-prod-sass', ['prod-sass'], function () {
  return gulp.src('client/build/css/main.min.css')
    .pipe(size({
      gzip: false,
      showFiles: true
    }))
    .pipe(size({
      gzip: true,
      showFiles: true
    }))
});

gulp.task('prod-clean-scripts', function () {
  return gulp.src('client/build/js/*')
   .pipe(clean());
});

gulp.task('prod-clean-styles', function () {
  return gulp.src('client/build/css/main.min.css')
   .pipe(clean());
});

gulp.task('size-prod-script', ['prod-build','min'], function () {
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

gulp.task('prod-build', ['prod-clean-scripts'] , function () {
  return gulp.src('client/js/app.js', { read: false })
    .pipe(exec(browserifyTaskProd))
    ;
    // .pipe(gulp.src('client/build/js/app.js'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(uglify())
    // .pipe(gulp.dest('client/build/js'));
});

gulp.task('min', function () {
  return gulp.src('client/build/js/app.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('client/build/js'));
});

gulp.task('build', ['size-prod-script', 'size-prod-sass'], function () {
  return notify({ message: 'Build task complete'});
});

gulp.task('buildbrowser', ['size-prod-script'], function () {
  notify({ message: 'Build task complete'});
});
