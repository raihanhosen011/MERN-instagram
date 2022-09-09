import React, {useState} from 'react';
import { Avatar, IconButton } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { isReadNotify } from '../../../redux/actions/notificationAction'

const Notification = () => {
  const [open, setOpen] = useState(false)  

  const { notificaiton, auth } = useSelector(state => state)
  const dispatch = useDispatch()
  
  const notification = notificaiton.notification

  function handleIsRead(msg){
    dispatch(isReadNotify(msg, auth))  
  }

  return <>
    <div className='notification' >
        <div className='notification-icon' >
            {notification.length > 0 && <div className='notification-length' > {notification.length > 9 ? "9+" : notification.length} </div>}

            <img onClick={() => setOpen(!open)} src='./images/icons/bellicon.png' alt='bell icon' />  
        </div>

        <div className={`notification-modal ${open ? "openModal" : "closeModal"}`} >
            {
              notification.length === 0 ? 
                <div className='my-2 text-center' >
                    <img src='./images/icons/no_notification.png' className='m-auto' />

                   <h2 className='text-normal mb-1' > No notification yet </h2>
                   <p className='text-grey' > When you get notifications, they'll show up here </p>  
                </div>  
                  :
                <>
                    <p className='text-center' > Notifications </p>
                    <hr className='mt-2 mb-3' />   

                    {
                        notification?.map((msg, index) => (
                            <Link key={index} to={msg.url} onClick={() => handleIsRead(msg)} >
                                <div className={`single-notification d-flex align-items-center ${msg.isRead ? "read" : "unread"}`} >
                                    <Link to={`/user/${msg.user.username}`} >
                                        {msg.type === "post" && <Avatar className='mr-2' src={msg.user.avatar} />}
                                        {msg.type === "like" && <Avatar className='mr-2' src='./images/gif/ppp-vote.gif' />}
                                        {msg.type === "comment" && <Avatar className='mr-2' src='./images/gif/comment.gif' />}
                                        {msg.type === "follow" && <Avatar className='mr-2' src={msg.user.avatar} />}
                                    </Link>

                                    <div className='notification-content' >
                                        <p> <strong> {msg.user.fullname} </strong>  {msg.text} </p>

                                        <div className='d-flex justify-content-between' >
                                           <p className='notification-desc mr-2' > {msg.content} </p> 
                                           <small className='notification-moment' > {moment(msg.createdAt).fromNow()} </small> 
                                        </div>
                                    </div>  
                                </div>                  
                            </Link>  
                        ))  
                    }                
                </>  
            }

        </div>
    </div>
  </>;
};

export default Notification;
