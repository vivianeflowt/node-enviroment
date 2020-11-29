/* eslint-disable */
"use strict";
/* eslint-enable */

const config = require("../config");

//require("./debug");

class Debug {
  log(text = "") {
    console.log(text);
  }
}
const debug = new Debug();

// Babel
debug.log("babel...");

console.log(config);
