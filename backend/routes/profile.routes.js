const router = require("express").Router();

const profileServices = require("../services/profile.service");

router.put("/profile", profileServices.editPassword);
// log out

module.exports = router;