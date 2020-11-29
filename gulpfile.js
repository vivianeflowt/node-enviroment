const gulp = require("gulp");
const clean = require("gulp-clean");
const run = require("gulp-run");
const gulpWatch = require("gulp-watch");
const browserSync = require("browser-sync");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const strip = require("gulp-strip-comments");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const log = require("gulplog");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const reactify = require("reactify");
const eslint = require("gulp-eslint");

sass.compiler = require("node-sass");

gulp.task("clean", (done) => {
  gulp.src("./dist/**/*", { read: false }).pipe(clean({ force: true }));
  done();
});

gulp.task("clean-css", (done) => {
  gulp.src("./dist/**/*.css", { read: false }).pipe(clean({ force: true }));
  done();
});

gulp.task("clean-js", (done) => {
  gulp
    .src("./dist/**/*.js.map", { read: false })
    .pipe(gulp.src("./dist/**/*.js", { read: false }))
    .pipe(clean({ force: true }));
  done();
});

gulp.task("clean-html", (done) => {
  gulp.src("./dist/**/*.html", { read: false }).pipe(clean({ force: true }));
  done();
});

gulp.task("babel", (done) => {
  gulp
    .src("src/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist"));
  done();
});

gulp.task("js-comp", (done) => {
  const bundler = browserify({
    entries: "./src/index.js",
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [reactify],
  });
  bundler
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .pipe(strip())
    .on("error", log.error)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/"));
  done();
});

gulp.task("sass-comp", (done) => {
  gulp
    .src("./src/**/*.scss")
    .pipe(concat("style.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.src("./src/**/*.css"))
    .pipe(concat("style.css"))
    .pipe(strip())
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("html-comp", (done) => {
  gulp.src("./src/**/*.html").pipe(strip()).pipe(gulp.dest("./dist"));

  done();
});

gulp.task(
  "dist-web",
  gulp.series("clean", "html-comp", "sass-comp", "js-comp"),
  (done) => {
    done();
  }
);

gulp.task("dist", gulp.series("clean", "babel"), (done) => {
  done();
});

gulp.task("sync", (done) => {
  gulp.watch("./src/**/*.js", gulp.series("clean-js", "js-comp"));
  gulp.watch("./src/**/*.css", gulp.series("clean-css", "sass-comp"));
  gulp.watch("./src/**/*.scss", gulp.series("clean-css", "sass-comp"));
  done();
});

gulp.task("lint", (done) => {
  gulp
    .src(["./src/**/*.js", "!node_modules/**"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  done();
});

gulp.task("default", gulp.series("dist-web"), (done) => {
  done();
});
