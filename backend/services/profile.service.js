const UserProfile = require('../models/userProfileModel');

// Function to get user profile by userId
const getUserProfileById = async (userId) => {
  try {
    const userProfile = await UserProfile.findOne({ userId }).populate('followers following');
    return userProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
};

// Function to update user profile
const updateUserProfile = async (userId, updatedProfileData) => {
  try {
    const userProfile = await UserProfile.findOneAndUpdate({ userId }, updatedProfileData, { new: true });
    return userProfile;
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    throw error;
  }
};

module.exports = {
  getUserProfileById,
  updateUserProfile,
};
