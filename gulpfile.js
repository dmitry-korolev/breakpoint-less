(function () {

    'use strict';

    var gulp            = require('gulp'),
        autoprefixer    = require('gulp-autoprefixer'),
        less            = require('gulp-less'),
        notify          = require('gulp-notify'),
        postcss         = require('gulp-postcss'),
        mqpacker        = require('css-mqpacker');


    /**************\
    | COMPILE TASK |
    \**************/

    gulp.task('default', function () {
        return gulp.src('./tests/test.less')
            .pipe(
                less({
                    paths: [ 'tests', 'lib' ]
                })
                    .on('error', function (err) {
                        this.emit('end');
                    })
            )
            .on('error', notify.onError(function (error) {
                return 'Failed to Compile LESS: ' + error.message;
            }))
            // Uncomment this to combine media queries
            // .pipe(postcss([
            //     mqpacker
            // ]))
            .pipe(autoprefixer({
                browsers: ['last 3 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('./tests/'))
            .pipe(notify("LESS Compiled Successfully :)"));
    });

}());
