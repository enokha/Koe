const express = require("express");
const router = express.Router();

const authServices = require("../services/auth.service");

// Adjusted routes for authentication
router.post("/signup", authServices.signup);
router.post("/login", authServices.signin);
router.get("/me", authServices.getUser);
router.get("/logout", authServices.logout);

module.exports = router;
