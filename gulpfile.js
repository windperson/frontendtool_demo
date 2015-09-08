var gulp = require('gulp');
var gutil = require("gulp-util");
var webpackStream = require('webpack-stream');
var named = require('vinyl-named');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var minimist = require('minimist');
var series = require('stream-series');
var runseq = require('run-sequence');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();

var debugUtil = require('./gulp-util');

var defaultOptions = {
    boolean: 'listFiles',
    default: { listFiles: false }
};
var options = minimist(process.argv.slice(2), defaultOptions);

/*
Configs
 */
var srcDir = 'src/';
var dest = 'dist/';
var assetDest = dest + 'assets/'

var webPackConfig = './webpack.config.js';

var srcJs = srcDir + 'app.js';

gulp.task('copy:index', function () {
    return gulp.src('./src/index.html').pipe(gulp.dest(dest));
});

gulp.task('index', ['webpack', 'copy:index'], function () {
    var target = gulp.src(dest + 'index.html');

    var injectLibStream = gulp.src(assetDest + 'lib.bundle.js', { read: false });
    var injectAppStream = gulp.src(assetDest + 'bundle.js', { read: false });

    var injectStream = series(injectLibStream, injectAppStream)
        .pipe(debugUtil.isShowFile(options.listFiles, 'to inject:'));

    return target.pipe(inject(injectStream, { relative: true }))
        .pipe(gulp.dest(dest));
});

gulp.task('webpack', function () {
    return gulp.src(srcJs)
        .pipe(named())
        .pipe(webpackStream(require(webPackConfig), null, function (err, stats) {
            if (err) {
                throw new gutil.PluginError("webpack", err, { showStack: true });
            }
            gutil.log("[webpack]", stats.toString());
            gutil.beep();
        }))
        .pipe(gulp.dest(assetDest));
});

gulp.task('build', ['index']);

gulp.task('build:clean', ['clean', 'index']);

//to manage what to clean
var removePattern = ['dist/assets/**/*', 'dist/index.html'];

gulp.task('clean', function (done) {
    gulp.src(removePattern)
        .pipe(debugUtil.isShowFile(options.listFiles, 'del:'))
        .pipe(vinylPaths(del))
        .on('end', function () {
            done();
            gutil.log("clean complete");
            gutil.beep();
        })
        .on('error', function (err) {
            done();
            throw new gutil.PluginError("del", err, { showStack: true });
        })
        .resume(); // NOTE: be sure to call this for stream to start working!
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: dest
        }
    });
});

gulp.task('default', ['build', 'browser-sync'], function () {
    gulp.watch("src/**/*", ['build']).on('change', browserSync.reload);
});