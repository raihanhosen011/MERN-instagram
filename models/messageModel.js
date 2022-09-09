// internal imports
const mongoose = require("mongoose");

// message schema
const messageSchema = new mongoose.Schema(
  {
    conversation : { type: mongoose.Types.ObjectId, ref: "conversation" },
    recipients : { type: mongoose.Types.ObjectId, ref: "User" },
    sender : { type: mongoose.Types.ObjectId, ref: "User" },
    text: String,
    medias: Array,
    attachment : Array,
    type: Array
  },
  {
    timestamps: true,
  }
);

// message model
const messages = new mongoose.model("message", messageSchema);

// export module
module.exports = messages;
