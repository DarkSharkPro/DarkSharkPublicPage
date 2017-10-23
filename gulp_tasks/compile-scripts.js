'use strict';

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const webpackConfig = require('../webpack.config');

module.exports = options => {
    return () => {
        return webpackStream(webpackConfig, webpack)
            .pipe(gulp.dest("dist"))
    }
};
