// external imports
const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://smpn6kendari.sch.id/media_library/images/headmaster_photo.png",
    },
    gender: {
      type: String,
      default: "male",
    },
    mobile: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
    address: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    profession: {
      type: String,
      default: "",
    },
    story: {
      type: String,
      default: "",
      maxlength: 200,
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    saved: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

// user model
const User = new mongoose.model("User", userSchema);

// export module
module.exports = User;
