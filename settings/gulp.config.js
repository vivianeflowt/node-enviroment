"use strict";

module.exports = {
  build: `${process.cwd()}/build/`,
  js: {
    web: {
      target: `${process.cwd()}/build/js/`,
      bundle: {
        entries: `${process.cwd()}/src/index.js`,
        name: "app.js",
        dropComments: true,
        debug: true,
        uglify: {
          active: false,
          config: {
            ie8: false,
            compress: {
              drop_console: false,
            },
          },
        },
      },
      generic: {
        source: `${process.cwd()}/src/js/*.js`,
        dropComments: true,
        uglify: {
          active: false,
          config: {
            ie8: false,
            compress: {
              drop_console: false,
            },
          },
        },
      },
    },
    node: {
      source: `${process.cwd()}/src/**/*.js`,
      target: `${process.cwd()}/build/`,
      dropComments: true,
      uglify: {
        active: false,
        config: {
          ie8: false,
          compress: {
            drop_console: false,
          },
        },
      },
    },
  },
  style: {
    source: {
      css: `${process.cwd()}/src/css/*.css`,
      scss: `${process.cwd()}/src/scss/*.scss`,
    },
    target: `${process.cwd()}/build/style/`,
    bundle: {
      name: "style.css",
    },
    dropComments: true,
  },
  html: {
    source: `${process.cwd()}/src/**/*.html`,
    target: `${process.cwd()}/build/`,
    dropComments: true,
    html5: true,
    sort: {
      attributes: true,
      classnames: true,
    },
    collapseWhitespace: true,
    removeTagWhitespace: true,
  },
  image: {
    source: `${process.cwd()}/src/images/*`,
    target: `${process.cwd()}/build/img/`,
    config: {
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: false,
    },
  },
};
