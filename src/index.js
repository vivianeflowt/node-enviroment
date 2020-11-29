//require("dotenv").config();
/* eslint-disable */
/* eslint-enable */
require("./teste/teste");

class Debug {
  log(text = "") {
    console.log(text);
  }
}
const debug = new Debug();

debug.log("testing...");

console.log("1");
