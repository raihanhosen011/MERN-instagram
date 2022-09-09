import { IconButton } from '@material-ui/core'
import { BookmarkBorderOutlined, CommentOutlined, ShareOutlined, Bookmark } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dislikePost, likePost, savePost, unsavePost } from '../../../../redux/actions/postAction'
import AddComment from './AddComment'
import HandleLike from './HandleLike'
import PostComment from './PostComment'

function PostFooter({ post }) {
    const [cntrlComment,setCntrlComment] = useState(false)

    const [isLike,setIsLike] = useState(false)
    const [isLoad,setIsLoad] = useState(false)

    const [isSaved,setIsSaved] = useState(false)

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    
    useEffect(() => {
      post.reacts.map(react => {
        if(react._id == auth.user._id){
          return setIsLike(true)
        }
      })
    },[auth.user._id,post.reacts])

    useEffect(() => {
      auth.user.saved.map(saveId => {
        if(saveId == post._id){
          return setIsSaved(true)
        }
      })
    }, [auth.user])

   //  handle like function 
    async function likeHandler(){
      if(isLoad) return; 
      setIsLike(true)
      setIsLoad(true)
      await dispatch(likePost(post,auth,socket))
      setIsLoad(false)
    }
   

   // handle dislike function 
    async function dislikeHandler(){
      setIsLike(false)
      setIsLoad(true)
      await dispatch(dislikePost(post, auth))
      setIsLoad(false)
    }

    // handle save
    async function handleSave(){
      setIsSaved(true)
      await dispatch(savePost(post, auth))
    }

    // handle unsave
    async function handleUnSave(){
      setIsSaved(false)
      await dispatch(unsavePost(post, auth))
    }

    return (
        <div className='post-footer' >
           <div className='post-footer-counts' >
               <p>liked by <b>{post.reacts.length}</b> people</p> 
               <p>{post.comment.length} comments . 8 share</p>
           </div>     

           <div className='post-footer-icons' >
              <ul>
                <li className='thumb-icon'>
                  <HandleLike
                     isLike={isLike}
                     likeHandler={likeHandler}
                     dislikeHandler={dislikeHandler}
                  />
                </li> 

                <li> <IconButton><CommentOutlined/></IconButton> Comment</li> 
                <li> <IconButton><ShareOutlined/></IconButton> Share</li> 
                <li> {!isSaved 
                       ? <><IconButton onClick={handleSave} ><BookmarkBorderOutlined/></IconButton> save</>
                       : <><IconButton onClick={handleUnSave} ><Bookmark/></IconButton> saved</>
                     }
                </li> 
              </ul>           
           </div>

           <div className='post-footer-comments' >
              <small className='d-block mb-2' >comments</small>

                {post.comment.map(({ content,author,createdAt,_id,reacts }) => (
                  <PostComment author={author} likes={reacts} post={post} createdAt={createdAt} commentId={_id} comment={content} />  
                ))}
                
              {6 > 2 && <p onClick={() => setCntrlComment(!cntrlComment)} > {cntrlComment ? "Hide comments" : "View all comments" } </p>  }
           </div> 

           <div className='post-footer-addcomment' >
              <AddComment post={post} />      
           </div>
        </div>
    )
}

export default PostFooter
