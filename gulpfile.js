var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require( 'gulp-plumber'),
    size = require('gulp-size'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    packageJson = require('./package.json'),
    del = require('del');
var exec = require('child_process').exec;
var version  = packageJson.version;

var path = {};
path.root="./";

path.css   = path.root + 'css/**/*.css';
path.cssDir= path.root + 'css/';
path.dist  = path.root + 'dist/';
path.html  = path.root + 'html/**/*.html';
path.image = path.root + 'image/**/*.*';
path.js    = path.root + 'js/**/*.js';
path.jsDir = path.root + 'js/';
path.scss  = path.root + 'scss/**/*.scss';


gulp.task('connect', function() {
    connect.server({
        root: './',
        port: 3000,
        livereload: true
    })
});

// clean dist directory
gulp.task('clean', function (callback) {
    return del([path.dist + 'css/*'], callback);
});

//sass build
gulp.task('scss', function() {
    gulp.src(path.scss)
        .pipe( plumber( {errorHandler : errrHandler} ) )
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(path.cssDir))
        .pipe(minifyCss())
        .pipe(rename({ extname: '-'+version+'.min.css' }))
        .pipe(gulp.dest(path.cssDir));
        
});

function errrHandler( e ){
    gutil.beep();
    gutil.log('===================',gutil.colors.cyan(e));
}

gulp.task('js', function() {
     gulp.src(path.js,{base: path.root })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(size())
        .pipe(gulp.dest(path.dist))
        .pipe(uglify({output: {ascii_only:true}}))
        .pipe(rename({ extname: '-'+version+'.min.js' }))
        .pipe(gulp.dest(path.dist));
});
  

gulp.task('reload',function() {
    gulp.src([path.html,path.scss,path.js])
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch([path.scss], ['scss']);
    gulp.watch([path.js], ['js']);
    gulp.watch([path.html,path.scss,path.js],['reload']);
});

gulp.task('serve', function() {
    gulp.start(['connect', 'watch']);
});

gulp.task('build',function(){
    gulp.start('clean',function(){
        gulp.src([path.css],{base: path.root })
            .pipe(gulp.dest(path.dist));
    })
    
});

gulp.task('default', ['serve']);












