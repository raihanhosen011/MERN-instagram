import { Avatar, IconButton } from '@material-ui/core';
import { ExploreOutlined, HomeOutlined, SendOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import CreatePost from './partials/CreatePost';
import Search from './partials/Search';
import Notification from './partials/Notification';

const Index = () => {
    return (
        <>
          <header className='header' >
            <div className='header-area' >
               <div className='container d-flex' >
                  <div className='header-logo' >
                    <img src='./images/logos/instagram-clone.png' alt='' />
                  </div>

                  <div className='header-search position-relative' >
                     <Search/>
                  </div>

                  <div className='header-navs' >
                    <Link to='/' ><IconButton> <HomeOutlined/> </IconButton></Link>

                    <div className='header-nav-post' >
                       <CreatePost/>                       
                    </div>

                    <Link to='/explore' ><IconButton> <ExploreOutlined/> </IconButton></Link>

                    <Link to='/message/users' >
                      <IconButton className='message-icon' > 

                        <div className='message-length' > 1 </div>
                        <img src='./images/icons/messenger.png' alt='messanger icon' />  
                    
                      </IconButton>
                    </Link>

                    <Notification/> 

                    <IconButton> <Avatar/> </IconButton>
                   
                  </div>
               </div> 
            </div>
          </header>  
        </>
    )
}

export default Index
