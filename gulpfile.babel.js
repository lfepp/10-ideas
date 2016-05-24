'use strict';

import gulp from 'gulp';
import sass from 'gulp-ruby-sass';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import glob from 'glob';
import streamify from 'gulp-streamify';

gulp.task('bundle', () => {
  const files = glob.sync('./public/src/**/*.js');
  return browserify({
    entries: files,
    extensions: ['.jsx'],
    debug: true
  })
  // babel-plugin-react-trasnform # message for air
  .transform(babelify.configure({
    presets: ['es2015', 'react']
  }))
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('./public/dist/js/'))
  .pipe(rename({suffix: '.min'}))
  .pipe(streamify(uglify()))
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
