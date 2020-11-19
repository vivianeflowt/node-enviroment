const gulp = require("gulp");
const shell = require("shelljs");

const config = {
  browserify: true,
};

gulp.task("default", function (done) {
  console.log("default");
  done();
});

gulp.task("clean", function () {
  console.log("clean");
});

// Message
gulp.task("message", function () {
  console.log("Gulp is running...");
});

// Auto Generate Browserify Bundle
gulp.task("browserify", function (done) {
  watch(["src/*.js"], function (cb) {
    if (config.browserify) {
      console.log("browserify bundle...");
      shell.exec(
        "browserify ./src/index.js -t babelify --outfile ./public/bundle.js"
      );
    }
  });
  done();
});

// exports.default = function () {
//   console.log("Gulp is running...");
// };
