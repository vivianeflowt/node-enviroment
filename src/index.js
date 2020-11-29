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

// teste comentario
console.log("1");

const func = (value) => console.log(value);

func("testando...");
