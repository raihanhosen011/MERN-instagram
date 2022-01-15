import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';
import Followers from './Followers';
import Following from './Following';

function ProfileInfoFooter({ followers, following }) {
  const [followersOpen,setFollowersOpen] = useState(false)
  const [followingOpen,setFollowingOpen] = useState(false)

  return (
    <>
      <div>
        {/* <p className='text-footer-post' > <b>51</b> posts </p>  */}
        <p className='text-footer-follower' > <b>{followers.length}</b> <span value='followers' onClick={() => setFollowersOpen(true)} >Followers</span>  </p> 
        <p className='text-footer-following' > <b>{following.length}</b> <span value='following' onClick={() => setFollowingOpen(true)} >Following</span> </p> 
      </div>    
    
      <div>
          <Dialog
            open={followersOpen}
            keepMounted
            onClose={() => setFollowersOpen(false)}
          >
            <Followers followers={followers} setFollowersOpen={setFollowersOpen} />
          </Dialog>

          <Dialog
            open={followingOpen}
            keepMounted
            onClose={() => setFollowingOpen(false)}
          >
            <Following following={following} setFollowingOpen={setFollowingOpen} />
          </Dialog>
      </div>
    </>
  )
}

export default ProfileInfoFooter
