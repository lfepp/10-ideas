'use strict';

import gulp from 'gulp';
import sass from 'gulp-ruby-sass';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import envify from 'envify';
import rename from 'gulp-rename';
import {argv} from 'yargs';
import gulpif from 'gulp-if';

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
