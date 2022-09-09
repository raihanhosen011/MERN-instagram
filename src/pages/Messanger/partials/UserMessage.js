import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addConversation, deleteConversation, getMessage } from '../../../redux/actions/msgAction';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';

import Avatar from '../../../components/cards/Avatar'
import SingleList from './SingleList';
import { ImgShow, VideoShow, attachmentShow } from '../../../utils/mediaShow'

function UserMessage() {
  const [user, setUser] = useState()
  const [text, setText] = useState('')

  const [images,setImages] = useState([])
  const [attachment,setAttachment] = useState([])
  
  const [allowedAttch, setAllowedAttch] = useState('application/octet-stream, application/x-zip-compressed, application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  const [type, setType] = useState([]) 

  const { auth, message, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  const history = useHistory()

  const { id } = useParams()

  // handle media upload
  function handleMedia(e) {
      const files = [...e.target.files]
      let err = ""
      const imgArray = []
      
      files.forEach(file => {
         if (!file) {
            return err = "File does not exist."
         } 
         
         if(file.size > 1024 * 1024 * 5){
            return err = "The image/video largest is 5mb."
         }

         return imgArray.push(file)
      })

      if(err) dispatch({ type:GLOBALTYPES.ALERT, payload : {err : {common : {  msg : err}}} })
      setImages([...images, ...imgArray])  
  }


  // handle attachment upload 
  function handleAttachment(e) {
      const files = [...e.target.files]
      let err = ""
      const attachmentArray = []
      
      files.forEach(file => {
         if (!file) {
            return err = "File does not exist."
         } 
         
         if(file.size > 1024 * 1024 * 25){
            return err = "The attachment largest is 25mb."
         }

         return attachmentArray.push(file)
      })

      if(err) dispatch({ type:GLOBALTYPES.ALERT, payload : {err : {common : {  msg : err}}} })
      setAttachment([...attachment, ...attachmentArray])  
  }


  // handle submit 
  async function handleSubmit(e){   
     e.preventDefault()
     
     const msg = {
        sender : auth.user._id,
        recipient : id,
        text,
        type,
        images,
        attachment,
        createdAt : new Date().toISOString()
     }

     text.length > 0 && type.push('content')
     images.length > 0 && type.push('images')
     attachment.length > 0 && type.push('attachment')

     dispatch(addConversation(msg, auth, socket))

     setImages([])
     setText('')
     setAttachment([])
   }


   function handleDeleteConversation(){
      dispatch(deleteConversation(auth, id))
      history.push('/message/users')
   }

  useEffect(() => {
    const newUser = message.users.find(findUser => findUser._id === id)
    if(newUser){
      setUser(newUser)
    }
  }, [message.user, id])

  
  useEffect(async () => {
    if (id) {
      dispatch(getMessage(auth, id))
    }
  }, [id])

  return <>
    <div className='user-messages' >
       <div className='user-chat-show' >
          <div className='chat-content' >
             <div className='w-100 overflow-hidden position-relative' >

                <div className='user-chat-topbar px-4 py-2' > 
                   <div className='d-flex align-items-center justify-content-between' >

                      <div >
                          <div className='d-flex align-items-center' >
                            <div className='flex-grow-1 overflow-hidden' >
                                {
                                  user && 
                                    <Link to='user' className='d-flex align-items-center' >
                                        <div className='flex-shrink-0 chat-user-img align-self-center mr-2 ml-0 online' >
                                          <Avatar isOnline={true} src={user.avatar} /> 
                                        </div>

                                        <div class="flex-grow-1 overflow-hidden">
                                           <h3 class="text-truncate mb-0"> {user.fullname} </h3>
                                             
                                           <p class="text-truncate text-muted mb-0"><small>Active</small></p>
                                        </div>                                   
                                    </Link>  
                                }
                            </div>
                          </div> 
                      </div>

                      <div >
                         <ul class="list-inline user-chat-nav text-end mb-0">
                       
                            <li className='list-inline-item d-none d-lg-inline-block mr-3 ml-0' >
                               <img src='/images/icons/call.png' alt='Call icon' /> 
                            </li>
                       
                            <li className='list-inline-item d-none d-lg-inline-block mr-3 ml-0' >
                               <img src='/images/icons/camera.png' alt='Camera icon' /> 
                            </li>
                       
                            <li className='list-inline-item d-none d-lg-inline-block ml-0' onClick={handleDeleteConversation} >
                               <img src='/images/icons/delete.png' alt='Delete icon' /> 
                            </li>

                         </ul>
                      </div>

                   </div>  
                </div>


                <div className='chat-conversation px-4 py-2 positin-relative' >                
                   <div className='simplebar-wrapper' >
                     <div className='simplebar-mask' >
                        <div className='simplebar-offset w-100' style={{ right: "0px", bottom: "0px" }} >
                           <div className='simplebar-content-wrapper' tabindex="0" role="region" aria-label="scrollable content" style={{height: "100%", overflow: "auto"}} >
                              <div className='simplebar-content' >

                                 <ul className='list-unstyled chat-conversation-list' id='chat-conversation-list' >
                                    {
                                       message.data.map(data => (
                                          <SingleList data={data} user={data.sender === auth.user._id ? auth.user : user} me={data.sender === auth.user._id && true} />
                                       ))
                                    }
                                 </ul>

                              </div>
                           </div>
                        </div> 
                     </div>
                   </div>
                </div>


                <div className='chat-input-section position-relative px-4 py-2' >
                   <div className='post-content-files d-flex' >
                     {images.length > 0 && images.map(_ => _.type.match(/video/i) ? VideoShow(_,setImages,images) : ImgShow(_,setImages,images) ) }
                     {attachment.length > 0 && attachment.map(_ => attachmentShow(_, setAttachment, attachment))}
                   </div>
                   
                   <form id='chatinput-form' onSubmit={handleSubmit} >
                      <div className='row g-0 align-items-center' >

                         <div className='col-auto' >
                            <div className='chat-input-links ' >

                               <div className='links-list-item mr-3 post-file' >
                                  <img src='/images/icons/attached.png' /> 
                                  <input type='file' onChange={handleAttachment}  accept={allowedAttch} name='attachment' multiple />
                               </div>

                               <div className='links-list-item mr-3 post-file' >
                                  <img src='/images/icons/top-up.png' /> 
                                  <input type='file' accept="image/*, video/*" onChange={handleMedia} name='images' multiple />
                               </div>

                               <div className='links-list-item mr-3' >
                                  <img src='/images/icons/microphone.png' /> 
                               </div>

                               <div className='links-list-item' >
                                  <img src='/images/icons/winking.png' /> 
                               </div>

                            </div> 
                         </div>

                         <div className='col' >
                            <div className='position-relative' >
                              <input id="chat-input" placeholder="Type your message..." value={text} onChange={(e) => setText(e.target.value)} autocomplete="off" type="text" class="form-control form-control-md chat-input form-control" />
                            </div> 
                         </div>
                         
                         <div className='col-auto' >
                            <div className='chat-input-links ' >

                              {
                                text.length > 0 || images.length > 0 ?
                                  <button type='submit' className='links-list-item' onClick={() => setType([])} >
                                     <img src='/images/icons/send.png' />  
                                  </button> 
                                    :
                                  <button type='submit' className='links-list-item' onClick={() => setType(['like'])} >
                                     <img src='/images/icons/like.png' /> 
                                  </button>
                              }

                            </div>
                         </div>

                      </div>
                   </form> 
                </div>

             </div>
          </div>            
       </div> 
    </div>
  </>;
}

 export default UserMessage;
                                                                                 