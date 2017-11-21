'use strict';
import gulp from 'gulp';

// HTML related plugins
import pug from 'gulp-pug';

// CSS related plugins
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

// JS related plugins
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

// SVG related plugins
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';



// Utility plugins
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import del from 'del';
import vinylPaths from 'vinyl-paths';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import cache from 'gulp-cache';

// Browser related plugins
import browserSync from 'browser-sync';
const server = browserSync.create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


// Tasks
// Start server
gulp.task('server:start', () => {
    return server.init({
        server: './dist/',
        notify: false
    });
});

function reload(done) {
    server.reload();
    done();
}


// Templates compile
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
        .pipe(server.stream());
});


// Styles compile
gulp.task('styles:compile', () => {
    return gulp.src('./src/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError((err) => {
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe(gulpif(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 1 version']}))
        .pipe(gulpif(isDevelopment, sourcemaps.write('')))
        .pipe(gulpif(!isDevelopment, cleanCSS()))
        .pipe(gulp.dest('./dist'))
        .pipe(server.stream());
});


// Scripts clear
gulp.task('scripts:clear', () => {
    return gulp.src('./dist/bundle.js')
        .pipe(vinylPaths(del));
});


// Scripts compile
gulp.task('scripts:compile', gulp.series('scripts:clear', () => {
    webpackConfig.devtool = isDevelopment ? 'cheap-module-inline-source-map' : '';
    if (!isDevelopment) webpackConfig.plugins.push(
        new UglifyJSPlugin()
    );
    return webpackStream(webpackConfig)
        .pipe(gulp.dest('./dist'))
}));


// SVG sprite
gulp.task('sprite:compile', () => {
    return gulp.src('./src/assets/sprite-icons/**/*.svg')
    .pipe(plumber({
        errorHandler: notify.onError((err) => {
            return {
                title: 'Sprites',
                message: err.message
            }
        })
    }))
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: '../sprite-icons.svg',
                render: {
                    scss: {
                        dest:'../../../base/_sprite.scss',
                        template: './src/base/_sprite-template.scss'
                    }
                }
            }
        }
    }))
    .pipe(gulp.dest('./src/assets/sprite'));
});


// Images copy
gulp.task('images:copy', () => {
    return gulp.src(['./src/assets/**/*', '!src/assets/sprite-icons', '!src/assets/sprite-icons/**'])
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/'))
});


// Clear cache
gulp.task('cache:clear', (cb) => {
    return cache.clearAll(cb);
});


gulp.task('watch', () => {
    gulp.watch(['./src/index.pug', './src/components/**/*.pug']).on('change', gulp.series('templates:compile'));
    gulp.watch(['./src/style.scss', './src/components/**/*.scss']).on('change', gulp.series('styles:compile'));
    gulp.watch(['./src/app.js', './src/components/**/*.js']).on('change', gulp.series('scripts:compile', reload));
});


gulp.task('default', gulp.series(
    'sprite:compile',
    gulp.parallel('images:copy', 'templates:compile', 'styles:compile', 'scripts:compile'),
    gulp.parallel('server:start', 'watch')
));

