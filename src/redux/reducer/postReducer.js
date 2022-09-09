// internal imports 
import { POST_TYPE } from '../actions/postAction'

// set initial state
const initialState = {
  posts : [],
  createLoading:false,
  result : 0,
  postLoading:false,
}

// set reducer function
const postReducer = (state = initialState,action) => {
  switch (action.type){
    case POST_TYPE.CREATEPOST : return {
      ...state,
      posts : [...state.posts,action.payload]
    }

    case POST_TYPE.CREATE_LOADING : return {
      ...state,
      createLoading : action.payload
    }

    case POST_TYPE.GET_POST : return {
      ...state,
      posts : action.payload.posts,
      result : action.payload.result
    }

    case POST_TYPE.UPDATE_POST : return {
      ...state,
      posts : state.posts.map(post => post._id === action.payload._id ? action.payload : post)
    }

    case POST_TYPE.DELETE_POST : return {
      ...state,
      posts : state.posts.filter(post => post._id !== action.payload)
    }

    case POST_TYPE.POST_LOADING : return {
      ...state,
      postLoading : action.payload
    }

    default : return state 
  }
}

export default postReducer