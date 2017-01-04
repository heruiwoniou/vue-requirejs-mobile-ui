var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),

    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),

    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),

    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    server = require('gulp-ss-server'),
    empty = require('./gulp-empty.js'),

    processors = [
        autoprefixer({
            browsers: [
                'last 3 versions',
                'ie >= 8',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 6',
                'opera >= 12.1',
                'ios >= 6',
                'android >= 4.4',
                'bb >= 10'
            ]
        }),
        cssnano
    ];

function sass2css(...files) {
    files.forEach(
        o => gulp.src(path.join(__dirname, '../', o.filename))
        .pipe(process.env.NODE_ENV === 'development' ? sourcemaps.init() : empty())
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
        .pipe(uglify())
        .pipe(process.env.NODE_ENV === 'development' ? sourcemaps.write('.') : empty())
        .pipe(gulp.dest(dest))
}

function script2dist(...files) {
    files.forEach(
        o => gulp.src(path.join(__dirname, '../', o.filename))
        .pipe(process.env.NODE_ENV === 'development' ? sourcemaps.init() : empty())
        .pipe(uglify())
        .pipe(process.env.NODE_ENV === 'development' ? sourcemaps.write('.') : empty())
        .pipe(gulp.dest(path.join(__dirname, '../', o.dest)))
    );
}

module.exports = {
    style() {
        sass2css({ filename: 'src/style/common.scss', dest: 'dist/style' })
    },
    script() {
        script2dist({ filename: 'src/libs/requirejs/require.js', dest: 'dist/libs' })
        gulp.src([path.join(__dirname, '../', 'src/**/*.js'), '!' + path.join(__dirname, '../', 'src/libs/requirejs/require.js')])
            .pipe(gulp.dest(path.join(__dirname, '../', 'dist')))
    },
    server() {
        server.run({
            port: 3000,
            runtime: 'dist'
        });
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