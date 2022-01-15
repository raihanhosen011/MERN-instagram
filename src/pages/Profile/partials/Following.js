import { CloseOutlined } from '@material-ui/icons'
import React from 'react'
import UserOne from '../../../components/cards/user/UserCard1'

function Following({ setFollowingOpen, following }) {
  return (
    <div className='profile-following' >
      <div className='footer-text-head mb-2' >
         <p> Following </p>
         <CloseOutlined onClick={() => setFollowingOpen(false)} />
      </div>

      <div className='footer-text-body' >
        { following.length > 0 ? 
          following?.map(user => <UserOne user={user} click={() => setFollowingOpen(false)} />) :
          <h3 className='my-2 text-center' > no following </h3>
        }
      </div>
    </div>
  )
}

export default Following
