const Tweet = require('../models/tweetModel');

class TweetService {
  async postTweet(userId, content, comments) {
    try {
      const newTweet = new Tweet({
        userId,
        content,
        comments,
      });

      await newTweet.save();
      return newTweet;
    } catch (error) {
      throw error;
    }
  }

  async getTweetsByUser(userId) {
    try {
      const tweets = await Tweet.find({ userId }).populate('userId', 'username');
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

      // Use $addToSet to add userId to likes only if it doesn't already exist
      await tweet.updateOne({ $addToSet: { likes: userId } });

      return tweet;
    } catch (error) {
      throw error;
    }
  }

  async postComment(tweetId, userId, content) {
    try {
      const tweet = await Tweet.findById(tweetId);

      if (!tweet) {
        throw new Error('Tweet not found');
      }

      const newComment = {
        userId,
        content,
      };

      tweet.comments.push(newComment);
      await tweet.save();

      return newComment;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TweetService();
