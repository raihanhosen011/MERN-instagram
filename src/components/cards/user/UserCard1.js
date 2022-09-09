import { Avatar } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { followUser } from '../../../redux/actions/profileAction'

function UserCard1({ verify,click,user }) {
    const [followed,setFollowed] = useState(false)

    const { profile, auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    // set follow 
    useEffect(() => {
      if (auth.user.following.find(item => item.username === user?.username)){
        setFollowed(true)
      }
    }, [user?.username, auth.user.following])
  
    // handle follow button -------------
    function handleFollow() {
      setFollowed(true)
      dispatch(followUser({ users : profile.users, user, auth, socket }))
    }
    
    return (
        <>
          <div className='user-card-1 user-card-suggestion user-card-item' > 
             <div className='card-1-left' onClick={click} >
                <Link to={`/user/${user?.username}/?tab=posts`} >
                  <div className='user-profile' >
                      <Avatar src={user?.avatar} />

                      <div className='user-texts' >
                        <p className='user-texts-name' > {user?.fullname} {verify && <CheckCircle className='verified-icon' />}  </p> 
                        <span className='user-texts-username' > {user?.username} </span>
                      </div>  
                  </div>                  
                </Link>
             </div>

             <div className='card-1-right' >
                {
                  auth?.user.username === user?.username ?
                  <>
                       <a style={{color:"#606060 !important"}} > you </a>
                  </> : 

                  <>
                    {
                      !followed ? 
                        <a className='card-follow' onClick={handleFollow} > follow </a>  :
                        <a className='card-follow' > followed </a>                   
                    }   
                  </>
                }
             </div>
          </div>   
        </>
    )
}

export default UserCard1
