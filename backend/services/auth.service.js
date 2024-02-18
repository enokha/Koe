const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../boot/database/db_connect");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "missing information" });
  }

  const hash = bcrypt.hashSync(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hash]
    );

    const user = result.rows[0];

    const userProfileResult = await pool.query(
      "INSERT INTO user_profile (user_id, username) VALUES ($1, $2) RETURNING *",
      [user.id, username]
    );

    const userProfile = userProfileResult.rows[0];

    return res.status(200).json({ user, userProfile });
  } catch (error) {
    console.error("Error while saving user:", error.message);
    return res.status(500).json({ message: "Failed to save user" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "missing information" });
  }

  try {
    const userResult = await pool.query(
      `SELECT u.id, u.username, u.email, u.phone_number, u.birthdate, u.language, u.country, u.gender,
              up.followers_count, up.following_count, up.posts_count, up.replies_count, up.reposts_count, u.password
       FROM users u
       LEFT JOIN user_profile up ON u.id = up.user_id
       WHERE u.email = $1;`,
      [email]
    );

    if (userResult.rowCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Email or password don't match" });
    }

    req.session.user = {
      _id: user.id,
    };

    const token = jwt.sign(
      { user: { id: user.id, email: user.email } },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error while signing in:", error.message);
    return res.status(500).json({ error: "Failed to sign in" });
  }
};

const getUser = async (req, res) => {
  if (!req.session.user) {
    return res.status(500).json({ error: "You are not authenticated" });
  }

  try {
    const email = req.session.user.email;

    const userResult = await pool.query(
      `SELECT u.id, u.username, u.email, u.phone_number, u.birthdate, u.language, u.country, u.gender,
              up.followers_count, up.following_count, up.posts_count, up.replies_count, up.reposts_count
       FROM users u
       LEFT JOIN user_profile up ON u.id = up.user_id
       WHERE u.email = $1;`,
      [email]
    );

    if (userResult.rowCount > 0) {
      const user = userResult.rows[0];
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error while getting user from DB", error.message);
    return res.status(500).json({ error: "Failed to get user" });
  }
};

const logout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
  }

  return res.status(200).json({ message: "Disconnected" });
};

// auth.service.js

// Assuming you already have getUser implemented, add the following function:

const updateUser = async (req, res) => {
  const userId = req.session.user._id;
  const { username, email, phoneNumber, birthdate, language, country, gender } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET username = $1, email = $2, phone_number = $3, birthdate = $4, language = $5, country = $6, gender = $7
       WHERE id = $8
       RETURNING *`,
      [username, email, phoneNumber, birthdate, language, country, gender, userId]
    );

    const user = result.rows[0];

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error while updating user:", error.message);
    return res.status(500).json({ message: "Failed to update user" });
  }
};

module.exports = {
  signup,
  signin,
  getUser,
  updateUser,
  logout,
};