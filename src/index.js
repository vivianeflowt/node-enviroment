//require("dotenv").config();
/* eslint-disable */
/* eslint-enable */
require("./teste/teste");
require("./debug");

class Debug {
  log(text = "") {
    console.log(text);
  }
}
const debug = new Debug();

debug.log("testing...");

console.log("1");
