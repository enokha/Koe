// setup.js located in /Koe/backend/boot/setup.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const morgan = require('morgan');
<<<<<<< Updated upstream
const logger = require('../middleware/winston');
const notFound = require('../middleware/notFound');
const healthCheck = require('../middleware/healthCheck');
const verifyToken = require('../middleware/authentication');
const validator = require('../middleware/validator');
require('dotenv').config();

const app = express();
const PORT = 8080;

// MongoDB connection
async function connectToMongoDB() {
  try {
    const uri = process.env.MONGODB_URI;

    await mongoose.connect(uri);

    console.log('Successfully connected to MongoDB via Mongoose!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
=======
const { queryPostgres, connectMongoDB } = require('./database/db_connect'); // Adjusted path
const logger = require('../middleware/winston'); // Adjusted path
const notFound = require('../middleware/notFound'); // Adjusted path
const healthCheck = require('../middleware/healthCheck'); // Adjusted path
const verifyToken = require('../middleware/authentication'); // Adjusted path
const validator = require('../middleware/validator'); // Adjusted path

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
>>>>>>> Stashed changes

// Import routes
const authRoutes = require('../routes/auth.routes'); // Adjusted path
const tweetRoutes = require('../routes/tweet.routes'); // Adjusted path
const userRoutes = require('../routes/user.routes'); // Adjusted path


const registerMiddleware = async () => {
// Register middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // set to true if using https
      httpOnly: true,
    },
  }));

  app.use(morgan('combined', { stream: logger.stream }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  app.use(validator);
  app.use(healthCheck);

  // Use your routes
  app.use('/auth', authRoutes);
  app.use('/tweets', tweetRoutes);
  app.use('/user', userRoutes);

  app.use(verifyToken);

  // Handling 404 errors
  app.use(notFound);

  // Handling uncaught exceptions
  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err}`);
    process.exit(1);
  });

};

const startApp = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    await registerMiddleware();

    // Perform a test query to PostgreSQL
    try {
      const postgresResult = await queryPostgres('SELECT NOW()');
      logger.info(`PostgreSQL connected: ${postgresResult.rows[0].now}`);
    } catch (err) {
      logger.error('Failed to connect to PostgreSQL:', err);
      process.exit(1); // Exit process if PostgreSQL connection fails
    }

    // Register core application-level middleware
    app.listen(PORT, () => {
      logger.info(`Server running on http://127.0.0.1:${PORT}`);
    });

  } catch (err) {
    logger.error(`Startup Error: ${err}`);
    process.exit(1);
  }
};

module.exports = startApp;
 // Exports startApp as a named export
