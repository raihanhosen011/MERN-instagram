// internal imports
const comments = require("../models/commentMode");
const Post = require("../models/postModel");

// comment controller objects
const commentController = {
  // create comment
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply } = req.body;

      // push content to comment model
      const newComment = new comments({
        author: req.user,
        content,
        tag,
        reply,
      });

      // update data in post model
      await Post.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comment: newComment._id },
        },
        {
          new: true,
        }
      );

      // save created comment in mongo DB
      await newComment.save();

      res.json({ newComment });
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

  // edit comment
  editComment: async (req, res) => {
    try {
      const _id = req.params.id;
      const res = await comments.findOne({ _id });

      const newComment = {
        ...res._doc,
        content: req.body.editVal,
      };

      await comments.findOneAndUpdate({ _id }, newComment);

      res.json({ msg: "successfully updated" });
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

  // delete comment
  deleteComment: async (req, res) => {
    try {
      const _id = req.params.id;

      await comments.findByIdAndDelete(_id);

      res.json({ msg: "successfully deleted" });
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

  // like comment
  likeComment: async (req, res) => {
    try {
      const _id = req.params.id;

      await comments.findOneAndUpdate(
        { _id },
        {
          $push: { reacts: req.user._id },
        },
        {
          new: true,
        }
      );

      res.json({ msg: "successfully updated" });
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
};

// export module
module.exports = commentController;