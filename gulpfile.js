const gulp = require("gulp");
const clean = require("gulp-clean");
const run = require("gulp-run");
const watch = require("gulp-watch");
const browserSync = require("browser-sync");
const babel = require("gulp-babel");

// const buildApp = (done) => {
//   run("npx babel ./src --out-dir ./build").exec();
//   done();
// };

gulp.task("clean", function (done) {
  gulp.src("./dist/**/*.css", { read: false }).pipe(clean({ force: true }));
  gulp.src("./dist/**/*.js", { read: false }).pipe(clean({ force: true }));
  done();
});

gulp.task("babel", function (done) {
  gulp
    .src("src/index.js")
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

gulp.task("default", gulp.series("clean", "bundle"), function (done) {
  done();
});

// gulp.task("browserify-watch", (done) => {
//   gulp.watch("./src/index.js", buildBundle);
//   done();
// });

// gulp.task("babel", (done) => {
//   run("npx babel ./src --out-dir ./build").exec();
//   done();
// });
