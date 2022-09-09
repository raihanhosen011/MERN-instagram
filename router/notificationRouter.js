// external imports
const express = require("express");

// internal imports
const { auth } = require("../middleware/user/auth");
const notificationController = require("../controller/notificationController");

// router
const router = express.Router();

// create notification
router.post("/notification", auth, notificationController.createNotificaiton);

// get notification
router.get("/getNotification", auth, notificationController.getNotification);

// is read notification
router.patch("/notifies/:id", auth, notificationController.isReadNotify);

// export module
module.exports = router;