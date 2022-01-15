// internal imports
const mongoose = require("mongoose");

// comment schema
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: Object,
    reacts: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    reply: mongoose.Types.ObjectId,
    author: Object,
  },
  {
    timestamps: true,
  }
);

// comment model
const comments = new mongoose.model("comment", commentSchema);

// export module
module.exports = comments;
