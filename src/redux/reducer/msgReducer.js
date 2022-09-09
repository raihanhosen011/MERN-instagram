// internal imports 
import { MSG_ACTION } from '../actions/msgAction'

// set initial state
const initialState = {
  users : [],
  userResult : 0,
  data : [],
  dataResult : 0,
  firstLoad : false
}


// set reducer function
const msgReducer = (state = initialState,action) => {
  switch(action.type){
      case MSG_ACTION.ADD_USER : return {
        ...state,
        users : [ action.payload,...state.users ]
      }

      case MSG_ACTION.ADD_MESSAGE : return {
        ...state,
        data : [ ...state.data, action.payload ],
        users : state.users.map(user => 
          
          user._id === action.payload.recipient || user._id === action.payload.sender 
          ? {
              ...user, 
              text: action.payload.text
            }
          : user

        )
      }

      case MSG_ACTION.GET_CONVERSATION : return {
        ...state,
        users : action.payload.newArr,
        userResult : action.payload.result
      }

      
      case MSG_ACTION.GET_MESSAGES : return {
        ...state,
        data : action.payload
      }


      case MSG_ACTION.DELETE_CONVERSATION : return {
        ...state,
        data : [],
        users : state.users.filter(user => user._id !== action.payload)
      }

      default : return state
  }
}

export default msgReducer