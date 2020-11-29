//require("dotenv").config();
/* eslint-disable */
/* eslint-enable */
require("./debug");

class Debug {
  log(text = "") {
    console.log(text);
  }
}
const debug = new Debug();

// Babel
debug.log("babel...");

// Index
console.log("index...");
