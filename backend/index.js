// index.js located in /Koe/backend/index.js

require("dotenv").config();
const startApp = require("./boot/setup"); 

// Destructure the startApp function

(async () => {
  try {
    await startApp();
  } catch (error) {
    console.log("Error in index.js => startApp");
    console.error(error); // Prints the error stack
  }
})();
