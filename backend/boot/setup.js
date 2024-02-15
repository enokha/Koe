const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const morgan = require('morgan');
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

// Import routes
const authRoutes = require('../routes/auth.routes');
const tweetRoutes = require('../routes/tweet.routes');
const userRoutes = require('../routes/user.routes');

// MIDDLEWARE
const registerCoreMiddleware = async () => {
  try {
    app.use(
      session({
        secret: '1234',
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false,
          httpOnly: true,
        },
      })
    );

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

    // 404 handling for not found
    app.use(notFound);

    logger.http('Done registering all middlewares');
  } catch (error) {
    console.error('Error registering core middleware:', error);
    process.exit(1);
  }
};

// Handling uncaught exceptions
const handleError = () => {
  process.on('uncaughtException', (err) => {
    console.error(`UNCAUGHT_EXCEPTION OCCURRED: ${JSON.stringify(err.stack)}`);
    process.exit(1);
  });
};

// Start application
const startApp = async () => {
  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Register core application-level middleware
    await registerCoreMiddleware();

    app.listen(PORT, () => {
      logger.info(`Server running on http://127.0.0.1:${PORT}`);
    });

    // Exit on uncaught exception
    handleError();
  } catch (err) {
    console.error(`Startup :: Error while booting the application: ${JSON.stringify(err, undefined, 2)}`);
    throw err;
  }
};

module.exports = { startApp };
