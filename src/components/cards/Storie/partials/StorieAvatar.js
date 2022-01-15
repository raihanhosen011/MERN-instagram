import React from 'react'
import { Link } from 'react-router-dom'

const StorieAvatar = () => {
    return (
        <>
          <div className='storie-avatar' >
             <Link to='/' >
                <img src='https://avatars.githubusercontent.com/u/83702632?v=4' alt='username' className='avatar-img' />             
             </Link> 
          </div>   
        </>
    )
}

export default StorieAvatar
