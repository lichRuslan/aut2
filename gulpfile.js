const gulp = require ('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// const braowserSync  =require('browser-sync');
const plumber = require ('gulp-plumber');
gulp.task('scss', ()=>{
    return gulp
    .src('dev/scss/**/*.scss')
    .pipe(plumber())
    .pipe(scss())
    .pipe(
        autoprefixer(['last 15 versions', '> 1%','ie 8', 'ie 7']),{
            cascade: true
        }
    )
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets'))
});

gulp.task('scripts', ()=>{
    gulp
    .src([
        'dev/js/auth.js',
        'dev/js/post.js',
        'node_modules/medium-editor/dist/js/medium-editor.min.js'  // тема для textarea 
        
    ])
    .pipe(concat ('scripts.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
});

gulp.task('default', ['scss', 'scripts'],()=> {
    gulp.watch('dev/scss/**/*.scss', ['scss']);
    gulp.watch('dev/js/**/*.js', ['scripts']);
});