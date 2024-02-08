// auth.service.js

const userModel = require("../models/userModel");
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
    // Insert into users table
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hash]
    );

    const user = result.rows[0];

    // Insert into user_profile table
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
    // Fetch user from the users table
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userResult.rowCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    // Compare passwords
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

    return res.status(200).json({ token });
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
    const user = await userModel
      .findById(req.session.user._id, {
        password: 0,
      })
      .populate("messages");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
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

module.exports = {
  signup,
  signin,
  getUser,
  logout,
};
