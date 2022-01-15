import { Dialog } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditProfile from './EditProfile';
import Follow from './Follow';
import ProfileInfoFooter from './ProfileInfoFooter';

function ProfileInfo() {
   const [open, setOpen] = useState(false);
   const [user,setUser] = useState([])

   const { username } = useParams()

   const { auth, profile } = useSelector(state => state)

   useEffect(() => {
      if (auth?.user.username == username) {
        setUser([auth.user])
      }else{
         const userData = profile.users.filter(user => user.username == username)
         setUser(userData)
      }
   }, [username,auth,profile.users])

    return (
        <div className='profile-left-side profile-info radius shadow' >
           {
             user?.map(({fullname,username,profession,bio,website,followers,following,avatar,address}) => (
               <>
                  <div className='profile-info-avatar' >
                     <img src={avatar} alt='user avatar' />  
                  </div> 

                  <div className='profile-info-texts' >
                     <div className='info-texts-head' >
                        <h4 className='info-text-fullname' > {fullname} </h4> 
                        <p className='info-text-username' > {username} </p> 
                        <p className='info-text-profession' > {profession} </p> 

                        <div className='text-head-btns' >
                        {
                           auth.user.username === username ? (
                              <div className='head-btns-admin' >
                                 <button className='head-btn btn-update' onClick={() => setOpen(true)} > Update profile </button> 
                                 <button className='head-btn' > messenger </button>  
                              </div> 
                           ) : (
                              <div className='head-btns-user' >
                                 <Follow user={user[0]} />
                                 <button className='head-btn' >Message</button> 
                                 <button className='head-btn' >Email</button>                        
                              </div>                           
                           )
                        } 
                        </div>
                     </div> 

                     <div className='info-texts-body' >
                        <p className='text-head-address' > {address}</p>

                        <p className='text-head-bio' > {bio} </p> 

                        <a href={`https://${website}`} target='_blank' className='text-head-website' > {website} </a>  
                     </div> 

                     <div className='info-texts-footer' >
                        <ProfileInfoFooter followers={followers} following={following} />
                     </div> 
                  </div>     
               </> 
             ))
           }

           <div className='edit-profile' >
             <Dialog
               open={open}
               keepMounted
               onClose={() => setOpen(false)}
               className='dialog-box'
              >
                 <EditProfile setOpen={setOpen} user={auth.user} />
              </Dialog>             
           </div>          
        </div>
    )
}

export default ProfileInfo
