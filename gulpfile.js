var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');
var usemin      = require('gulp-usemin');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var clean       = require('gulp-clean');
var browserify  = require('browserify');
var sourcemaps  = require('gulp-sourcemaps');
var minifyHtml  = require('gulp-minify-html');
var karma       = require('gulp-karma');
var babelify    = require('babelify');
var ngAnnotate  = require('gulp-ng-annotate');
var stringify   = require('stringify');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var reload      = browserSync.reload;
var concatCss   = require('gulp-concat-css');
var minifyCSS   = require('gulp-minify-css');
var es          = require('event-stream');
var size        = require('gulp-size');
var envify      = require('envify/custom');

var port = 8000;
var environment = process.env.ENVIRONMENT || 'LOCAL';

var paths = {
    appScripts: ['app/**/*.js', '!app/**/*.spec.js'],
    appCss: "app/**/*.css",
    appFonts: 'app/fonts/**'
};

gulp.task("default", ['build', 'serve']);

gulp.task("build", function(callback) {
    runSequence("clean", ["js", "vendorjs" , "css", 'vendorcss', "copy"], callback);
});

gulp.task('lint', function () {
    return gulp.src(paths.appScripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('vendorjs', function () {
    return gulp.src('./app/*.html')
        .pipe(usemin({
            html: [gulpif(environment == 'PROD', minifyHtml())],
            vendorjs: [gulpif(environment == 'PROD', uglify())]
        }))
        .pipe(size())
        .pipe(gulp.dest('dist'));
});

gulp.task("js", ['lint'], function() {
    return browserify('./app/init.js')
        .transform(babelify)
        .transform(stringify(['.html']))
        .transform(envify({ENVIRONMENT: environment}))
        .bundle()
        .pipe(source('init.js'))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(gulpif(environment == 'PROD', uglify()))
        .pipe(size())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task("css", function() {
    return gulp.src(paths.appCss)
        .pipe(concatCss("app.css"))
        .pipe(gulpif(environment == 'PROD', minifyCSS({keepSpecialComments: 0})))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('vendorcss', function () {
    return gulp.src('./app/*.html')
        .pipe(usemin({
            vendorcss: [gulpif(environment == 'PROD', minifyCSS({keepSpecialComments: 0})), 'concat']
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task("copy", function() {
    return es.merge(
        gulp.src("app/**/*.html").pipe(gulp.dest("dist")),
        gulp.src("app/assets/**").pipe(gulp.dest("dist/assets")),
        gulp.src(paths.appFonts).pipe(gulp.dest("dist/fonts"))
    );
});

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task("build:mobile", ["clean:mobile", "build"], function() {
    return gulp.src('dist/**').pipe(gulp.dest('mobile/www'));
});

gulp.task('clean:mobile', function () {
    return gulp.src('mobile/www')
        .pipe(clean());
});

gulp.task('test', function() {
    return gulp.src('./tests')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        })).on('error', function(err) {
            this.emit('end'); //instead of erroring the stream, end it
        });
});

gulp.task('serve', ['build'], function() {
    return browserSync({
        notify: false,
        server: {
            baseDir: ['dist']
        },
        port: port
    });
});

gulp.task('watch', ['serve'], function() {
    gulp.watch([
        paths.appCss,
        paths.appScripts,
        "app/**/*.html",
        "app/assets/**"
    ], ["build", reload]);
});