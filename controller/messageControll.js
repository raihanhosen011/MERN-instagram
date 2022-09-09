// internal imports
const conversationModel = require('../models/conversationModel') 
const messageModel = require('../models/messageModel') 

// API FEATURE
class APIfeatures {
  constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }

  paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 9
      const skip = (page - 1) * limit
      this.query = this.query.skip(skip).limit(limit)
      return this;
  }
}


// conversation controller objects
const messageController = {
  // CREATE MESSAGE
  createMsg : async (req, res) => {
    try {
      const { recipient, text, medias, attachment , type, sender } = req.body

      if(!recipient || (!text.trim() && medias.length === 0  && type.length === 0 && attachment.length === 0 )) return;

      const newConversation = await conversationModel.findOneAndUpdate({
        $or: [
                {recipients: [sender, recipient]},
                {recipients: [recipient, sender]}
            ]
        }, {
            recipients: [sender, recipient],
            text, medias, type, attachment
        }, { new: true, upsert: true })

      const newMessage = new messageModel({
        conversation : newConversation._id ,
        sender : req.user._id,
        recipient, text, medias, attachment, type
      })

      const res = await newMessage.save()
      res.json({ newConversation })
      
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

  // GET Message
  getMessage : async (req, res) => {
    try {
      
      const features = new APIfeatures(messageModel.find({
        $or : [
          {sender: req.user._id, recipient: req.params.id},
          {sender: req.params.id, recipient: req.user._id}
        ]
      }), req.query).paginating()

      const message = await features.query.sort('-createdAt')

      res.json({ message, result : message.length })

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

  // GET CONVERSATION
  getConversation : async (req, res) => {
    try {
      
      const features = new APIfeatures(conversationModel.find({
        recipients : req.user._id
      }), req.query).paginating()

      const conversation = await features.query.sort('updatedAt')
      .populate('recipients', 'avatar username fullname')

      res.json({ conversation, result : conversation.length })

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

  // DELETE MESSAGE
  deleteMessage : async (req, res) => {
    try {
      const id = req.params.id
      await messageModel.findByIdAndDelete(id)
      
      res.json({ msg : "successfully deleted" })
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


  // DELETE CONVERSATION
  deleteConversation : async (req, res) => {
    try {
      const id = req.params.id

      const deleteConver =  await conversationModel.findOneAndDelete({
        $or : [
          {recipients : [req.user._id, id]}
        ]
      })

      await messageModel.deleteMany({ conversation : deleteConver._id })
      
      res.json({ msg : "successfully deleted" })
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
module.exports = messageController;
