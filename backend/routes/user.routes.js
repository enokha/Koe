const router = require("express").Router();
const userServices = require("../services/users.service");

// User Profile
router.get("/profile", userServices.getUserProfile);

// Overview of Tweets
router.get("/tweets", userServices.getUserTweets);

// Overview of Followers and Following
router.get("/followers", userServices.getUserFollowers);
router.get("/following", userServices.getUserFollowing);

// Profile Management
router.put("/edit-password", userServices.editPassword);
router.put("/edit-profile", userServices.editProfile);
router.post("/logout", userServices.logout);

module.exports = router;
