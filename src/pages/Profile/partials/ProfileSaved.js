import { PhotoAlbumOutlined } from "@material-ui/icons"
import React from 'react'

function ProfileSaved() {
    return (
        <div className='profile-content-saved' >
           <div className='no-saved' >
              <PhotoAlbumOutlined/>
              <h2>No saved</h2> 
           </div> 
        </div>
    )
}

export default ProfileSaved
