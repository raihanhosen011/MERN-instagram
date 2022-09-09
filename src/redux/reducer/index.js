import { combineReducers } from 'redux'
import alert from './alertReducer'
import auth from './authReducer'
import detail from './detailReducer'
import posts from './postReducer'
import profile from './profileReducer'
import notificaiton from './notificaitonReducer'
import socket from './socketReducer'
import message from './msgReducer'

export default combineReducers({
   auth,
   alert,
   profile,
   posts,
   detail,
   notificaiton,
   socket,
   message
})