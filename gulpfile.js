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
  gulp.src("./dist/**/*.js", { read: false }).pipe(clean({ force: true }));
  done();
});

gulp.task("clean-html", (done) => {
  gulp.src("./dist/**/*.html", { read: false }).pipe(clean({ force: true }));
  done();
});

gulp.task("clean-bundle", (done) => {
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

gulp.task("sass-comp", (done) => {
  gulp
    .src("./src/**/*.scss")
    .pipe(concat("style.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.src("./src/**/*.css"))
    .pipe(concat("style.css"))
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist"));
  done();
});

gulp.task("html-comp", (done) => {
  gulp.src("./src/**/*.html").pipe(gulp.dest("./dist"));
  done();
});

gulp.task(
  "dist-web",
  gulp.series("clean", "html-comp", "sass-comp", "bundle"),
  (done) => {
    done();
  }
);

gulp.task("dist", gulp.series("clean", "babel"), (done) => {
  done();
});

gulp.task("web-watch", (done) => {
  gulp.watch("./src/**/*.js", gulp.series("clean-bundle", "bundle"));
  gulp.watch("./src/**/*.css", gulp.series("clean-css", "sass-comp"));
  gulp.watch("./src/**/*.scss", gulp.series("clean-css", "sass-comp"));
  done();
});

gulp.task("default", gulp.series("dist-web"), (done) => {
  done();
});
