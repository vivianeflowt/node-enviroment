"use strict";

let counter = 0;

setTimeout(() => {
  try {
    document.body.innerHTML += "<br><p> console debug... </p>";
    setInterval(() => {
      try {
        console.log(`[${counter}] Debug...`);
        counter++;
      } catch (error) {
        console.log(error);
      }
    }, 5000);
  } catch (error) {
    console.log(error);
  }
}, 5000);
