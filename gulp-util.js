
var gulpif = require('gulp-if');
var debug = require('gulp-debug');
var runseq = require('run-sequence');
var browserSync = require('browser-sync').create();

module.exports = {

    isShowFile: function (showFlag, promptMsg) {
        return gulpif(showFlag, debug({ title: promptMsg }))
    },

    initLiveReload: function (task_name, watch_path, gulp_instance) {
        if (gulp_instance == null || typeof (gulp_instance) === 'undefined') {
            gulp_instance = require('gulp');
        }
        return gulp_instance.task(task_name, function () {
            browserSync.init({
                server: {
                    baseDir: watch_path,
                    livereload: true
                }
            });
        });
    },

    registLiveReload: function (reload_task_name, prerequiste_tasks, gulp_instance) {
        if (gulp_instance == null || typeof (gulp_instance) === 'undefined') {
            gulp_instance = require('gulp');
        }
        gulp_instance.task(reload_task_name, function (done) {
            runseq(prerequiste_tasks, function () {
                browserSync.reload();
                done();
            })
        });
    }

};
