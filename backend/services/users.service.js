const statusCodes = require("../constants/statusCodes");
const logger = require("../middleware/winston");
const pool = require("../boot/database/db_connect");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(statusCodes.badRequest).json({ message: "Missing parameters" });
  } else {
    const client = await pool.connect();

    try {
      // Check if the username already exists
      const usernameExists = await client.query(
        "SELECT * FROM users WHERE username = $1;",
        [username]
      );

      if (usernameExists.rowCount) {
        return res
          .status(statusCodes.userAlreadyExists)
          .json({ message: "Username is already taken" });
      }

      const result = await client.query(
        "SELECT * FROM users WHERE email = $1;",
        [email]
      );
      if (result.rowCount) {
        return res
          .status(statusCodes.userAlreadyExists)
          .json({ message: "User already has an account" });
      } else {
        await client.query("BEGIN");

        // Insert data into the users table
        const addedUser = await client.query(
          `INSERT INTO users(email, username, password, phone_number, birthdate, language, country, gender, verified, creation_date)
           VALUES ($1, $2, crypt($3, gen_salt('bf')), $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
           RETURNING id, email, username;`,
          [
            email,
            username,
            password,
            req.body.phone_number,
            req.body.birthdate,
            req.body.language,
            req.body.country,
            req.body.gender,
            false,
          ]
        );

        // Generate JWT token
        const token = jwt.sign(
          { user: { id: addedUser.rows[0].id, email: addedUser.rows[0].email } },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        logger.info("USER ADDED", addedUser.rowCount);

        res
          .status(statusCodes.success)
          .json({ token, username: addedUser.rows[0].username });
        await client.query("COMMIT");
      }
    } catch (error) {
      await client.query("ROLLBACK");
      logger.error(error.stack);
      res.status(statusCodes.queryError).json({
        message: "Exception occurred while registering",
      });
    } finally {
      client.release();
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)

  if (!email || !password) {
    res.status(statusCodes.badRequest).json({ message: "Missing parameters" });
  } else {
    try {
      const response = await axios.post("/users/login", {
        email,
        password,
      });

      // Process the successful response from the server
      const { token, username } = response.data;
      req.session.user = {
        email,
      };

      res.status(statusCodes.success).json({ token, username });
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle the error with response data
        logger.error(error.response.data);
        res.status(statusCodes.queryError).json({
          message: "Exception occurred while logging in",
        });
      } else {
        // Handle other types of errors
        logger.error(error.message);
        res
          .status(statusCodes.queryError)
          .json({ error: "Exception occurred while logging in" });
      }
    }
  }
};

module.exports = {
  register,
  login,
};
