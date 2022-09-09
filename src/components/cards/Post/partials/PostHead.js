import { Avatar, Dialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DeleteOutline, FileCopyOutlined, MoreVert, PlaylistAddCheckOutlined } from '@material-ui/icons';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../../../redux/actions/postAction';

function PostHead({ post }) {
    const [open, setOpen] = useState(false);
    const [openDelPopup, setOpenDelPopup] = useState(false);
    const [captionToggle,setCaptionToggle] = useState(false)

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()  
    
    async function handleDelete() {
      await dispatch(deletePost(post, auth))
      setOpen(false)
      setOpenDelPopup(false)
    }
    
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
                        {auth.user._id === post.user[0]._id && (
                           <>
                              <li className='single-config' onClick={() => setOpenDelPopup(true)} > <DeleteOutline/> Delete post </li>                             
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

          <div className='post-popups' >
             {/* DELETE POPUP */}
               <Dialog
                  open={openDelPopup}
                  keepMounted
                  onClose={() => setOpenDelPopup(false)}
                  className='dialog-box'
               >
                     <DialogTitle id="alert-dialog-title"> Delete post? </DialogTitle>

                     <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                           Are you sure you want to permanently remove this post from Fakegram?
                        </DialogContentText>
                     </DialogContent>
                     
                     <DialogActions>
                        <Button onClick={() => setOpenDelPopup(false)} color="primary">
                           cancel
                        </Button>
                        <Button onClick={handleDelete} variant="contained" color="primary" autoFocus>
                           delete
                        </Button>
                     </DialogActions>
               </Dialog>
          </div>
        </>
    )
}

export default PostHead
