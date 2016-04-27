'use strict';

const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const envify = require('envify');
const rename = require('gulp-rename');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');

gulp.task('bundle', () => {
  const files = glob.sync('./public/src/js/**/*.js');
  return browserify({
    entries: files,
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify.configure({
    presets: ['es2015', 'react']
  }))
  .pipe(gulpif(argv.env === 'development', browserify({
    transform: envify({
      NODE_ENV: 'development'
    })
  })))
  .pipe(gulpif(argv.env === 'production', browserify({
    transform: envify({
      NODE_ENV: 'production'
    })
  })))
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulpif(argv.env === 'production', uglify()))
  .pipe(gulpif(argv.env === 'production', rename({suffix: '.min'})))
  .pipe(gulp.dest('./public/dist/js/'));
});

gulp.task('sass', () => {
  return sass('sass/main.sass')
    .pipe(gulp.dest('public/dist/css/'));
});

gulp.task('watch', () => {
  gulp.watch('app/*.js', ['bundle']);
  gulp.watch('sass/**/*.sass', ['sass']);
});

gulp.task('build', ['bundle', 'sass']);
