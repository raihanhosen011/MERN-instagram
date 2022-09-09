import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import Avatar from '../../../components/cards/Avatar'
import { getData } from '../../../utils/fetchData'
import { addUser, getConversation } from '../../../redux/actions/msgAction'

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function Users() {
   const [search, setSearch] = useState('')  
   const [users, setUsers] = useState([])
   const [load,setLoad] = useState(false)
   
   const history = useHistory()

   const { auth, message } = useSelector(state => state)
   const dispatch = useDispatch()

   function handleAdd(user) {      
      setSearch('')
      setUsers([])
      
      if (message.users.every(findUser => findUser._id != user._id)) {
         dispatch(addUser(user, auth))
      }
      
      return history.push(`/message/${user._id}`)
   }

   useEffect(async () => {
      if (search) {
        setLoad(true)
        const users = await getData(`search-user?username=${search}`)
        setUsers(users.data.users)
        setLoad(false)
      }  
   },[search])

   useEffect(() => {
      if (message.firstLoad) return; 
      dispatch(getConversation(auth))
   }, [dispatch, auth, message.firstLoad])
   
   return <>
    <div className='message-users' >
       <div className='chat-leftsidebar' >
          <div >
             <div role="tabpanel" aria-labelledby="pills-chat-tab" >
                <div>
                   
                    <div className='px-4 pt-4' >
                        <div className='d-flex align-items-center justify-content-between mb-3' >
                            <div className="flex-grow-1"> <h3>Chats</h3> </div>

                            <div className='flex-shrink-0 pointer' > <img src='/images/icons/chat-1.png' /> </div>
                        </div>

                        <form className="" >
                          <div className="input-group mb-3">
                            <input type="text" onChange={(e) => setSearch(e.target.value)} className="form-control bg-light border-0 pr-0" placeholder="Search here.." aria-label="Example text with button addon" aria-describedby="searchbtn-addon" />
                          </div>
                        </form>
                    </div>


                    <div data-simplebar="init" className='chat-room-list' >
                       <div className='chat-message-list' >
                          <ul className='list-unstyled chat-list chat-user-list' >

                             {
                               search.length > 0 ? 

                                 <>
                                   {
                                     load ? 
                                       <img src='/images/gif/loading.gif' /> :
                                       <>
                                         {
                                           users.length > 0 ?
                                           <>
                                            {
                                              users.map((user) => 
                                                <li className='list-item' onClick={() => handleAdd(user)} >
                                                   <div className='user-profile d-flex mb-0' >
                                                      <Avatar src={user?.avatar} />

                                                      <div className='user-texts ml-1' >
                                                         <p className='user-texts-name ' > { user?.fullname } </p> 
                                                         <span className='user-texts-username' > {user?.username} </span>
                                                      </div>  
                                                   </div>    
                                                </li>                                              
                                              ) 
                                            }
                                           </> :
                                           <>
                                             <div className='no-user' > 
                                                <img src='/images/gif/crying.gif' alt='crying gif' /> 
                                                <h4> Oops, sorry bro. There is no user by the name "<strong>{search}</strong>" </h4>
                                             </div>
                                           </>
                                         }  
                                       </>
                                   }  

                                 </>

                                 :

                                 <>
                                   {
                                     message.users.length > 0 ? 
                                       <>
                                         {message.users.map((user) => 
                                            <li className='list-item' >
                                                <Link to={`/message/${user?._id}`} >
                                                   <div className='d-flex align-items-center pl-3' >

                                                      <div className='mr-2' >
                                                         <Avatar src={user?.avatar} />
                                                      </div>  

                                                      <div class="overflow-hidden">
                                                         <p class="text-truncate mb-0"> {user?.fullname} </p>
                                                         <span className='text-grey font-350' > {user?.text} </span>
                                                      </div>

                                                   </div>
                                                </Link> 
                                             </li>
                                          )} 
                                       </> :
                                       <>
                                          <div className='add-user text-center' >
                                             <div>
                                                <img src='/images/gif/search.gif' alt='Search gif' />
                                             </div>
                                             
                                             <h4> Search and add your partner </h4>
                                          </div> 
                                       </>
                                   } 
                                 </>
                             }       

                          </ul>   
                       </div>
                    </div>

                </div> 
             </div>
          </div>
       </div>
    </div>
  </>;
}

export default Users;
