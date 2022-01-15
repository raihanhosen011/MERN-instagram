// internal imports
const User = require("../models/userModel");
const Post = require("../models/postModel");

// control user
const userControl = {
  // SEARCH USER
  searchUser: async (req, res) => {
    try {
      // FIND USER USING QUERY VALUE
      const users = await User.find({
        username: { $regex: req.query.username },
      }).limit(5);

      // SEND USER TO JSON
      res.json({ users });
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

  // GET USER
  getUser: async (req, res) => {
    try {
      // FIND USER USING QUERY VALUE
      const users = await User.findOne({
        username: req.params.username,
      })
        .select("-password")
        .populate("followers following", "-password");

      if (!users) {
        res.status(500).json({
          errors: {
            common: {
              msg: "user is not found",
            },
          },
        });
      }

      // SEND USER DATA TO JSON
      res.json({ users });
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

  // GET USER POST
  getUserPost: async (req, res) => {
    try {
      // FIND USER POST USING QUERY VALUE
      const posts = Post.find({
        username : req.params.username,
      });

      // SEND POST DATA TO JSON
      res.json({ posts });
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

  // UPDATE USER
  updateUser: async (req, res) => {
    try {
      const { fullname, mobile, address, website, bio, profession, avatar } =
        req.body;

      await User.findOneAndUpdate(
        { username: req.user.username },
        {
          fullname,
          mobile,
          address,
          website,
          bio,
          profession,
          avatar,
        }
      );

      res.json({ msg: req.body });
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

  // FOLLOW USER
  followUser: async (req, res) => {
    try {
      const username = req.params.username;

      // SINGLE FOLLOWER INFO
      const user = await User.findOne({ username });

      // ADD FOllWER
      await User.findOneAndUpdate(
        { username },
        { $push: { followers: req.user._id } },
        { new: true }
      ).populate("followers following", "-password");

      // ADD FOLLOWING
      await User.findOneAndUpdate(
        { username: req.user.username },
        { $push: { following: user._id } },
        { new: true }
      );

      res.json({ msg: { username } });
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

  // UNFOLLOW USER
  unfollowUser: async (req, res) => {
    try {
      const username = req.params.username;

      // SINGLE FOLLOWER INFO
      const user = await User.findOne({ username });

      // ADD FOllWER
      await User.findOneAndUpdate(
        { username },
        { $pull: { followers: req.user._id } },
        { new: true }
      );

      // ADD FOLLOWING
      await User.findOneAndUpdate(
        { username: req.user.username },
        { $pull: { following: user._id } },
        { new: true }
      );

      res.json({ msg: "successfully followed" });
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
module.exports = userControl;
