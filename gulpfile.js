'use strict';

const gulp = require('gulp');

const lazyRequireTask = (taskName, path, options) => {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, cb => {
        const task = require(path).call(null, options);
        return task(cb);
    });
};

lazyRequireTask('compile:template', './gulp_tasks/compile-template.js', {
    src: './src/index.pug',
    pretty: true,
    dest: './dist/'
});

lazyRequireTask('compile:styles', './gulp_tasks/compile-styles.js', {
    src: './src/style.css',
    dest: './dist/'
});

lazyRequireTask('compile:scripts', './gulp_tasks/compile-scripts.js');

lazyRequireTask('start:server', './gulp_tasks/start-server.js', {
    src: './dist',
    notify: false
});

gulp.task('watch', () => {
    gulp.watch('./src/components/**/*.pug', gulp.series('compile:template'));
    gulp.watch('./src/components/**/*.css', gulp.series('compile:styles'));
});

gulp.task('default', gulp.series(gulp.parallel('compile:template', 'compile:styles'), gulp.parallel('watch', 'start:server')));