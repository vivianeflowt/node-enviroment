/* eslint-disable */
("use strict");
require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});
/* eslint-enable */

require("module-alias/register");
require("dotenv").config();

/* eslint-disable */
const logger = require("@logger");
/* eslint-enable */

logger.log("app", "start");

class Test {
  debug() {
    console.log("debug");
  }
}
const t = new Test();

t.debug();
