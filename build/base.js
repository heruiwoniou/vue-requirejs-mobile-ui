var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),

    postcss = require('gulp-postcss'),


    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    position = require('postcss-position'),
    clearfix = require('postcss-clearfix'),
    size = require('postcss-size'),
    bem = require('postcss-bem'),
    nested = require('postcss-nested'),

    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),

    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    express = require('express'),
    empty = require('gulp-empty'),

    processors = [
        position,
        bem,
        nested,
        clearfix,
        size,
        autoprefixer({
            browsers: [
                'last 2 versions',
                'ie >= 8',
                'ie_mob >= 10',
                'ff >= 20',
                'chrome >= 34',
                'safari >= 6',
                'opera >= 12.1',
                'ios >= 6',
                'android >= 4.4',
                'bb >= 10'
            ]
        })
        //cssnano
    ];

var server = new express();

function sass2css(...files) {
    files.forEach(
        o => gulp.src(path.join(__dirname, '../', o.filename))
        .pipe(process.env.NODE_ENV == 'development' ? sourcemaps.init() : empty())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(process.env.NODE_ENV === 'development' ? sourcemaps.write('.') : empty())
        .pipe(gulp.dest(o.dest))
    )
}

function script2concat(cName, dest, ...files) {
    gulp.src(files.map(o => path.join(__dirname, '../', o)))
        .pipe(process.env.NODE_ENV === 'development' ? sourcemaps.init() : empty())
        .pipe(concat(cName))
        .pipe(uglify({
            preserveComments: false
        }))
        .pipe(process.env.NODE_ENV === 'development' ? sourcemaps.write('.') : empty())
        .pipe(gulp.dest(dest))
}

function script2dist(...files) {
    files.forEach(
        o => gulp.src(path.join(__dirname, '../', o.filename))
        .pipe(process.env.NODE_ENV === 'development' ? sourcemaps.init() : empty())
        .pipe(uglify({
            preserveComments: false
        }))
        .pipe(o.rename ? rename(o.rename) : empty())
        .pipe(process.env.NODE_ENV === 'development' ? sourcemaps.write('.') : empty())
        .pipe(gulp.dest(path.join(__dirname, '../', o.dest)))
    );
}

module.exports = {
    style() {
        sass2css({ filename: 'src/style/common.scss', dest: 'dist/style' })
    },
    script() {
        script2dist({ filename: 'src/libs/requirejs/require.js', dest: 'dist/libs' }, { filename: 'src/shim.js', dest: 'dist/libs' })
        gulp.src([path.join(__dirname, '../', 'src/**/*.js'), '!' + path.join(__dirname, '../', 'src/libs/requirejs/require.js'), '!' + path.join(__dirname, '../', 'src/shim.js')])
            .pipe(gulp.dest(path.join(__dirname, '../', 'dist')))
    },
    server() {
        server.use(express.static(path.join(__dirname, '../dist')));
        server.listen(3000, () => console.log('listening on port 3000!'));
    },
    clean() {
        return gulp.src(path.join(__dirname, '../', 'dist'))
            .pipe(clean({ force: true }));
    },
    html() {
        return gulp.src(path.join(__dirname, '../', 'src/**/*.html'), ['libs/**/*.html'])
            .pipe(gulp.dest(path.join(__dirname, '../', 'dist')));
    },
    assets() {
        return gulp.src(path.join(__dirname, '../', 'src/assets/**/*.*'))
            .pipe(gulp.dest(path.join(__dirname, '../', 'dist/assets')));
    }
}