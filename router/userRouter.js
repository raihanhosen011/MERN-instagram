// external imports
const express = require("express");

// internal imports
const userController = require("../controller/userController");
const { auth } = require("../middleware/user/auth");

// router
const router = express.Router();

// SEARCH USER
router.get("/search-user", userController.searchUser);

// GET USER
router.get("/user/:username", userController.getUser);

// GET USER post
router.get("/user-post/:username", userController.getUserPost);

// UPDATE USER
router.patch("/user", auth, userController.updateUser);

// FOLLOW USER
router.patch("/user/:username/follow", auth, userController.followUser);

// UN-FOLLOW USER
router.patch("/user/:username/unfollow", auth, userController.unfollowUser);

// SUGGESTION DATA
router.get("/suggestion-user", auth, userController.suggestionUser);

// SAVED POST
router.patch("/saved-post/:id", auth, userController.savedPost)

// UN SAVED POSTS
router.patch("/unsaved-post/:id", auth, userController.unSaved)

// GET SAVED POSTS
router.get("/get-saved-post", auth, userController.getSavedPost)

// EXPORT MODEL
module.exports = router;
