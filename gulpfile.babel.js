'use strict';
import gulp from 'gulp';

// HTML related plugins
import pug from 'gulp-pug';

// CSS related plugins
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'cssnano';

// JS related plugins
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

// SVG related plugins
import svgSprite from 'gulp-svg-sprites';
import cheerio from 'cheerio';
import through2 from 'through2';
import gutil from 'gulp-util';

// Utility plugins
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import del from 'del';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import cache from 'gulp-cache';
import rename from 'gulp-rename';

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
        .pipe(gulpif(!isDevelopment, cssnano()))
        .pipe(gulp.dest('./dist'))
        .pipe(server.stream());
});


// Scripts compile
gulp.task('scripts:compile', () => {
    webpackConfig.devtool = isDevelopment ? 'cheap-module-inline-source-map' : '';
    if (!isDevelopment) webpackConfig.plugins.push(
        new UglifyJSPlugin()
    );
    return webpackStream(webpackConfig)
        .pipe(gulp.dest('./dist'))
});


// SVG sprite
// gulp.task('sprite:compile', () => {
//     return gulp.src('./src/components/**/*.svg')
//         .pipe(plumber({
//             errorHandler: notify.onError((err) => {
//                 return {
//                     title: 'Sprites',
//                     message: err.message
//                 }
//             })
//         }))
//         .pipe(svgSprite({
//             mode: "symbols",
//             preview: false,
//             svgId: "%f",
//             svg: {
//                 symbols: "./sprite.svg"
//             }
//         }))
//         .pipe(through2.obj(function (file, encoding, cb) {
//             const $ = cheerio.load(file.contents.toString(), {xmlMode: true});
//             const data = $('svg > symbol').map(function () {
//                 return {
//                     id: $(this).attr('id'),
//                     viewBox: $(this).attr('viewBox')
//                 };
//             }).get();
//             const jsonFile = new gutil.File({
//                 path: 'metadata.json',
//                 contents: new Buffer(JSON.stringify(data))
//             });
//             this.push(jsonFile);
//             this.push(file);
//             cb();
//         }))
//         .pipe(gulp.dest('dist/assets/'));
// });


// Images copy
gulp.task('images:copy', () => {
    return gulp.src('./src/components/**/*.{png, jpg, svg}', {base: 'src'})
        .pipe(plumber())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('dist/assets/'))
});


// Clear cache
gulp.task('cache:clear', (cb) => {
    return cache.clearAll(cb);
});


gulp.task('watch', () => {
    gulp.watch('./src/components/**/*.pug').on('change', gulp.series('templates:compile'));
    gulp.watch('./src/components/**/*.scss').on('change', gulp.series('styles:compile'));
    gulp.watch('./src/components/**/*.js').on('change', gulp.series('scripts:compile', reload));
});


gulp.task('default', gulp.series(
    gulp.parallel('images:copy', 'templates:compile', 'styles:compile', 'scripts:compile'),
    gulp.parallel('server:start', 'watch')
));


gulp.task('dist:delete', () => {
    return del.sync('dist');
});

