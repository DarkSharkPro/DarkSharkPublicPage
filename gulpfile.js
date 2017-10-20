const gulp = require('gulp'),
    pug = require('gulp-pug'),
    importcss = require('gulp-import-css'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

gulp.task('pug:compile', function buildHTML() {
    return gulp.src('src/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'Templates',
                    message: err.message
                }
            })
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('css:copy', function() {
    return gulp.src('./src/style.css')
        .pipe(plumber())
        .pipe(importcss())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('js:copy', function() {
    return gulp.src('./src/script.js')
        .pipe(plumber())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('fonts:copy', function() {
    return gulp.src('./src/fonts/**/')
        .pipe(plumber())
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('server:start', function() {
    browserSync.init({
        server: 'dist',
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.watch('./src/components/**/*.pug', ['pug:compile']);
    gulp.watch('./src/components/**/*.css', ['css:copy']);
    gulp.watch('./src/components/**/*.js', ['js:copy']);
    gulp.watch('./src/fonts/**/*', ['fonts:copy']);
});

gulp.task( 'default', ['pug:compile', 'css:copy', 'js:copy', 'fonts:copy', 'server:start', 'watch']);