var path = require('path'),
    gulp = require('gulp'),
    methods = require('./build/base');

gulp.task('style', methods.style);
gulp.task('script', methods.script);
gulp.task('clean', methods.clean);
gulp.task('html', methods.html);
gulp.task('resource', methods.resource);

gulp.task('default', ['clean'],
    function() {
        process.env.NODE_ENV = 'development'
        gulp.run('style', 'script', 'resource', 'html');
        gulp.watch([path.join(__dirname, 'src/**/*.scss'), path.join(__dirname, 'src/**/*.sass')], o => gulp.run('style'));
        gulp.watch(path.join(__dirname, 'src/**/*.js'), o => gulp.run('script'));
        gulp.watch(path.join(__dirname, 'src/**/*.html'), o => gulp.run('html'));
        methods.server();
    })

gulp.task('pack', ['clean'], function() {
    process.env.NODE_ENV = 'product'
    gulp.run('style', 'script', 'resource', 'html');
})