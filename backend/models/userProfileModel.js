const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  postsCount: {
    type: Number,
    default: 0,
  },
  repliesCount: {
    type: Number,
    default: 0,
  },
  repostsCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
