const { watch, series } = require("gulp");
const shell = require("shelljs");

function defaultTask(cb) {
  // place code for your default task here
  console.log("gulp...");
  cb();
}

function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  console.log("gulp js...");
  cb();
}

function css(cb) {
  // body omitted
  console.log("gulp css...");
  cb();
}

exports.default = function () {
  //@ browserify
  watch(["src/*.js"], function (cb) {
    // body omitted
    console.log("gulp bundle...");
    // shell.exec(
    //   "browserify ./src/index.js -t babelify --outfile ./public/bundle.js"
    // );
    cb();
  });
};
