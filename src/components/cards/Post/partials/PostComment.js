import { Avatar, Dialog } from '@material-ui/core';
import { DeleteForeverOutlined, ModeCommentOutlined, MoreVert, SendOutlined } from '@material-ui/icons';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment, editComment, likeComment } from '../../../../redux/actions/postAction';

function PostComment({ author,comment,createdAt,commentId, post }) {
   const [open, setOpen] = useState(false);
   const [onEdit,setOnEdit] = useState(false)
   const [editVal,setEditVal] = useState(comment)
   const [isLiked,setIsLiked] = useState(false)

   const { auth } = useSelector(state => state)
   const dispatch = useDispatch()

   function handleLike(){
      dispatch(likeComment(commentId, auth))
      setIsLiked(true)
   }

   function handleSubmit(e){
      e.preventDefault()
      setOnEdit(false) 
      
      if(editVal !== comment){
        dispatch(editComment(editVal, commentId, auth))
      }
   }

   function handleDelete(){
      dispatch(deleteComment(post,commentId, auth))
   }

   return (
        <div className='single-comment' >

           <Link to={`user/${author.username}`} >
              <div className='comment-author d-flex align-items-center' >
                <Avatar src={author.avatar} />
                <span>{author.fullname}</span>
              </div>           
           </Link>

           <div className='comment' >
               {
                !onEdit ? (
                  <div className='comment-content' > 
                     <p>{editVal}</p> 
                  </div>                   
                ) : (
                  <div className='comment-edit' >
                     <form onSubmit={handleSubmit} >
                        <input value={editVal} type='text' onChange={(e) => setEditVal(e.target.value)} /> 
                        <button type='submit' > <SendOutlined/> </button>
                     </form>
                  </div>                   
                )
               }
           </div>

           <div className='comment-footer' >
              <div className='d-flex' >
                 <p className='like-count' > {moment(createdAt).fromNow()} </p>  

                 {/* <p className='add-like' >{likes?.length} likes</p>
                  
                 <p className='add-reply' >reply</p>  */}
              </div>

              <div >
                  <div className='comment-footer-like' >
                     {/* {
                       isLiked ? (
                          <Favorite/>
                       ) : (
                          <FavoriteBorderOutlined onClick={handleLike} />
                       )
                     } */}
                  </div>   

                  {auth.user._id === author._id && (
                     <>
                        <MoreVert onClick={() => setOpen(true)} />

                        <Dialog
                           open={onEdit ? false : open}
                           keepMounted
                           onClose={() => setOpen(false)}
                           className='dialog-box'
                        >
                           <ul>
                              <li className='single-config' onClick={handleDelete} ><DeleteForeverOutlined/> Delete comment</li>
                              <li className='single-config' onClick={() => setOnEdit(true)} ><ModeCommentOutlined/> Edit comment</li>
                           </ul>
                        </Dialog>                     
                     </>
                  )}

              </div>
           </div>
        </div>
    )
}

export default PostComment
