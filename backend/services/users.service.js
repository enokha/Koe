const statusCodes = require("../constants/statusCodes");
const logger = require("../middleware/winston");
const pool = require("../boot/database/db_connect");

const editProfile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(statusCodes.unauthorized).json({ error: "You are not authenticated" });
    }

    const email = req.session.user.email;
    const { newUsername, newPassword, newPhoneNumber, newBirthdate, newLanguage, newCountry, newGender } = req.body;

    // Update username
    const updatedUsername = await pool.query(`UPDATE users SET username = $1 WHERE email = $2;`, [newUsername, email]);

    // Update password
    const updatedPassword = await pool.query(`UPDATE users SET password = crypt($1, gen_salt('bf')) WHERE email = $2;`, [newPassword, email]);

    // Update additional user data
    const updatedAdditionalData = await pool.query(
      `UPDATE users
       SET phone_number = $1, birthdate = $2, language = $3, country = $4, gender = $5
       WHERE email = $6;`,
      [newPhoneNumber, newBirthdate, newLanguage, newCountry, newGender, email]
    );

    if (updatedUsername.rowCount > 0 || updatedPassword.rowCount > 0 || updatedAdditionalData.rowCount > 0) {
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

const deleteAccount = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(statusCodes.unauthorized).json({ error: "You are not authenticated" });
    }

    const email = req.session.user.email;

    const deleteUserResult = await pool.query("DELETE FROM users WHERE email = $1", [email]);

    const deleteUserProfileResult = await pool.query(
      "DELETE FROM user_profile WHERE user_id IN (SELECT id FROM users WHERE email = $1)",
      [email]
    );

    if (deleteUserResult.rowCount > 0) {
      delete req.session.user;

      return res.status(statusCodes.success).json({ message: "Account deleted successfully" });
    } else {
      return res.status(statusCodes.notFound).json({ message: "User not found" });
    }
  } catch (error) {
    logger.error(error.stack);
    return res.status(statusCodes.internalServerError).json({ error: "Failed to delete account" });
  }
};

module.exports = {
  editProfile,
  logout,
  deleteAccount,
};
