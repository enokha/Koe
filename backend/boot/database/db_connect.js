<<<<<<< Updated upstream
// const pg = require("pg");
// const logger = require("../../middleware/winston");
=======
<<<<<<< Updated upstream
const pg = require("pg");
const logger = require("../../middleware/winston");
>>>>>>> Stashed changes

// const db_config = {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST || "127.0.0.1",
//   database: process.env.DB_NAME || "twitter-clone",
//   password: process.env.DB_PASSWORD,
//   port: 5432,
//   max: 10,
// };

// let db_connection;

// function startConnection() {
//   type parsers here
//   pg.types.setTypeParser(1082, function (stringValue) {
//     return stringValue; // 1082 is for date type
//   });

//   db_connection = new pg.Pool(db_config);

//   db_connection.connect((err, client) => {
//     if (!err) {
//       logger.info("PostgreSQL Connected");
//     } else {
//       logger.error("PostgreSQL Connection Failed");
//       startConnection();
//     }
//   });

//   db_connection.on("error", (err, client) => {
//     logger.error("Unexpected error on idle client");
//     startConnection();
//   });
// }

// startConnection();

// setInterval(function () {
//   db_connection.query("SELECT $1", [1], (err, res) => {
//     if (err) logger.error("SELECT 1", err.message);
//   });
// }, 3000);

// module.exports = db_connection;

require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error in DB connection:', error);
    process.exit(1);
  }
}

<<<<<<< Updated upstream
module.exports = connectDB;
=======
startConnection();

setInterval(function () {
  db_connection.query("SELECT $1", [1], (err, res) => {
    if (err) logger.error("SELECT 1", err.message);
  });
}, 3000);

module.exports = db_connection;
=======
// db_connect.js

const { Pool } = require('pg');
const mongoose = require('mongoose');

require('dotenv').config();

// PostgreSQL pool creation for making query requests
const postgresPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port is 5432
});

// Function to query PostgreSQL
const queryPostgres = (text, params, callback) => {
  return postgresPool.query(text, params, callback);
};

// MongoDB connection function
async function connectMongoDB() {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error in MongoDB connection:', error);
    process.exit(1);
  }
}

// Connect to MongoDB on server start
connectMongoDB().catch((error) => console.error(error));

// Exporting the PostgreSQL query function and the MongoDB connection function
module.exports = {
  queryPostgres,
  connectMongoDB,
};
>>>>>>> Stashed changes
>>>>>>> Stashed changes
