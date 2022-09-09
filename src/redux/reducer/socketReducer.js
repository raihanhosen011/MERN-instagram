// internal imports 
import { GLOBALTYPES } from '../actions/globalTypes'

// set initial state
const initialState = {}

// set reducer function
const alertAction = (state = initialState,action) => {
  switch(action.type){
      case GLOBALTYPES.SOCKET : return action.payload
    
      default : return state
  }
}

export default alertAction