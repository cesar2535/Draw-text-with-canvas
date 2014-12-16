var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var compass = require('gulp-compass');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

// This will keeps pipes working after error event
var plumber = require('gulp-plumber');

// linting
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');

// Used in linting custom reporter
var map = require('map-stream');
var events = require('events');
var notify = require('gulp-notify');
var emmitter = new events.EventEmitter();
var path = require('path');

var srcFiles = {
  main: 'src/index.jade',
  view: 'src/views/**/*.jade',
  sass: 'src/sass/**/*.sass',
  js: 'src/js/**/*.js',
  assets: 'src/assets/**'
};

var buildDir = {
  main: './build',
  view: './build/views',
  style: './build/stylesheets',
  js: './build/js'
};

// Custom linting reporter used for error notify
var jsHintErrorReporter = map(function (file, callback) {
  if (!file.jshint.success) {
    file.jshint.results.forEach(function (err) {
      if (err) {
        // Error message
        var msg = [
          path.basename(file.path),
          'Line: ' + err.error.line,
          'Reason: ' + err.error.reason
        ];

        // Emit this error event
        emmitter.emit('error', new Error(msg.join('\n')));
      }
    });
  }
  callback(null, file);
});

var errorHandler = function (error) {
  notify.onError({
    title: 'Gulp',
    message: "Error: <%= error.message %>",
    sound: 'Pop'
  }) (error);
};

gulp.task('clear', function() {
  del.sync(['./build/**/*.html', './build/stylesheets/**', './build/js/**']);
});

gulp.task('lint', function() {
  return gulp.src(srcFiles.js)
    // .pipe(watch(srcFiles.js))
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish)) // Console output
    // .pipe(jsHintErrorReporter)  // If error pop up a notify alert
    .on('error', notify.onError(function (error) {
      browserSync.notify(error.message, 5000);
      return error.message;
    }))
    .pipe(gulp.dest(buildDir.js + '/app'));
});

// CSS
gulp.task('compass', function() {
  var stream = gulp.src(srcFiles.sass)
    // .pipe(watch(srcFiles.sass))
    .pipe(compass({
      css: 'build/stylesheets',
      sass: 'src/sass',
      require: ['susy']
    }))
    .on('error', function (error) {
      gutil.log(gutil.colors.yellow(error.message));
      browserSync.notify(error.message, 5000);
      stream.end();
    })
    .pipe(gulp.dest(buildDir.style))
    .pipe(reload({stream: true}));
  return stream;
});

gulp.task('jade-view', function() {
  return gulp.src(srcFiles.view)
    // .pipe(watch(srcFiles.view))
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .on('error', notify.onError(function (error) {
      gutil.log(gutil.colors.yellow(error.message));
      browserSync.notify(error.message, 5000);
      return error.message;
    }))
    .pipe(gulp.dest(buildDir.view));
});

gulp.task('jade-main', ['jade-view'], function() {
  return gulp.src(srcFiles.main)
    // .pipe(watch(srcFiles.main))
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .on('error', notify.onError(function (error) {
      gutil.log(gutil.colors.yellow(error.message));
      browserSync.notify(error.message, 5000);
      return error.message;
    }))
    .pipe(gulp.dest(buildDir.main));
});

gulp.task('lib', function() {
  return gulp.src(srcFiles.assets, {base: 'src/assets'})
    // .pipe(watch(srcFiles.assets))
    .pipe(gulp.dest(buildDir.main));
});

gulp.task('watch', function() {
  gulp.watch(srcFiles.js, ['lint']);
  gulp.watch(srcFiles.sass, ['compass']);
  gulp.watch([srcFiles.main, srcFiles.view], ['jade-main']);
  gulp.watch(srcFiles.assets, ['lib']);
});

gulp.task('browser-sync', ['watch', 'build'], function() {
  browserSync({
    server: {
      baseDir: './build'
    },
    port: 8080
  });
});

var watchFolder = ['build/**/*.html', 'build/js/**/*.js', 'build/stylesheets/**/*.css'];
gulp.task('livereload', ['watch', 'browser-sync'], function() {
  gulp.watch(watchFolder, function (file) {
    if (file.type === 'changed') {
      return reload(file.path);
    }
  });
});

gulp.task('compile', ['clear', 'lib', 'lint', 'compass', 'jade-main']);
gulp.task('build', ['compile']);
gulp.task('default', ['build', 'livereload']);