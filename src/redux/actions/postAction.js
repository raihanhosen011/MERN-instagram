import { deleteData, getData, patchData, postData } from '../../utils/fetchData'
import { uploadImage } from '../../utils/uploadImage'
import { GLOBALTYPES } from './globalTypes'

// POST TYPES
export const POST_TYPE = {
  CREATEPOST : "CREATEPOST",
  CREATE_LOADING: "CREATE_LOADING",
  POST_LOADING: "POST_LOADING",
  GET_POST: "GET_POST",
  UPDATE_POST: "UPDATE_POST"
} 

// POST DATA FUNCTIONS
export const createPost = (content,images,auth,setIsSuccess) => async (dispatch) => {
  let imagesUrl = []

  try {
    dispatch({ type : POST_TYPE.CREATE_LOADING, payload : true })
    // upload images 
    if (images.length > 0) {
      imagesUrl = await uploadImage(images)
    }

    // post data using axios
    const res = await postData("post", { content,images : [ ...imagesUrl ] }, auth.token)

    // save data in reducer 
    dispatch({ type : POST_TYPE.CREATEPOST, payload : {...res.data.post, user : [auth.user] } })

    dispatch({ type : POST_TYPE.CREATE_LOADING, payload : false })
    setIsSuccess(true) // set success state true

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

// GET DATA FUNCTIONS
export const getPosts = (auth) => async (dispatch) => {
  try {
    dispatch({ type:POST_TYPE.POST_LOADING, payload: true })

    // get data using axios
    const res = await getData('post', auth.token)

    // send data to redux
    dispatch({type: POST_TYPE.GET_POST, payload: res.data})

    dispatch({ type:POST_TYPE.POST_LOADING, payload: false })
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

// LIKE ON POST
export const likePost = (post,auth) => async (dispatch) => {
  const newPost = {...post,reacts:[auth.user,...post.reacts]}
 
  dispatch({ type: POST_TYPE.UPDATE_POST, payload : newPost }) 
  try {  
    await patchData(`/post/${post._id}/react`,null,auth.token)
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

// DISLIKE ON POST
export const dislikePost = (post,auth) => async (dispatch) => {
  const newPost = {...post,reacts:[...post.reacts.filter(react => react._id != auth.user._id)]}
 
  dispatch({ type: POST_TYPE.UPDATE_POST, payload : newPost }) 
  try {  
    await patchData(`/post/${post._id}/disreact`,null,auth.token)
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

// CREATE COMMENT
export const createComment = (auth,post,newComment) => async (dispatch) => {
  const newPost = {...post, comment:[...post.comment, newComment] }
  dispatch({ type: POST_TYPE.UPDATE_POST, payload : newPost }) 

  try {  
    const data = {...newComment, postId: post._id}
    const res = await postData('comment', data, auth.token)
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

// EDIT COMMENT 
export const editComment = (editVal, commentId, auth) => async (dispatch) => {
  try {  
    await patchData(`/edit-comment/${commentId}`,{editVal} ,auth.token)
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

// DELETE COMMENT 
export const deleteComment = (post, commentId, auth) => async (dispatch) => {
  const newPost = {...post, comment:[...post.comment.filter(({ _id }) => _id !== commentId)] }
  dispatch({ type: POST_TYPE.UPDATE_POST, payload : newPost }) 

  try {  
    await deleteData(`/delete-comment/${commentId}` ,auth.token)
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

// LIKE COMMENT
export const likeComment = (commentId, auth) => async (dispatch) => {
  try {  
    await patchData(`/like-comment/${commentId}`, null, auth.token)
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