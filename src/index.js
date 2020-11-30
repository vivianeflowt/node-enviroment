/* eslint-disable */
"use strict";
/* eslint-enable */

// load .env (only for node)
const config = require("../config");

require("./debug");

// testing babel transpiler
class Debug {
  log(text = "") {
    console.log(text);
  }
}
const debug = new Debug();

// babel class
debug.log("babel...");

//console.log(config);
