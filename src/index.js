"use strict";

//require("dotenv").config();

/* eslint-disable */
//const logger = require("logger");
/* eslint-enable */

//logger.log("app", "start");

class Debug {
  log(text = "") {
    console.log(text);
  }
}
const debug = new Debug();

debug.log("testing...");
