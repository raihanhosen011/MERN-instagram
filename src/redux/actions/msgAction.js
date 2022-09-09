import { GLOBALTYPES } from './globalTypes'
import { postData, getData, deleteData } from '../../utils/fetchData'
import { uploadImage } from '../../utils/uploadImage'

// ============ REDUX MESSAGE ACTION TYPE =============
export const MSG_ACTION = {
  ADD_USER : "ADD_USER",
  ADD_MESSAGE : "ADD_MESSAGE",
  GET_CONVERSATION : "GET_CONVERSATION",
  GET_MESSAGES : "GET_MESSAGES",
  DELETE_CONVERSATION : "DELETE_CONVERSATION"
}


// ============= ADD USER ===============
export const addUser =  (user, auth) => async (dispatch) => {
    dispatch({ type : MSG_ACTION.ADD_USER, payload : user })

    try {

    } catch (err) {
      dispatch({
        type : GLOBALTYPES.ALERT,
        payload : {
          err : err.message
        }
      })
    }
}


// ============= ADD MESSAGE =============
export const addConversation =  (msg, auth, socket) => async (dispatch) => {
  var imagesUrl = []
  var attachmentUrl = []

  try {      
    // upload images 
    if (msg.images.length > 0){
      var img = await uploadImage(msg.images)
      imagesUrl.push(...img)
    }

    // upload attachment
    if (msg.attachment.length > 0){
      var attachment = await uploadImage(msg.attachment)
      attachmentUrl.push(...attachment)
    }      

    let newMsg = {...msg, medias : [...imagesUrl], attachment : [...attachmentUrl] }
    
    await postData('createMsg', newMsg, auth.token)

    dispatch({ type : MSG_ACTION.ADD_MESSAGE, payload : newMsg })
    socket.emit('message', newMsg)
  
  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}


// ============= GET CONVERSATION =============
export const getConversation =  ( auth, socket) => async (dispatch) => {
  try {

    const res = await getData('conversations', auth.token)
    
    let newArr = []
    res.data.conversation.forEach(item => {
      item.recipients.forEach(user => {
        if (user._id !== auth.user._id) {
           newArr.push({...user, text : item.text, medias : item.medias, type : item.type})  
        }
      })
    })

    dispatch({ type : MSG_ACTION.GET_CONVERSATION, payload : {newArr, result : res.data.result} })

  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}


// ============= GET MESSAGE =============
export const getMessage =  ( auth, id) => async (dispatch) => {
  try {

    const res = await getData(`message/${id}`, auth.token)
    dispatch({ type : MSG_ACTION.GET_MESSAGES, payload : res.data.message.reverse() })
  
  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}


// ============= DELETE MESSAGE ===========
export const deleteMessage =  (auth, data, message) => async (dispatch) => {
  try {

    const newMsg = message?.data.filter(({ _id }) => _id !== data._id )
    dispatch({ type : MSG_ACTION.GET_MESSAGES, payload : newMsg })

    await deleteData(`message/${data._id}`, auth.token)

  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}

// ============= DELETE CONVERSATION ===========
export const deleteConversation =  (auth, id) => async (dispatch) => {
  try {
    dispatch({ type : MSG_ACTION.DELETE_CONVERSATION, payload : id })

    await deleteData(`conversation/${id}`, auth.token)

  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}