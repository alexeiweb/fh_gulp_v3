import gulp from 'gulp';
import browserSync from 'browser-sync';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import gulpCssimport from 'gulp-cssimport';
import {deleteAsync} from 'del';
import htmlmin from 'gulp-htmlmin';
import cleanCss from 'gulp-clean-css';
import gulpImg from 'gulp-image';
import gulpWebp from 'gulp-webp';
import gulpAvif from 'gulp-avif';

  const del = deleteAsync;

  const prepros = true;

  const sass = gulpSass(sassPkg);

// задачи

export const html = () => gulp
  .src('src/*.html')
  .pipe(htmlmin({
    removeComments: true,
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    return gulp
    .src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError)) // Чтобы ошибки отобрпажались при сборке
    .pipe(cleanCss({
      2: {
        specialComments: 0,
      }
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
  }

  return gulp
  .src('src/css/index.css')
  .pipe(gulpCssimport({
    extensions: ['css'],
  }))
  .pipe(cleanCss({
    2: {
      specialComments: 0,
    }
  }))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
}

export const js = () => gulp
  .src('src/js/**/*.js')
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());

export const img = () => gulp
  .src('src/img/**/*.{jpg,jpeg,png,svg,gif}')
  .pipe(gulpImg())
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const webp = () => gulp
  .src('src/img/**/*.{jpg,jpeg,png}')
  .pipe(gulpWebp({
    quality: 60
  }))
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const avif = () => gulp
  .src('src/img/**/*.{jpg,jpeg,png}')
  .pipe(gulpAvif({
    quality: 50
  }))
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const copy = () => gulp
  .src([
    'src/fonts/**/*',
    'src/libs/**/*'
  ], {
    base: 'src'
  })
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream({
    once: true
  }));

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    // tunnel: true,
    server: {
      baseDir: 'dist'
    }
  })

  gulp.watch('./src/**/*.html', html);
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
  gulp.watch('src/img/**/*.{jpg,jpeg,png,svg,gif}', img);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch([ 
    './src/fonts/**/*',
    './src/libs/**/*'
  ], copy);
  gulp.watch('src/img/**/*.{jpg,jpeg,png}', webp);
  gulp.watch('src/img/**/*.{jpg,jpeg,png}', avif);
};

export const clear = () => del('dist/**/*', {forse: true,});


// запуск

export const base = gulp.parallel(html, style, js, img, avif, webp, copy);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);