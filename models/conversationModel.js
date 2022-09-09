// internal imports
const mongoose = require("mongoose");

// conversation schema
const conversationSchema = new mongoose.Schema(
  {
    recipients : [{ type: mongoose.Types.ObjectId, ref: "User" }],
    text: String,
    medias : Array,
    type: Array
  },
  {
    timestamps: true,
  }
);

// conversation model
const conversations = new mongoose.model("conversation", conversationSchema);

// export module
module.exports = conversations;
