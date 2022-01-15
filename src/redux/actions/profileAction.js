import { getData, patchData } from '../../utils/fetchData';
import { uploadImage } from '../../utils/uploadImage';
import { GLOBALTYPES } from './globalTypes';

// ============= REDUX PROFILE ACTION TYPE =============
export const PROFILE_TYPE = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW:"FOLLOW",
  UN_FOLLOW:"UN_FOLLOW",
  GET_POST:"GET_POST"
};


// ============= GET USER =============
export const getUser = (username,token) => async (dispatch) => {
  try {
    // LOADING START
    dispatch({ type:PROFILE_TYPE.LOADING, payload: true })

    // USER DATA
    const res = await getData(`user/${username}`, token);
    const user = res.data

    // SEND USER DATA TO REDUX
    dispatch({ type:PROFILE_TYPE.GET_USER, payload: user })

    // LOADING OFF
    dispatch({ type:PROFILE_TYPE.LOADING, payload: false })

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        err: err.message,
      },
    });
  }
};


// ============= GET USER =============
export const getUserPosts = (username,token) => async (dispatch) => {
  try {
    // LOADING START
    dispatch({ type:PROFILE_TYPE.LOADING, payload: true })

    // USER POSTS 
    const res = await getData(`user-post/${username}`, token)
    const posts = res.data

    // SEND USER POSTS TO REDUX
    dispatch({ type:PROFILE_TYPE.GET_POST, payload: posts })

    // LOADING OFF
    dispatch({ type:PROFILE_TYPE.LOADING, payload: false })

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        err: err.message,
      },
    });
  }
};


// ============= UPDATE USER =============
export const updateUser = (userData,avatar,auth) => async (dispatch) => {
  try {
    // LOADING START
    dispatch({ type : GLOBALTYPES.ALERT , payload : {loading : true}})

    let avatarUrl = []
    if(avatar.length > 0){
      avatarUrl = await uploadImage(avatar)
    }

    const newUserData = {
      ...userData,
      avatar : avatarUrl.length > 0 ? avatarUrl[0].url : auth.user.avatar
    }

    // PATCH DATA
    await patchData('user', newUserData, auth.token)

    // SAVE DATA IN REDUX 
    dispatch({
      type : GLOBALTYPES.AUTH,
      payload : {
        ...auth,
        user : {
          ...auth.user,...userData
        }
      }
    })

    // SUCCESS MESSAGE
    dispatch({
      type : GLOBALTYPES.ALERT,
      payload : { success : "Successfully update"}
    })

    // LOADING OFF
    dispatch({ type : GLOBALTYPES.ALERT , payload : {loading : false}})

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        err: err.message,
      },
    });
  }
};


// ============= FOLLOW USER =============
export const followUser = ({ users,user,auth }) => async (dispatch) => {
  const newUser = {...user,followers:[...user.followers, auth.user]}

  // SAVE FOLLOWERS
  dispatch({ type : PROFILE_TYPE.FOLLOW, payload : newUser })

  // SAVE FOLLOWING 
  dispatch({ type : GLOBALTYPES.AUTH, payload : {...auth,user:{...auth.user, following : [...auth.user.following, newUser]}} })

  try {
    await patchData(`/user/${user.username}/follow`,null,auth.token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        err: err.message,
      },
    });
  }
};


// ============= UN-FOLLOW USER =============
export const unfollowUser = ({ users,user,auth }) => async (dispatch) => {
  const newUser = {...user,followers:user.followers.filter(item => item.username != auth.user.username)}

  // SAVE FOLLOWERS
  dispatch({ type : PROFILE_TYPE.UN_FOLLOW, payload : newUser })

  // SAVE FOLLOWING 
  dispatch({ type : GLOBALTYPES.AUTH, payload : {...auth,user:{...auth.user, following : auth.user.following.filter(item => item.username != newUser.username)}} })

  try {
    await patchData(`/user/${user.username}/unfollow`,null, auth.token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        err: err.message,
      },
    });
  }
}