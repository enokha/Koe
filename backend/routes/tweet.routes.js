// backend/routes/tweet.routes.js
const express = require('express');
const TweetService = require('../services/tweet.service');

const router = express.Router();

router.post('/post', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const newTweet = await TweetService.postTweet(userId, content);
    res.status(201).json(newTweet);
  } catch (error) {
    console.error('Error posting tweet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const tweets = await TweetService.getTweetsByUser(userId);
    res.status(200).json(tweets);
  } catch (error) {
    console.error('Error retrieving tweets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/like/:tweetId', async (req, res) => {
  try {
    const { tweetId, userId } = req.body;
    const likedTweet = await TweetService.likeTweet(tweetId, userId);
    res.status(200).json(likedTweet);
  } catch (error) {
    console.error('Error liking tweet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
