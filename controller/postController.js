// INTERNAL IMPORTS
const Post = require("../models/postModel");

// CONTROL POST WITH OBJECT
const postController = {
  // CREATE POST
  createPost: async (req, res) => {
    try {
      const { images, content } = req.body;

      // SAVE CONTENT
      const newPost = await Post({
        images,
        content,
        user: req.user._id,
        username: req.user.username,
      }).save();

      // SEND CONTENT
      res.json({
        msg: "successfully create new post",
        post: newPost,
      });
    } catch (err) {
      res.status(400).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },

  // GET POST
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find({
        user: { $in: [...req.user.following, req.user._id] },
      })
        .sort("-createdAt")
        .populate("user reacts", "avatar fullname username")
        .populate("comment");

      // send data to api
      res.json({
        msg: "Success",
        result: posts.length,
        posts,
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },

  // GET POST
  getSinglePost: async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id })
        .sort("-createdAt")
        .populate("user reacts", "avatar fullname username")
        .populate("comment");

      // send data to api
      res.json({
        msg: "Success",
        post,
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },

  // PATCH DATA
  likePost: async (req, res) => {
    try {
      const id = req.params.id;

      await Post.findOneAndUpdate(
        { _id: id },
        {
          $push: { reacts: req.user._id },
        },
        { new: true }
      );

      res.json({ msg: "successfully updated" });
    } catch (err) {
      res.status(400).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },

  // PATCH DATA
  dislikePost: async (req, res) => {
    try {
      const id = req.params.id;

      await Post.findOneAndUpdate(
        { _id: id },
        {
          $pull: { reacts: req.user._id },
        },
        { new: true }
      );

      res.json({ msg: "successfully updated" });
    } catch (err) {
      res.status(400).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },
};

// EXPORTS MODULE
module.exports = postController;
