import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../../../redux/actions/profileAction'

function Follow({ user }) {
  const [followed,setFollowed] = useState(false)

  const { auth,profile } = useSelector(state => state)
  const dispatch = useDispatch()

  // set follow 
  useEffect(() => {
    if (auth.user.following.find(item => item.username === user.username)){
      setFollowed(true)
    }
  }, [user.username, auth.user.following])

  // handle follow button -------------
  function handleFollow() {
    setFollowed(true)
    dispatch(followUser({ users : profile.users, user, auth }))
  }

  // handle un-follow button -------------
  function handleUnfollow(){
    setFollowed(false)
    dispatch(unfollowUser({ users : profile.users, user, auth }))
  }

   return (
    <>
      <div className='follow-btn mr-2' >
        {
          !followed ? 
            <button className='head-btn btn-follow' onClick={handleFollow} >Follow</button> :
            <button className='head-btn btn-follow' onClick={handleUnfollow} >Unfollow</button> 
        }
      </div> 
    </>
  )
}

export default Follow
