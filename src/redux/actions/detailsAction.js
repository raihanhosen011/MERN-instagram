// INTERNAL IMPORTS
import { getData } from '../../utils/fetchData'
import { GLOBALTYPES } from './globalTypes'

// DETAIL TYPES
export const DETAIL_TYPE = {
  SINGLE_POST: "SINGLE_POST",
  LOADING : "LOADING"
}

// GET DATA FUNCTIONS
export const getSinglePost = (id,token) => async (dispatch) => {
  try {
    dispatch({ type:DETAIL_TYPE.LOADING, payload: true })

    // get data using axios
    const res = await getData(`posts/${id}`, token)

    // send data to redux
    dispatch({type: DETAIL_TYPE.SINGLE_POST, payload: res.data})

    dispatch({ type:DETAIL_TYPE.LOADING, payload: false })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors:{
          common : {
            msg :  err.message
          }
        }
      },
    });
  }
}
