const router = require("express").Router();

const userServices = require("../services/users.service");


router.post("/register", userServices.register);
router.post("/login", userServices.login);

module.exports = router;