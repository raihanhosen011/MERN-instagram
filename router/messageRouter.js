// external imports
const express = require("express");

// internal imports
const { auth } = require("../middleware/user/auth");
const messageControll = require("../controller/messageControll");

// router
const router = express.Router();

// create message
router.post('/createMsg', auth, messageControll.createMsg)

// get conversations
router.get('/conversations', auth, messageControll.getConversation)

// get message
router.get('/message/:id', auth, messageControll.getMessage)

// delete message
router.delete('/message/:id', auth, messageControll.deleteMessage)

// delete conversation
router.delete('/conversation/:id', auth, messageControll.deleteConversation)

// export module
module.exports = router;