// internal imports
const mongoose = require("mongoose");

// comment schema
const notificationSchema = new mongoose.Schema(
  {
    id : mongoose.Types.ObjectId,
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    recipients : [mongoose.Types.ObjectId],
    type : String,
    url : String,
    text : String,
    content : String,
    image : String,
    isRead : {
      type : Boolean,
      default : false  
    }
  },
  {
    timestamps: true,
  }
);

// comment model
const notifications = new mongoose.model("notification", notificationSchema);

// export module
module.exports = notifications;
