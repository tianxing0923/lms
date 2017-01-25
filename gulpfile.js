var gulp = require('gulp');
var less = require('gulp-less');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

var path = {
  css: 'dist/css',
  js: 'dist/js',
  images: 'dist/images',
  components: 'dist/components'
};

var prefixer = {
  browsers: [
    'Explorer >= 9',
    'Firefox >= 30',
    'Chrome >= 36',
    'Safari >= 7',
    'iOS >= 7',
    'Android >= 4'
  ]
};

// 默认监听
gulp.task('default', function () {
  gulp.watch('public/assets/less/**/*.less', ['less']);

  browserSync.init({
    proxy: 'http://localhost:3000/',
    reloadDelay: 1000
  });

 gulp.watch('public/**/*', ['inject']);

  gulp.watch(['server/**/*', 'public/**/*'], browserSync.reload);
});

// 清除所有打包文件
gulp.task('clean', function () {
  return gulp.src('dist')
    .pipe(clean());
});

// 编译less
gulp.task('less', function () {
  return gulp.src('public/assets/less/style.less')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error);
        this.emit('end');
      }
    }))
    .pipe(less())
    .pipe(autoprefixer(prefixer))
    .pipe(gulp.dest('public/assets/css'))
});

// 打包css
gulp.task('css', function () {
  return gulp.src('public/assets/css/*.css')
    .pipe(csso())
    .pipe(gulp.dest(path.css));
});

// 打包js
gulp.task('js', function () {
  return gulp.src('public/assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(path.js));
});

// 打包组件
gulp.task('components', function () {
  return gulp.src('public/assets/components/**')
    .pipe(gulpif(/\.js$/, uglify()))
    .pipe(gulpif(/(\.jpg|\.png|\.gif)$/, imagemin()))
    .pipe(gulpif(/\.css$/, autoprefixer(prefixer)))
    .pipe(gulpif(/\.css$/, csso()))
    .pipe(gulp.dest(path.components));
});

// 打包images
gulp.task('images', function () {
  return gulp.src('public/assets/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest(path.images));
});

gulp.task('inject', function () {
  var target = gulp.src('./server/views/layouts/default.pug');
  var sources = gulp.src([
    './public/services/*.js',
    './public/filters/*.js',
    './public/directives/*.js',
    './public/*.js',
    './public/config/*.js',
    './public/controllers/**/*.js'
  ], {
    read: false
  });
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./server/views/layouts'));
});

gulp.task('dist', function (cb) {
  runSequence('clean', 'less', ['css', 'js', 'components', 'images'], cb);
});