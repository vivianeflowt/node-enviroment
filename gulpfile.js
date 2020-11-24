const gulp = require("gulp");
const clean = require("gulp-clean");
const cleanCSS = require("gulp-clean-css");
const run = require("gulp-run");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const browserify = require("gulp-browserify");
const browserSync = require("browser-sync");

const buildBundle = (done) => {
  run(
    "browserify ./src/index.js -t babelify --outfile ./build/bundle.js"
  ).exec();
  done();
};

/// babel build
const buildApp = (done) => {
  run("npx babel ./src --out-dir ./build").exec();
  done();
};

gulp.task("default", function (done) {
  console.log("default");
  done();
});

// browserify bundle
gulp.task("browserify", buildBundle);

// browserify autoloader
gulp.task("browserify-watch", (done) => {
  gulp.watch("./src/index.js", buildBundle);
  done();
});

gulp.task("babel", buildApp);

gulp.task("clean", (done) => {
  gulp.src("build/*.js", { read: false }).pipe(clean({ force: true }));
  gulp.src("build/*.css", { read: false }).pipe(clean({ force: true }));
  done();
});

gulp.task("concat", function (done) {
  gulp.src("./src/*.js").pipe(concat("all.js")).pipe(gulp.dest("./build"));
  done();
});

gulp.task("css", (done) => {
  gulp
    .src("styles/*.css")
    .pipe(
      cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      })
    )
    .pipe(gulp.dest("build/"));
  done();
});

exports.default = (done) => {
  console.log("Gulp is running...");
  gulp.src("build/*.js", { read: false }).pipe(clean({ force: true }));
  gulp.src("build/*.css", { read: false }).pipe(clean({ force: true }));
  done();
};
