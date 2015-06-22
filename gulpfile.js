var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack-build');
var path = require('path');
var del = require('del');
var webpackConfigPath = './webpack.config.js';

gulp.task('default', ['clean', 'nodemon:app']);

gulp.task('clean', function (cb) {
    del(['build'], cb);
});

gulp.task('nodemon:app', function () {
    nodemon({
      exec: 'babel-node ./src/server/server.js',
      ignore: ['build/**'],
      ext: 'js'
    });
});
