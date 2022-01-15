import { BookmarkBorderOutlined, PostAddOutlined } from '@material-ui/icons';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileSaved from './ProfileSaved'
import ProfilePosts from './ProfilePosts'

function ProfileContent() {
    const tab = useLocation().search;
    const tabName = new URLSearchParams(tab).get('tab');
    
    return (
        <div className='profile-right-side profile-content' >
            <div className='profile-content-header radius' >
              <ul>
                <li className={tabName == 'posts' && 'active'} > <Link to='?tab=posts' > <PostAddOutlined/> Posts </Link> </li>
                <li className={tabName == 'saved' && 'active'} > <Link to='?tab=saved' > <BookmarkBorderOutlined/> Saved </Link> </li>
              </ul> 
            </div> 

            <div className='profile-content-body shadow radius'>
                {tabName == 'posts' && <ProfilePosts/>}
                {tabName == 'saved' && <ProfileSaved/>}
            </div> 
        </div>
    )
}

export default ProfileContent
