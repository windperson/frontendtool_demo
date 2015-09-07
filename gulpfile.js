var gulp = require('gulp');
var gutil = require("gulp-util");
var webpackStream = require('webpack-stream');
var named = require('vinyl-named');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var debug = require('gulp-debug');
var minimist = require('minimist');
var gulpif = require('gulp-if');

var srcDir = 'src/';
var dest = 'dist/';
var assetDest = dest + 'assets/'

var webPackConfig = './webpack.config.js';

var srcJs = srcDir + 'app.js';

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

var defaultOptions = {
    boolean: 'fileInfo',
    default: { fileInfo: false }
};
var options = minimist(process.argv.slice(2), defaultOptions);

function isShowFile(isShowFile, promptMsg) {
    return gulpif(isShowFile, debug({ title: promptMsg }))
}


//to manage what to clean
var removePattern = ['dist/assets/**/*'];

gulp.task('clean', function (done) {
    gulp.src(removePattern)
        .pipe(isShowFile(options.fileInfo, 'del:'))
        .pipe(vinylPaths(del))
        .on('end', function(){
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

