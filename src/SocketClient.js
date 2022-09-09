import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NOTIFICATION_ACTION } from './redux/actions/notificationAction'
import { MSG_ACTION } from './redux/actions/msgAction'
import { POST_TYPE } from './redux/actions/postAction'

function SocketClient() {
  const { auth, socket, notificaiton  } = useSelector(state => state)  
  const dispatch = useDispatch()
  
  // JOIN USER
  useEffect(() => {
    socket.emit("joinUser", auth.user._id)
  }, [socket, auth.user._id])
  

  // LIKES
  useEffect(() => {
    socket.on("likeToClient", (post) => {
      dispatch({ type:POST_TYPE.UPDATE_POST, payload : post})
    })

    return () => socket.off('likeToClient')
  }, [socket])


  // CREATE COMMENT
  useEffect(() => {
    socket.on("commentToClient", (post) => {
      dispatch({ type:POST_TYPE.UPDATE_POST, payload : post})
    })

    return () => socket.off('commentToClient')
  }, [socket])


  // CREATE NOTIFICATION
  useEffect(() => {
    socket.on("notificationToClient", (data) => {
       dispatch({ type: NOTIFICATION_ACTION.GET_NOTIFICATION, payload: [data] })
    })

    return () => socket.off("notificationToClient")
  }, [socket])


  // MESSAGE
  useEffect(() => {
    socket.on('messageToClient', msg => {
      dispatch({ type : MSG_ACTION.ADD_MESSAGE, payload : msg })
    })

    return () => socket.off("messageToClient")
  }, [socket])

  return <></>;
}

export default SocketClient