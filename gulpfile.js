var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var extender = require('gulp-html-extend');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');

// file paths
var distPath = './dist';
var viewPath = { src: './src/views/**/*.html', dest: distPath + '/' };
var assetPath = { src: './src/assets/**/*', dest: distPath + '/assets' };
var sassPath = { src: './src/sass/**/*.scss', dest: assetPath.dest + '/css' };
var cssPath = { src: './src/assets/css/**/*.css', dest: assetPath.dest + '/css' };
var jsPath = { src: './src/assets/js/**/*.js', dest: distPath + '/assets/js' };

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  sourceComments: false
};

var prefixerOptions = {
  browsers: [
    'last 2 versions',
    'last 1 Chrome versions',
    'last 2 Explorer versions',
    'last 3 Safari versions',
    'Firefox >= 20',
    'Firefox ESR',
    'iOS 7',
    'not ie <= 8',
    '> 5%'
  ],
  cascade: false
};

// webserver
gulp.task('webserver', function() {
  gulp.src(distPath)
    .pipe(webserver({
      port: 1234,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('default', [
  'webserver',
  'sass',
  'sass:watch',
  'extend',
  'extend:watch',
  'asset-deploy',
  'asset-deploy:watch',
  'min-css',
  'uglify',
  'uglify:watch',
]);

// sass
gulp.task('sass', function() {
  return gulp.src(sassPath.src)

    // output non-minified CSS file
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(prefix(prefixerOptions))
    .pipe(gulp.dest(cssPath.dest))

    // output the minified version
    .pipe(minCss({
      rebase: false
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(sassPath.dest));
});

gulp.task('sass:watch', function() {
  gulp.watch(sassPath.src, ['sass']);
});


// gulp-html-extend
gulp.task('extend', function() {
  gulp.src(viewPath.src)
    .pipe(extender({ annotations: true, verbose: false })) // default options
    .pipe(gulp.dest(viewPath.dest))
})

gulp.task('extend:watch', function() {
  gulp.watch(viewPath.src, ['extend'])
})

// asset
gulp.task('asset-deploy:watch', function() {
  gulp.watch(assetPath.src, ['asset-deploy']);
  // gulp.watch(jsPath.src, ['asset-deploy']);
});

gulp.task('asset-deploy', function() {
  gulp.src((assetPath.src))
    .pipe(gulp.dest(assetPath.dest));
});

// css autoprefixer and minify
gulp.task('min-css', function() {
  gulp.src(cssPath.src)
    .pipe(prefix(prefixerOptions))
    .pipe(minCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(cssPath.dest));
});

// js uglify
gulp.task('uglify', function() {
  gulp.src(jsPath.src)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(jsPath.dest));
});

gulp.task('uglify:watch', function() {
  gulp.watch(jsPath.src, ['uglify']);
})