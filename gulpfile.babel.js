'use strict';
import gulp from 'gulp';

// HTML related plugins
import pug from 'gulp-pug';

// CSS related plugins
import importCss from 'gulp-import-css';

// JS related plugins

// Utility plugins
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import del from 'del';

// Browser related plugins
import bs from 'browser-sync';
const browserSync = bs.create();
const reload = browserSync.reload;



// Tasks
gulp.task('server:start', () => {
    browserSync.init({
        server: 'dist',
        notify: false
    });
});


gulp.task('templates:compile', function buildHTML(){
    return gulp.src('src/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError((err) => {
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


gulp.task('styles:compile', () => {
    return gulp.src('./src/*.css')
        .pipe(plumber({
            errorHandler: notify.onError((err) => {
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(importCss())
        .pipe(autoprefixer({ browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});


gulp.task('scripts:compile', () => {
    return browserify({
        entries: './src/app.js'
    })
        .transform(babelify, {presets: ['es2015']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});


gulp.task('cache:clear', () => {
    return cache.clearAll();
});


gulp.task('dist:delete', () => {
    return del.sync('dist');
});


gulp.task('watch', () => {
    gulp.watch('./src/components/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('./src/components/**/*.css', gulp.series('styles:compile'));
    gulp.watch('./src/components/**/*.js', gulp.series('scripts:compile', reload));
});

gulp.task( 'default', gulp.series(
    gulp.parallel('templates:compile', 'styles:compile', 'scripts:compile'),
    gulp.parallel('server:start', 'watch')
));