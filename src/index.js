"use strict";

//require("dotenv").config();

/* eslint-disable */
/* eslint-enable */

class Debug {
  log(text = "") {
    console.log(text);
  }
}
const debug = new Debug();

debug.log("testing...");
