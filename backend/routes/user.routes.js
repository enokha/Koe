const router = require("express").Router();
const userServices = require("../services/users.service");

router.put("/edit-profile", userServices.editProfile);
router.delete("/delete-account", userServices.deleteAccount);

module.exports = router;
