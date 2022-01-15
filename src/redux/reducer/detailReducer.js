// internal imports 
import { DETAIL_TYPE } from '../actions/detailsAction'

// set initial state
const initialState = {
  post : {},
  loading : false
}

// set reducer function
const detailReducer = (state = initialState,action) => {
  switch (action.type){
    case DETAIL_TYPE.SINGLE_POST : return {
      ...state,
      post : action.payload
    }

    case DETAIL_TYPE.LOADING : return {
      ...state,
      loading : action.payload
    }

    default : return state 
  }
}

export default detailReducer