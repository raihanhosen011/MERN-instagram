import { Avatar } from '@material-ui/core'
import { SendOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../../redux/actions/postAction'

function AddComment({ post }) {
    const [content,setContent] = useState('')

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    function handleSubmit(e){
      e.preventDefault()
      
      const newComment = {
        content : content,
        reacts : [],
        author : auth.user
      }
      
      dispatch(createComment(auth,post,newComment))
      setContent("")  
    }

    return (
        <div className='d-flex addcomment-content' >
            <Avatar/>    

            <form onSubmit={handleSubmit} >
              <input placeholder='write comment...' name='comment' value={content} onChange={(e) => setContent(e.target.value)} />
              <button type='submit' > <SendOutlined/> </button>
            </form>
        </div>
    )
}

export default AddComment