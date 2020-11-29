const gulp = require("gulp");
const clean = require("gulp-clean");
const run = require("gulp-run");
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

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

sass.compiler = require("node-sass");

// const paths = {
//   styles: ["src/**/*.css", "src/**/*.scss"],
//   scripts: {
//     coffee: ["app/assets/scripts/**/*.coffee"],
//     js: ["app/assets/scripts/vendor/**/*.js", "app/assets/scripts/**/*.js"],
//   },
//   images: ["app/assets/images/**/*"],
//   fonts: ["app/assets/fonts/**/*"],
// };

gulp.task("clean", (done) => {
  gulp.src("./dist/*").pipe(clean({ force: true }));
  setTimeout(() => {
    done();
  }, 1000);
});

gulp.task("clean:css", () => {
  return gulp.src("./dist/**/*.css").pipe(clean({ force: true }));
});

gulp.task("clean:js", () => {
  return gulp.src("./dist/**/*.js").pipe(clean({ force: true }));
});

gulp.task("clean:html", () => {
  return gulp.src("./dist/**/*.html").pipe(clean({ force: true }));
});

gulp.task("babel", () => {
  return gulp
    .src("src/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("js:comp", () => {
  const bundler = browserify({
    entries: "./src/index.js",
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [reactify],
  });
  return (
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
      .pipe(gulp.dest("./dist/js"))
  );
  //done();
});

gulp.task("sass:comp", () => {
  return gulp
    .src("./src/**/*.scss")
    .pipe(gulp.src("./src/**/*.css"))
    .pipe(sourcemaps.init())
    .pipe(concat("style.css"))
    .pipe(sass().on("error", sass.logError))
    .pipe(strip())
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("html:comp", () => {
  return gulp
    .src("./src/**/*.html")
    .pipe(sourcemaps.init())
    .pipe(strip())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist"));
});

gulp.task(
  "dist:web",
  gulp.series(["clean", "html:comp", "sass:comp", "js:comp"])
);

gulp.task("dist:node", gulp.series(["clean", "babel"]));

gulp.task("sync", (done) => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  gulp.watch("./src/**/*.js", gulp.series(["js:comp"]));
  gulp.watch("./src/**/*.css", gulp.series(["sass:comp"]));
  gulp.watch("./src/**/*.scss", gulp.series(["sass:comp"]));
  gulp.watch("./src/**/*.html", gulp.series(["html:comp"]));
  gulp.watch("./dist/**/*.*").on("change", reload);
  done();
});

gulp.task("default", gulp.series(["dist:web"]));
