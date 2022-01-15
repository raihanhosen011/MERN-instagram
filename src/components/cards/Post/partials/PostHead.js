import { Avatar, Dialog } from '@material-ui/core';
import { FileCopyOutlined, MoreVert, PlaylistAddCheckOutlined } from '@material-ui/icons';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function PostHead({ post }) {
    const [open, setOpen] = useState(false);
    const [captionToggle,setCaptionToggle] = useState(false)
    
    const { auth } = useSelector(state => state)

    return (
        <>
          <div className='post-head' >
            <div className='post-head-top mb-2' > 
               <div className='user-info left' >
                  <Avatar src={post.user[0].avatar} />

                  <div className='user-info-texts ml-2' >
                     <Link to={`/user/${post.user[0].username}/?tab=posts`} className='user-texts-name' > {post.user[0].fullname} </Link> 
                     <small className='user-texts-date' >{moment(post.createdAt).fromNow()}</small>
                  </div>     
               </div> 
               
               <div className='user-config right' >
                  <MoreVert onClick={() => setOpen(true)} />

                  <Dialog
                     open={open}
                     keepMounted
                     onClose={() => setOpen(false)}
                     className='dialog-box'
                  >
                     
                     <ul>
                        {auth.user._id === post.user._id && (
                           <>
                              <li className='single-config' > <FileCopyOutlined/> Edit post </li> 
                              <li className='single-config' > <FileCopyOutlined/> Delete post </li>                             
                           </>
                          )  
                        }
                        <li className='single-config' > <FileCopyOutlined/> copy link </li> 
                        <li className='single-config' > <PlaylistAddCheckOutlined/> Follow <small>(follow this user)</small> </li> 
                     </ul>

                  </Dialog>
               </div>              
            </div> 


            <div className='post-head-bottom' > 
               <div className='post-caption' >
                  <p className={`${!captionToggle && 'clamp-2'} ${post.content.length < 150 && 'h3'}`} > {post.content.length > 190 && !captionToggle ? post.content.substring(0,190) : post.content } </p>

                  <span className='show-more' onClick={() => setCaptionToggle(!captionToggle)} > {post.content.length > 190 ? captionToggle ? 'Hide content' : 'Show more' : ''} </span>
               </div>
            </div>
          </div>   
        </>
    )
}

export default PostHead
