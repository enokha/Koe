const jwt = require("jsonwebtoken");
const { unauthorized } = require("../constants/statusCodes");
const logger = require("./winston");

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(unauthorized).json({ error: "Unauthorized: Token missing" });
  }

  try {
    const decoded = await jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);

    req.user = decoded.user;

    console.log("TOKEN USER: ", req.user);
    next();
  } catch (error) {
    logger.error(error);
    return res.status(unauthorized).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
