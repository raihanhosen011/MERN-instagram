// EXTERNAL IMPORTS
const express = require("express");

// ROUTER
const router = express.Router();

// POST CONTROLLER
const postController = require("../controller/postController");
const { auth } = require("../middleware/user/auth");

// SET POST ROUTER
router.post("/post", auth, postController.createPost);

// SET GET POST ROUTER
router.get("/post", auth, postController.getPosts);

// GET SINGLE POST
router.get("/posts/:id", auth, postController.getSinglePost);

// LIKE POST
router.patch("/post/:id/react", auth, postController.likePost);

// LIKE POST
router.patch("/post/:id/disreact", auth, postController.dislikePost);

// DELETE POST
router.delete("/post/:id/delete", auth, postController.deletePost);

// EXPORT MODULE
module.exports = router;
