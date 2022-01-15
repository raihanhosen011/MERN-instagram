import { deleteData, postData } from '../../utils/fetchData'
import { validator } from '../../utils/validator'
import { GLOBALTYPES } from './globalTypes'

// ============ LOGIN ============
export const login =  (data) => async (dispatch) => {
  try {
    // dispatch notification
    dispatch({ type : GLOBALTYPES.ALERT , payload : {loading : true}})
    // get login data    
    const res = await postData('login',data)
    localStorage.setItem("firstLogin",true)
    
    // dispatch user data 
    dispatch({
      type : GLOBALTYPES.AUTH,
      payload : {
        token : res.data.token,
        user : res.data.user
      }
    })

    // notify if successfully login 
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        success : res.data.msg
      }
    })

  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}

// ============ REGISTRATION ============
export const registration = (data) => async (dispatch) => {

  // check all input data is valid
  const valid = validator(data)
  if (valid.errLength > 0){
    return  dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : valid.errMsg
      }
    })
  }

  try {
    // dispatch notification
    dispatch({ type : GLOBALTYPES.ALERT , payload : {loading : true}})
    
    // get registration data    
    const res = await postData('register',data)

    localStorage.setItem("firstLogin",true)

    // dispatch user data 
    dispatch({
      type : GLOBALTYPES.AUTH,
      payload : {
        token : res.data.token,
        user : res.data.user
      }
    })

    // notify if successfully login 
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        success : res.data.msg
      }
    })
  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
} 

// ============== LOGOUT =================
export const logout = () => async (dispatch) => {
  try {
    // dispatch notification
    dispatch({ type : GLOBALTYPES.ALERT , payload : {loading : true}})
      
    localStorage.removeItem("firstLogin")
    await deleteData('logout')
    
    // dispatch user data 
    dispatch({ type : GLOBALTYPES.AUTH,  payload : {} })

    // clear alert data
    dispatch({ type : GLOBALTYPES.ALERT , payload : {}})
      
  } catch (err) {
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : {
        err : err.message
      }
    })
  }
}