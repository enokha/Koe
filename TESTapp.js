require('dotenv').config(); 

const express = require('express');
const connectDB = require('./backend/boot/database/db_connect');
const tweetRoutes = require('./backend/routes/tweet.routes');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', tweetRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));