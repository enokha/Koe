// backend/services/tweet.service.js
const Tweet = require('../models/tweetModel');

class TweetService {
  async postTweet(userId, content) {
    try {
      const newTweet = new Tweet({
        userId,
        content,
      });

      await newTweet.save();
      return newTweet;
    } catch (error) {
      throw error;
    }
  }

  async getTweetsByUser(userId) {
    try {
      const tweets = await Tweet.find({ userId }).populate('userId', 'username'); // Assuming you have a 'username' field in the User model
      return tweets;
    } catch (error) {
      throw error;
    }
  }

  async likeTweet(tweetId, userId) {
    try {
      const tweet = await Tweet.findById(tweetId);

      if (!tweet) {
        throw new Error('Tweet not found');
      }

      // Check if the user has already liked the tweet
      if (tweet.likes.includes(userId)) {
        throw new Error('User already liked the tweet');
      }

      tweet.likes.push(userId);
      await tweet.save();

      return tweet;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TweetService();
