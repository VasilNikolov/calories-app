'use strict';

const CONFIG = require("./gulpconfig.json");

const gulp = require('gulp-help')(require('gulp'));
const ifElse = require('gulp-if-else');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const watch = require('gulp-watch');

const browserSync = require('browser-sync').create();

//const runSequence = require('run-sequence');

//Stylesheet dependencies
const sass = require('gulp-sass');
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//Javascript dependencies
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const es2015 = require('babel-preset-es2015');

/**
 * Handle stylesheets
 * @param mode
 * @returns {*}
 */
function handleStylesheets(mode) {
    const scssOptions = (mode === 'dev') ? CONFIG.stylesheet.options.dev : CONFIG.stylesheet.options.prod;

    //Register postCSS processors
    const processors = [
        autoprefixer({
            'browsers': ['last 5 versions'],
            'cascade': false
        })
    ];
    gutil.log('Building styles...');

    return gulp.src(CONFIG.stylesheet.src)
    //TODO: Remove ruby dependency by switching to sass-lint (does not fulfill requirements yet
        .pipe(ifElse(mode === 'dev', sourcemaps.init))
        .pipe(sass(scssOptions))
        .on('error', function (err) {
            gutil.log(gutil.colors.bgRed(err.messageFormatted ? err.messageFormatted : err.message));
            this.emit('end');
        })
        .pipe(postCSS(processors))
        .pipe(ifElse(mode === "dev", sourcemaps.write))
        .pipe(gulp.dest(CONFIG.stylesheet.dest))
        .pipe(browserSync.stream());
}

/*
 * Style tasks
 */
gulp.task('styles:dev', 'Compiles stylesheets for development', function () {
    return handleStylesheets('dev');
});

gulp.task('styles:prod', 'Compiles stylesheets for production', function () {
    return handleStylesheets('prod');
});

gulp.task('styles:watch', 'Watches and compiles stylesheets on changes for development', ['styles:dev'], function () {
    return watch(CONFIG.stylesheet.src, handleStylesheets);
});


/**
 * Javascript Processing
 */

// function bundleScripts(mode) {
//     console.log('Bundling src...');

//     return gulp.src(CONFIG.javascript.files)
//         .pipe(concat({
//             path: CONFIG.javascript.title
//         }))
//         .pipe(gulp.dest(CONFIG.javascript.source));
// }

function compileScripts(mode) {
    // bundleScripts(mode);

    gutil.log('Compiling src...')
    
    return browserify({entries: CONFIG.javascript.source + 'app.js', debug: true})
        .transform(babelify, {presets: [es2015]})
        .bundle()
        .pipe(source(CONFIG.javascript.title))
        .pipe(buffer())
        .pipe(ifElse(mode === 'dev', sourcemaps.init))
        .pipe(ifElse(mode === 'prod', uglify))
        .pipe(ifElse(mode === 'dev', sourcemaps.write))
        .pipe(gulp.dest(CONFIG.javascript.dest));
}

gulp.task('js:dev', 'Builds Javascript files for development', function () {
    return compileScripts('dev');
});

gulp.task('js:prod', 'Builds Javascript files for production', function () {
    return compileScripts('prod');
});

gulp.task('js:watch', 'Watches and builds Javascript files for development', ['js:dev'], function () {
    return watch(CONFIG.javascript.files, compileScripts);
});

gulp.task('build:serve', 'Watches styles and javascript', ['js:watch', 'styles:watch']);
gulp.task('build:dev', 'Builds styles and jacascript for dev', ['js:dev', 'styles:dev']);
gulp.task('build:prod', 'Builds styles and jacascript for prod', ['js:prod', 'styles:prod']);
