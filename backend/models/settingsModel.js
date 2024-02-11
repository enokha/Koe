const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone_number: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  language: {
    type: String,
  },
  country: {
    type: String,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model('Settings', settingsSchema);
