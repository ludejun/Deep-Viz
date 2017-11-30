const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const path = require('path');
const replacePath = require('gulp-replace-path');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
//
gulp.task('clean', () => {
  del(['lib']);
});

gulp.task('copy', () => {
  // python
  // gulp.src(['**/*.py', '!run.py', '!dest/**/*.py']).pipe(gulp.dest('dest'));
  // gulp.src('run.py').pipe(rename('hrassist.py')).pipe(gulp.dest('dest'));
  // // html
  // gulp
  //   .src('templates/**/*.html', { base: 'templates' })
  //   .pipe(gulp.dest('dest/templates'));
  // image, fonts, files直接copy
  gulp
    .src(['src/assets/**/*.*'], {
      base: 'src',
    })
    .pipe(gulp.dest('lib'));

  // gulp
  //   .src(['static/css/fonts/*.*'], { base: 'static' })
  //   .pipe(gulp.dest('dest/static'));

  // css & js 最小化文件，不需sitemap
  // gulp
  //   .src(['static/**/*.min.*', '!static/**/*.map'], { base: 'static' })
  //   .pipe(gulp.dest('dest/static'));
});


gulp.task('less', () => {
  return gulp.src(['./src/**/*.less'], { base: './src' })
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
    }))
        .pipe(cleanCSS())
    .pipe(gulp.dest('./lib'));
});


gulp.task('js', () => {
  gulp
    .src(['./src/**/*.js', '!./src/assets/**/*.js'], { base: './src' })
    .pipe(babel({ presets: ['es2015', 'react', 'stage-0'] }))
    .pipe(replacePath(/\.less/g, '.css'))
    .pipe(uglify())
    .pipe(gulp.dest('./lib'));
});


gulp.task('default', ['less', 'js', 'copy']);
