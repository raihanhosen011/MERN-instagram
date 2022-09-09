import React from 'react';
import { Avatar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { bytesToSize, increaseLength } from '../../../utils/mediaShow'
import { deleteMessage } from '../../../redux/actions/msgAction'

function SingleList({ me, data, user }) {
  const dispatch = useDispatch()
  const { auth, message } = useSelector( state => state)
  
  function handleSingleDelete() {
     dispatch(deleteMessage(auth, data, message))
  }

  return <>
    <li className={`chat-list ${me ? 'right' : ''}`} >
       <div className='conversation-list' >

          <div className='chat-avatar' > 
            <Avatar src={user?.avatar} />
          </div>

          <div className='user-chat-content' >
             <div className='ctext-wrap' >
                {data.type.map((type) => (
                  <>
                     { type === 'like' && <img src='/images/like.png' className='like' /> }  

                     { 
                        type === 'attachment' && 
                        data.attachment.map((data) => {
                           let size = bytesToSize(data.size)
                           let filename = increaseLength(data.name)

                           return (
                              <div className='ctext-wrap-content radius-8' >
                                 <div className='p-3 border-primary border radius-8' >
                                    <div className='d-flex align-items-center attached-file' >
            
                                       <div className='flex-shrink-0 mr-3 ml-0 attached-file-avatar' >
                                          <img src='/images/icons/attached.png' />
                                       </div>  
            
                                       <div class="flex-grow-1 overflow-hidden">
                                          <div class="text-start">
                                             <h5 class="mb-1 font-size-14 attachment-text">{filename}</h5>
                                             <p class="text-muted text-truncate font-size-13 mb-0"> {size} </p>
                                          </div>
                                       </div>
            
                                       <div className='flex-shrink-0 ml-3 pointer' >
                                          <img src='/images/icons/cloud-computing.png' />
                                       </div>
            
                                    </div>
                                 </div>
                              </div>                                
                           )}
                        )
                     }

                     {
                        type === 'images' && data.medias.length > 0 &&
                        <div className='message-img mb-2' >
                           {
                              data.medias.splice(0,2).map(media => (
                                 <div className='message-img-list' >

                                    <div>
                                      <img src={media.url} className='msg-img' /> 
                                    </div>

                                    <div className='message-img-link' >
                                      <img src='/images/icons/download.png' className='download-icon w-75 pointer' /> 
                                    </div>

                                 </div>                                    
                              ))
                           }
                        </div> 
                     }    

                     {
                        type === 'content' && 
                        <>
                           <div class="ctext-wrap-content radius-8">
                              <p class="mb-0 ctext-content"> {data.text} </p>
                           </div>                     
                        </> 
                     }
              
                  </> 
                ))}
                
             </div>

             <div className='conversation-name' >
                {!me && user.username}

                {me && <img src='/images/icons/delete.png' className='delete-icon mr-2' onClick={handleSingleDelete} />}

                <small class={`text-muted mb-0 ${me ? "mr-2" :  "ml-2"}`} > {new Date(data?.createdAt).toLocaleTimeString()} </small>

                {me && "You"}
             </div> 
          </div>

       </div> 
    </li>
  </>;
}

export default SingleList;
