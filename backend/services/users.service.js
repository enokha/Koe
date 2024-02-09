const statusCodes = require("../constants/statusCodes");
const logger = require("../middleware/winston");
const pool = require("../boot/database/db_connect");
const jwt = require("jsonwebtoken");

const getUserProfile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(statusCodes.unauthorized).json({ error: "You are not authenticated" });
    }

    const email = req.session.user.email;

    const userProfileResult = await pool.query(
      `SELECT u.email, u.username, u.creation_date,
              up.followers_count, up.following_count, up.posts_count, up.replies_count, up.reposts_count
       FROM users u
       LEFT JOIN user_profile up ON u.id = up.user_id
       WHERE u.email = $1;`,
      [email]
    );    

    if (userProfileResult.rowCount > 0) {
      const userProfile = userProfileResult.rows[0];
      return res.status(statusCodes.success).json({ userProfile });
    } else {
      return res.status(statusCodes.notFound).json({ message: "User not found" });
    }
  } catch (error) {
    logger.error(error.stack);
    return res.status(statusCodes.internalServerError).json({ error: "Failed to get user profile" });
  }
};


const getUserTweets = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(statusCodes.unauthorized).json({ error: "You are not authenticated" });
    }

    const email = req.session.user.email;

    const userTweets = await pool.query(
      `SELECT t.content, t.created_at
       FROM tweets t
       WHERE t.user_email = $1;`,
      [email]
    );

    return res.status(statusCodes.success).json({ tweets: userTweets.rows });
  } catch (error) {
    logger.error(error.stack);
    return res.status(statusCodes.internalServerError).json({ error: "Failed to get user tweets" });
  }
};

const getUserFollowers = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(statusCodes.unauthorized).json({ error: "You are not authenticated" });
    }

    const email = req.session.user.email;

    const followers = await pool.query(
      `SELECT f.follower_email
       FROM followers f
       WHERE f.user_email = $1;`,
      [email]
    );

    return res.status(statusCodes.success).json({ followers: followers.rows });
  } catch (error) {
    logger.error(error.stack);
    return res.status(statusCodes.internalServerError).json({ error: "Failed to get user followers" });
  }
};

const getUserFollowing = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(statusCodes.unauthorized).json({ error: "You are not authenticated" });
    }

    const email = req.session.user.email;

    const following = await pool.query(
      `SELECT f.user_email
       FROM followers f
       WHERE f.follower_email = $1;`,
      [email]
    );

    return res.status(statusCodes.success).json({ following: following.rows });
  } catch (error) {
    logger.error(error.stack);
    return res.status(statusCodes.internalServerError).json({ error: "Failed to get user following" });
  }
};

const editPassword = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(statusCodes.unauthorized).json({ error: "You are not authenticated" });
    }

    const email = req.session.user.email;
    const { newPassword } = req.body;

    const updatedPassword = await pool.query(
      `UPDATE users
       SET password = crypt($1, gen_salt('bf'))
       WHERE email = $2;`,
      [newPassword, email]
    );

    if (updatedPassword.rowCount > 0) {
      return res.status(statusCodes.success).json({ message: "Password updated successfully" });
    } else {
      return res.status(statusCodes.notFound).json({ message: "User not found" });
    }
  } catch (error) {
    logger.error(error.stack);
    return res.status(statusCodes.internalServerError).json({ error: "Failed to update password" });
  }
};

const editProfile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(statusCodes.unauthorized).json({ error: "You are not authenticated" });
    }

    const email = req.session.user.email;
    const { newUsername, newCountry, newCity, newStreet } = req.body;

    const updatedProfile = await pool.query(
      `UPDATE users u
       SET username = $1
       FROM addresses a
       WHERE u.email = a.email
       AND u.email = $2;`,
      [newUsername, email]
    );

    if (updatedProfile.rowCount > 0) {
      await pool.query(
        `UPDATE addresses
         SET country = $1, city = $2, street = $3
         WHERE email = $4;`,
        [newCountry, newCity, newStreet, email]
      );

      return res.status(statusCodes.success).json({ message: "Profile updated successfully" });
    } else {
      return res.status(statusCodes.notFound).json({ message: "User not found" });
    }
  } catch (error) {
    logger.error(error.stack);
    return res.status(statusCodes.internalServerError).json({ error: "Failed to update profile" });
  }
};

const logout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
  }

  return res.status(statusCodes.success).json({ message: "Disconnected" });
};

module.exports = {
  getUserProfile,
  getUserTweets,
  getUserFollowers,
  getUserFollowing,
  editPassword,
  editProfile,
  logout,
};
