import { CloseOutlined } from '@material-ui/icons'
import React from 'react'
import UserOne from '../../../components/cards/user/UserCard1'

function Followers({setFollowersOpen,followers}) {
  return (
    <div className='profile-followers' >
      <div className='footer-text-head' >
         <p> Followers </p>
         <CloseOutlined onClick={() => setFollowersOpen(false)} />
      </div>

      <div className='footer-text-body' >
        { followers.length > 0 ?
          followers?.map((user) => <UserOne user={user} click={() => setFollowersOpen(false)} />) :
          <h3 className='my-2 text-center' > no followers </h3> 
        }
      </div>
    </div>
  )
}

export default Followers
