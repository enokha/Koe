const express = require("express");
const router = express.Router();

const authServices = require("../services/auth.service");

router.post("/signup", authServices.signup);
router.post("/login", authServices.signin);
router.get("/profile", authServices.getUser);
router.get("/logout", authServices.logout);
router.put("/settings", authServices.updateUser); 


module.exports = router;