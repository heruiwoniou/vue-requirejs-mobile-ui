'use strict';
var gutil = require('gulp-util');
var through = require('through2');
module.exports = function(options) {
    return through.obj(function(file, enc, cb) {
        this.push(file);
        return cb();
    })
}