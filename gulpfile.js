const gulp = require("gulp");
const clean = require("gulp-clean");
const run = require("gulp-run");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const htmlclean = require("gulp-htmlclean");
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
  return gulp
    .src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(strip())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .on("error", log.error)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("js:bundle", () => {
  const bundler = browserify({
    entries: "./src/index.js",
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [reactify],
  });
  return bundler
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(strip())
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .on("error", log.error)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("sass:comp", () => {
  return gulp
    .src("./src/**/*.scss")
    .pipe(gulp.src("./src/**/*.css"))
    .pipe(sourcemaps.init())
    .pipe(concat("style.css"))
    .pipe(strip())
    .pipe(sass({ style: "compressed" }).on("error", sass.logError))
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
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist"));
});

gulp.task(
  "dist:web",
  gulp.series(["clean", "html:comp", "sass:comp", "js:bundle", "js:comp"])
);

gulp.task("dist:node", gulp.series(["clean", "babel"]));

gulp.task("sync", (done) => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  gulp.watch("./src/**/*.js", gulp.parallel(["js:bundle", "js:comp"]));
  gulp.watch("./src/**/*.css", gulp.parallel(["sass:comp"]));
  gulp.watch("./src/**/*.scss", gulp.parallel(["sass:comp"]));
  gulp.watch("./src/**/*.html", gulp.parallel(["html:comp"]));
  gulp.watch("./dist/**/*.*").on("change", reload);
  done();
});

gulp.task("default", gulp.series(["dist:web"]));
