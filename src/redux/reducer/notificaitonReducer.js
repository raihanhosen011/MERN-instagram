// internal imports 
import { NOTIFICATION_ACTION } from '../actions/notificationAction'

// set initial state
const initialState = {
  notification : []
}

// set reducer function
const notificationReducer = (state = initialState,action) => {
  switch(action.type){
      case NOTIFICATION_ACTION.GET_NOTIFICATION : return {
        ...state,
        notification : [...action.payload,...state.notification]
      }
    
      case NOTIFICATION_ACTION.UPDATE_NOTIFY : return {
        ...state,
        notification : state.notification.map(data => data._id === action.payload._id ? action.payload : data)
      }

      default : return state
  }
}

export default notificationReducer