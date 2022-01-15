// external imports
const express = require("express");

// internal imports
const { auth } = require("../middleware/user/auth");
const commentController = require("../controller/commentController");

// router
const router = express.Router();

// create comment
router.post("/comment", auth, commentController.createComment);

// edit comment
router.patch("/edit-comment/:id", auth, commentController.editComment);

// delete comment
router.delete("/delete-comment/:id", auth, commentController.deleteComment);

// like comment
router.patch("/like-comment/:id", auth, commentController.likeComment);

// export module
module.exports = router;
