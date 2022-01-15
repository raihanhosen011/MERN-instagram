// external imports
const mongoose = require("mongoose");

// post schema
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    comment: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    reacts: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    user: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    username : {
      type : String,
      default : ""
    }
  },
  {
    timestamps: true,
  }
);

// post model
const Post = new mongoose.model("Post", postSchema);

// export module
module.exports = Post;
