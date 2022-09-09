import { postData, getData, patchData } from '../../utils/fetchData'
import { GLOBALTYPES } from './globalTypes'

// ============ REDUX NOTIFICATION ACTION TYPE =============
export const NOTIFICATION_ACTION = {
  GET_NOTIFICATION : "GET_NOTIFICATION",
  UPDATE_NOTIFY : "UPDATE_NOTIFY"
}

// ============ CREATE NOTIFICATION ============
export const createNotification =  (msg, auth, socket) => async (dispatch) => {
  try {
    
    const res = await postData('notification', msg, auth.token)
    socket.emit("createNotification", res.data.notification)

  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}


// =========== GET NOTIFICATION =============
export const getNotification =  ( auth ) => async (dispatch) => {
  try {

    // GET NOTIFICATION USING AXIOS
    const res = await getData('getNotification', auth.token)

    // SEND RESPONSE TO REDUCER
    dispatch({ type : NOTIFICATION_ACTION.GET_NOTIFICATION, payload : res.data.notification })

  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}


// ============ IS READ NOTIFICATION ============
export const isReadNotify =  (msg, auth) => async (dispatch) => {
  dispatch({ type : NOTIFICATION_ACTION.UPDATE_NOTIFY, payload : { ...msg, isRead:true } })

  try {

    await patchData(`notifies/${msg._id}`, null, auth.token)

  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}
