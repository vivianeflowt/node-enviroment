const path = require("path");
const gulp = require("gulp");
const clean = require("gulp-clean");
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
const inject = require("gulp-inject");
const flatten = require("gulp-flatten");

const image = require("gulp-image");
const config = require("./settings/gulp.config");

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

sass.compiler = require("node-sass");

//@ clean build
gulp.task("clean", (done) => {
  gulp.src(path.join(config.build, "/*")).pipe(clean({ force: true }));
  setTimeout(() => {
    done();
  }, 1000);
});

//@ compile for node
gulp.task("js:comp:node", () => {
  return gulp
    .src(path.resolve(config.js.node.source))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulpif(config.js.node.dropComments, strip()))
    .pipe(
      gulpif(config.js.node.uglify.active, uglify(config.js.node.uglify.config))
    )
    .pipe(gulp.dest(path.resolve(config.js.node.target)));
});

//@ compile for web
gulp.task("js:web:bundle", () => {
  const bundler = browserify({
    entries: path.resolve(config.js.web.bundle.entries),
    debug: config.js.web.bundle.debug || false,
    transform: [reactify],
  });
  return bundler
    .bundle()
    .pipe(source(config.js.web.bundle.name))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulpif(config.js.web.bundle.dropComments, strip()))
    .pipe(
      gulpif(
        config.js.web.bundle.uglify.active,
        uglify(config.js.web.bundle.uglify.config)
      )
    )
    .pipe(rename({ suffix: ".min" }))
    .on("error", log.error)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(path.resolve(config.js.web.target)));
});

gulp.task("js:web", () => {
  return gulp
    .src(path.resolve(config.js.web.generic.source))
    .pipe(gulpif(!config.js.web.generic.dropComments, strip()))
    .on("error", log.error)
    .pipe(gulp.dest(path.resolve(config.js.web.target)));
});

//@ compile sass
gulp.task("sass:comp", () => {
  return gulp
    .src(path.resolve(config.style.source.scss))
    .pipe(sourcemaps.init())
    .pipe(concat("style.scss"))
    .pipe(gulpif(config.style.dropComments, strip()))
    .pipe(sass({ style: "compressed" }).on("error", sass.logError))
    .pipe(gulp.src(path.resolve(config.style.source.css)))
    .pipe(concat(config.style.bundle.name))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(flatten())
    .pipe(gulp.dest(path.resolve(config.style.target)));
});

//@ compile html
gulp.task("html:comp", () => {
  return gulp
    .src(path.resolve(config.html.source))
    .pipe(sourcemaps.init())
    .pipe(
      htmlmin({
        collapseWhitespace: config.html.collapseWhitespace || true,
        removeTagWhitespace: config.html.removeTagWhitespace || true,
        sortAttributes: config.html.sort.attributes || true,
        sortClassName: config.html.sort.classnames || true,
        html5: config.html.html5 || true,
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(path.resolve(config.html.target)));
});
gulp.task("html:inject", () => {
  return gulp
    .src(path.join(config.html.target, "/**/*.html"))
    .pipe(
      inject(
        gulp.src(path.join(config.js.web.target, "/*.js"), { read: true }),
        { relative: true }
      )
    )
    .pipe(
      inject(
        gulp.src(path.join(config.style.target, "/*.css"), { read: true }),
        {
          relative: true,
        }
      )
    )
    .pipe(gulpif(config.html.dropComments, strip()))
    .pipe(gulp.dest(path.resolve(config.build)));
});

//@ image

gulp.task("img:comp", (done) => {
  gulp
    .src(config.image.source)
    .pipe(image(config.image.config))
    .pipe(flatten())
    .pipe(gulp.dest(path.resolve(config.image.target)));

  setTimeout(() => {
    done();
  }, 500);
});

//@ build
gulp.task(
  "build:web",
  gulp.series([
    "clean",
    "sass:comp",
    "js:web",
    "js:web:bundle",
    "html:comp",
    "html:inject",
    "img:comp",
  ])
);
gulp.task("build:node", gulp.series(["clean", "js:comp:node"]));

//# browser-sync
gulp.task("sync", (done) => {
  browserSync.init({
    server: {
      baseDir: "build",
    },
  });
  gulp.watch("./src/**/*.js", gulp.series(["js:web:bundle", "js:web"]));
  gulp.watch("./src/**/*.css", gulp.series(["sass:comp"]));
  gulp.watch("./src/**/*.scss", gulp.series(["sass:comp"]));
  gulp.watch("./src/**/*.html", gulp.series(["html:comp", "html:inject"]));
  gulp.watch("./build/**/*.*").on("change", reload);
  done();
});

//@ validation TODO
gulp.task("check:css", () => {
  //return gulp.src(["./build/css/style.css", "./build/*.html"]).pipe(checkCSS());
});

//# default task
gulp.task("default", gulp.series(["build:web"]));
//gulp.task("default", gulp.series(["build:node"]));
