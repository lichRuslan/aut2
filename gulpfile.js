const gulp = require ('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
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
gulp.task('default', ['scss'],()=> {
    gulp.watch('dev/scss/**/*.scss', ['scss']);
});