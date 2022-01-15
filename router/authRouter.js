// external imports
const express = require("express");

// internal imports
const authController = require("../controller/authController");
const avatarUpload = require("../middleware/user/avatarUpload");

// router
const router = express.Router();

// register router
router.post("/register", authController.register);

// login router
router.post("/login", authController.login);

// logout router
router.delete("/", authController.logout);

// export module
module.exports = router;
