// external imports
const express = require("express");

// internal imports
const userController = require("../controller/userController");
const { auth } = require("../middleware/user/auth");

// router
const router = express.Router();

// search user
router.get("/search-user", userController.searchUser);

// get user
router.get("/user/:username", userController.getUser);

// get user post
router.get("/user-post/:username", userController.getUserPost);

// update user
router.patch("/user", auth, userController.updateUser);

// follow user
router.patch("/user/:username/follow", auth, userController.followUser);

// unfollow user
router.patch("/user/:username/unfollow", auth, userController.unfollowUser);

// export module
module.exports = router;
