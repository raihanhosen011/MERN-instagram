// internal imports
const notificationModel = require('../models/notificationModel') 

// notification controller objects
const notificationController = {
  // create notification
  createNotificaiton : async (req, res) => {
    try {
      const { id,user, recipients, url, text, content, image, isRead, type } = req.body  

      const notification = new notificationModel({ 
          id,user : req.user, recipients, url, text, content, image, isRead, type
      })
      await notification.save()

      res.json({ 
        msg : "Notification successfully sent",
        notification 
      })
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

  // get notification
  getNotification : async (req, res) => {
    try {
      const notification = await notificationModel.find({ recipients : req.user._id })
                           .sort("isRead").populate("user", "avatar username fullname") 

      res.json({ notification  })
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

  // is read notification
  isReadNotify : async (req, res) => {
    try {
      const notifies = await notificationModel.findOneAndUpdate({ _id : req.params.id }, {
        isRead : true
      })

      res.json({ msg : 'Successfully update' })
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
module.exports = notificationController;
