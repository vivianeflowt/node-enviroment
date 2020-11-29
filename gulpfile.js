const gulp = require("gulp");
const clean = require("gulp-clean");
const run = require("gulp-run");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const strip = require("gulp-strip-comments");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const log = require("gulplog");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const reactify = require("reactify");
const autoprefixer = require("gulp-autoprefixer");
const gulpif = require("gulp-if");

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

sass.compiler = require("node-sass");

const config = {
  js: {
    comments: false,
    uglify: {
      active: true,
      config: {
        ie8: false,
        compress: {
          drop_console: true,
        },
      },
    },
  },
  style: {
    comments: false,
  },
  html: {
    comments: false,
  },
};

//# CLEAN DIST
gulp.task("clean:build", (done) => {
  gulp.src("./build/*").pipe(clean({ force: true }));
  setTimeout(() => {
    done();
  }, 1000);
});

gulp.task("clean:dist", (done) => {
  gulp.src("./dist/*").pipe(clean({ force: true }));
  setTimeout(() => {
    done();
  }, 1000);
});

gulp.task("clean:all", gulp.parallel(["clean:build", "clean:dist"]));

//# COMPILE FOR NODE
gulp.task("js:comp:node", () => {
  return gulp
    .src("src/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulpif(!config.js.comments, strip()))
    .pipe(gulpif(config.js.uglify.active, uglify(config.js.uglify.config)))
    .pipe(gulp.dest("./build"));
});

//# COMPILE JS
gulp.task("js:comp", () => {
  return gulp
    .src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulpif(!config.js.comments, strip()))
    .pipe(gulpif(config.js.uglify.active, uglify(config.js.uglify.config)))
    .pipe(rename({ suffix: ".min" }))
    .on("error", log.error)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./build/js"));
});

//# COMPILE JS (browserify)
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
    .pipe(gulpif(!config.js.comments, strip()))
    .pipe(gulpif(config.js.uglify.active, uglify(config.js.uglify.config)))
    .pipe(rename({ suffix: ".min" }))
    .on("error", log.error)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./build/js"));
});

//# COMPILE CSS/SASS
gulp.task("sass:comp", () => {
  return gulp
    .src("./src/**/*.scss")
    .pipe(gulp.src("./src/**/*.css"))
    .pipe(sourcemaps.init())
    .pipe(concat("style.css"))
    .pipe(gulpif(!config.style.comments, strip()))
    .pipe(sass({ style: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./build/css"));
});

//# COMPILE HTML
gulp.task("html:comp", () => {
  return gulp
    .src("./src/**/*.html")
    .pipe(sourcemaps.init())
    .pipe(gulpif(!config.html.comments, strip()))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
        html5: true,
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./build"));
});

//# BUILD
gulp.task(
  "build:web",
  gulp.series(["clean:build", "html:comp", "sass:comp", "js:bundle", "js:comp"])
);
gulp.task("build:node", gulp.series(["clean:build", "js:comp:node"]));

//# BROWSER-SYNC
gulp.task("sync", (done) => {
  browserSync.init({
    server: {
      baseDir: "build",
    },
  });
  gulp.watch("./src/**/*.js", gulp.parallel(["js:bundle", "js:comp"]));
  gulp.watch("./src/**/*.css", gulp.parallel(["sass:comp"]));
  gulp.watch("./src/**/*.scss", gulp.parallel(["sass:comp"]));
  gulp.watch("./src/**/*.html", gulp.parallel(["html:comp"]));
  gulp.watch("./build/**/*.*").on("change", reload);
  done();
});

//# VALIDATION
gulp.task("check:css", () => {
  //return gulp.src(["./build/css/style.css", "./build/*.html"]).pipe(checkCSS());
});

//# DEFAULTS
gulp.task("default", gulp.series(["build:web"]));
//gulp.task("default", gulp.series(["build:node"]));
