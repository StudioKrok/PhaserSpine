var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

var files = [
  'src/spine.js', 
  'src/pixiSpine.js', 
  'src/plugin.js'
  ];

gulp.task('build-min', function() {
  gulp.src(files)
    .pipe(concat('phaserSpine.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-dev', function() {
  gulp.src(files)
    .pipe(concat('phaserSpine.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build-min', 'build-dev'], function() {

  gulp.watch('src/**/*.js', ['build-min', 'build-dev']);

  gulp
    .src('./')
    .pipe(webserver({
      port:8080
    }));
});