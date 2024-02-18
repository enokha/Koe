const express = require('express');
const router = express.Router();
const { getUserProfileById, updateUserProfile } = require('../services/profile.service');

// Get user profile by userId
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const userProfile = await profileService.getProfileData(userId);
      res.json(userProfile);
    } catch (error) {
      console.log('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Update user profile
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const updatedProfileData = req.body;

  try {
    const updatedProfile = await updateUserProfile(userId, updatedProfileData);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
