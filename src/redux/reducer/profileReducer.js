// internal imports 
import { PROFILE_TYPE } from '../actions/profileAction';

// set initial state
const initialState = {
  loading : false,
  users : [],
  userPosts : []
}

// set reducer function
const profileReducer = (state = initialState,action) => {
  switch(action.type){
      // LOADING ACTION
      case PROFILE_TYPE.LOADING : return {
        ...state,
        loading : action.payload
      }

      // GET USER DATA ACTION
      case PROFILE_TYPE.GET_USER : return {
        ...state,
        users: [...state.users, action.payload.users]
      };

      // GET USER POST ACTION
      case PROFILE_TYPE.GET_POST : return {
        ...state,
        userPosts: [...state.userPosts, ...action.payload.posts]
      };

      // FOLLOW USER ACTION
      case PROFILE_TYPE.FOLLOW : return {
        ...state,
        users: state.users.map(user => user.username == action.payload.username ? action.payload : user)
      };

      // UN-FOLLOW USER ACTION
      case PROFILE_TYPE.UN_FOLLOW : return {
        ...state,
        users: state.users.map(user => user.username == action.payload.username ? action.payload : user)
      };
      
      default : return state
  }
}

export default profileReducer