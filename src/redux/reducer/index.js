import { combineReducers } from 'redux'
import alert from './alertReducer'
import auth from './authReducer'
import detail from './detailReducer'
import posts from './postReducer'
import profile from './profileReducer'

export default combineReducers({
   auth,
   alert,
   profile,
   posts,
   detail
})