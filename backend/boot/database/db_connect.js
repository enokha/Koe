// const pg = require("pg");
// const logger = require("../../middleware/winston");

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

module.exports = connectDB;
