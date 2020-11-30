"use strict";

module.exports = {
  build: `${process.cwd()}/build/`,
  js: {
    source: {
      web: `${process.cwd()}/src/**/*.js`,
      node: `${process.cwd()}/src/**/*.js`,
    },
    target: {
      web: `${process.cwd()}/build/js/`,
      node: `${process.cwd()}/build/`,
    },
    bundle: {
      entries: `${process.cwd()}/src/index.js`,
      name: "app.js",
    },
    comments: false,
    uglify: {
      active: true,
      config: {
        ie8: false,
        compress: {
          drop_console: false,
        },
      },
    },
  },
  style: {
    source: {
      css: `${process.cwd()}/src/**/*.css`,
      scss: `${process.cwd()}/src/**/*.scss`,
    },
    target: `${process.cwd()}/build/css/`,
    bundle: {
      name: "style.css",
    },
    comments: false,
  },
  html: {
    source: `${process.cwd()}/src/**/*.html`,
    target: `${process.cwd()}/build/`,
    comments: false,
  },
};
