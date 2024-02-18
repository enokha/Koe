require("dotenv").config();
const { startApp } = require("./boot/setup");

(async () => {
  try {
    console.log('Starting the application...');
    await startApp();
    console.log('Application started successfully.');
  } catch (error) {
    console.error("Error in index.js => startApp", error);
  }
})();