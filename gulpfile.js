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
const pipeline = require("readable-stream").pipeline;

gulp.task("clean", function (done) {
  gulp.src("./dist/**/*.css", { read: false }).pipe(clean({ force: true }));
  gulp.src("./dist/**/*.js", { read: false }).pipe(clean({ force: true }));
  //gulp.src("./dist/**/*", { read: false }).pipe(clean({ force: true }));
  done();
});

gulp.task("clean-css", function (done) {
  gulp.src("./dist/**/*.css", { read: false }).pipe(clean({ force: true }));
  done();
});

gulp.task("clean-bundle", function (done) {
  gulp.src("./dist/bundle.js", { read: false }).pipe(clean({ force: true }));
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

gulp.task("bundle", (done) => {
  run(
    "browserify ./src/index.js -t babelify --outfile ./dist/bundle.js"
  ).exec();
  done();
});

gulp.task("css-min", (done) => {
  gulp
    .src("./src/**/*.css")
    .pipe(concat("styles.css"))
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("css-concat", (done) => {
  gulp
    .src("./src/**/*.css")
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("js-uglify", (done) => {
  done();
});

gulp.task("js-concat", (done) => {
  gulp
    .src("./src/**/*.js")
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("./dist"));
  done();
});

gulp.task(
  "dist-web",
  gulp.series(
    "clean",
    "js-concat",
    "js-uglify",
    "css-concat",
    "css-min",
    "bundle"
  ),
  (done) => {
    done();
  }
);

gulp.task("dist", gulp.series("clean", "babel"), (done) => {
  done();
});

gulp.task("web-watch", (done) => {
  gulp.watch("./src/**/*.js", gulp.series("clean-bundle", "bundle"));
  gulp.watch(
    "./src/**/*.css",
    gulp.series("clean-css", "css-min", "css-concat")
  );
  done();
});

gulp.task("default", gulp.series("dist-web"), (done) => {
  done();
});
