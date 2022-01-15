import { Dialog, IconButton, LinearProgress } from '@material-ui/core';
import { AddBoxOutlined, BrokenImageOutlined, InsertEmoticonOutlined, VideoCallOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { createPost } from '../../../redux/actions/postAction';

const CreatePost = () => {
   const [open, setOpen] = useState(false);
   const [isSuccess,setIsSuccess] = useState(false)
   
   const [images,setImages] = useState([])
   const [content,setContent] = useState('')
   
   const { auth, posts } = useSelector(state => state)
   const dispatch = useDispatch()

   // handle file
   const fileHandler = (e) => {
      const files = [...e.target.files]
      let err = ""
      const imgArray = []
      
      files.forEach(file => {
         if (!file) {
            return err = "File does not exist."
         } 
         
         if (file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/jpeg'){
            return err = "This format is not supported. only support (jpg,png or jpeg)"
         }

         if(file.size > 1024 * 1024 * 5){
            return err = "The image/video largest is 5mb."
         }

         return imgArray.push(file)
      })

      if(err) dispatch({ type:GLOBALTYPES.ALERT, payload : {err : {common : {  msg : err}}} })
      setImages([...images, ...imgArray])  
   }  

   // handle submit
   function handleSubmit(e){
      e.preventDefault()
      dispatch(createPost(content, images, auth, setIsSuccess)) // send all data to createPost function
   }

   // handle click 
   function handleClick() {
      setIsSuccess(false)
      setContent("")
      setImages([])
      setOpen(false)
   }

    return (
          <>   
             <IconButton onClick={() => setOpen(true)} > <AddBoxOutlined/> </IconButton>

             <Dialog
               open={open}
               keepMounted
               onClose={() => setOpen(false)}
               className='dialog-box'
             > 
               {
                  isSuccess ? (
                     <div className='after-post' >
                        <img src='/images/gif/success-status.gif' alt='' />

                        <div className='after-post-content' >
                           <h3 className='after-post-text' > Successfully posted </h3>
                           <div onClick={() => handleClick} >
                              <Link to='/' className='button after-post-btn' > See posts </Link>   
                           </div>                  
                        </div>
                     </div>                     
                  ) : (
                     <div className='create-post-content' >
                        <div className='loading-progresbar' >
                           {posts.createLoading && <LinearProgress/>}
                        </div>
                        
                        <div className='post-content-head' >
                           <h4>Create post</h4>
                        </div>

                        <div className='post-content-body' >
                           <form onSubmit={handleSubmit} >
                              <textarea name='post-desc' placeholder="What's your mind." onChange={e => setContent(e.target.value)} className='post-desc' />

                              <div className='post-content-images' >
                                 {
                                 images.length > 0 && images.map(_ => <img src={URL.createObjectURL(_)} />) 
                                 }
                              </div>

                              <div className='post-icons' >
                                 <div className='post-icons-left' >
                                    <p>#HashTag</p>
                                 </div>

                                 <div className='post-icons-right' >
                                    <IconButton className='post-video post-file' >
                                       <VideoCallOutlined className='video-icon' />
                                       <input type='file' name='videos' accept='video/*' onChange={fileHandler} />
                                    </IconButton>
                                    
                                    <IconButton className='post-img post-file' >
                                       <BrokenImageOutlined className='img-icon' />
                                       <input type='file' name='images' accept='image/*' multiple onChange={fileHandler}  />
                                    </IconButton>
                                    
                                    <IconButton className='post-emoji post-file' >
                                       <InsertEmoticonOutlined className='emoji-icon' /> 
                                    </IconButton>
                                 </div>
                              </div>   

                              <button type='submit' className='post-button button' disabled={images.length === 0 && content.length < 10 ? true : false} >post</button>                     
                           </form>
                        </div>
                     </div>
                  )
               }
             </Dialog>   
          </>    
    )
}

export default CreatePost
