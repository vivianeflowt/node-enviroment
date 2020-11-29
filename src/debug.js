let counter = 0;

setTimeout(() => {
  try {
    document.body.innerHTML += "<p> console debug... </p>";
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
}, 3000);
