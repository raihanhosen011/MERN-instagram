// internal imports 
import { PROFILE_TYPE } from '../actions/profileAction';

// set initial state
const initialState = {
  loading : false,
  users : [],
  userPosts : [],
  suggestion:[],
  suggestion_loading:false
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


      // FOLLOW USER ACTION
      case PROFILE_TYPE.SUGGESTION_USER : return {
        ...state,
        suggestion : action.payload
      };


      // SUGGESTION LOADING 
      case PROFILE_TYPE.SUGGESTION_LOADING : return {
        ...state,
        suggestion_loading : action.payload
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