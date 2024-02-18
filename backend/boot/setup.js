const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const morgan = require('morgan');
const { connectMongoDB } = require('./database/db_connect');
const logger = require('../middleware/winston'); // Go up one level, then into /middleware
const notFound = require('../middleware/notFound'); // Same as above
const healthCheck = require('../middleware/healthCheck'); // Same as above
const verifyToken = require('../middleware/authentication'); // Same as above
const validator = require('../middleware/validator'); // Same as above

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Import routes
const authRoutes = require('../routes/auth.routes'); // Correct path needed
const tweetRoutes = require('../routes/tweet.routes'); // Correct path needed
const userRoutes = require('../routes/user.routes'); // Correct path needed

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

const startApp = async () => {
  console.log('Exporting startApp function...');
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      logger.info(`Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    logger.error(`Startup Error: ${err}`);
    process.exit(1);
  }
};

console.log('startApp function exported.');
module.exports = { startApp };