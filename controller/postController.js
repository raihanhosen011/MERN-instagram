// INTERNAL IMPORTS
const Post = require("../models/postModel");

// API FEATURE
class APIfeatures {
  constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }

  paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 9
      const skip = (page - 1) * limit
      this.query = this.query.skip(skip).limit(limit)
      return this;
  }
}

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
        post: {
          ...newPost._doc,
          user : req.user
        },
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

      const features = new APIfeatures(Post.find({
        user: { $in: [...req.user.following, req.user._id] },
      }), req.query).paginating()

      const posts = await features.query.sort('-createdAt')
        .sort("-createdAt")
        .populate("user reacts", "avatar fullname username followers")
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

  // DELETE POST
  deletePost: async (req, res) => {
    try {
      const id = req.params.id;

      await Post.findByIdAndDelete( id );

      res.json({ msg: "successfully deleted" });
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
