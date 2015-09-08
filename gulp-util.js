
var gulpif = require('gulp-if');
var debug = require('gulp-debug');

module.exports ={

isShowFile : function (isShowFile, promptMsg) {
    return gulpif(isShowFile, debug({ title: promptMsg }))
}
    
};
