'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const server = require('browser-sync').create();

module.exports = options => {
    return (done) => {
        return gulp.src(options.src)
            .pipe($.importCss())
            .pipe(gulp.dest(options.dest))
            .pipe(server.stream());
            done();
    }
};
