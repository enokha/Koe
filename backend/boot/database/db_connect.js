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

// Function to test PostgreSQL connection
const connectPostgres = async () => {
  try {
    await postgresPool.query('SELECT 1');
    console.log('PostgreSQL connected successfully.');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

// MongoDB connection function
async function connectMongoDB() {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error in MongoDB connection:', error);
    process.exit(1);
  }
}

// Initiate database connections
const initDbConnections = async () => {
  await connectPostgres();
  await connectMongoDB().catch((error) => console.error(error));
};

initDbConnections();

// Exporting the PostgreSQL query function and the MongoDB connection function
module.exports = {
  queryPostgres,
  connectMongoDB,
};
