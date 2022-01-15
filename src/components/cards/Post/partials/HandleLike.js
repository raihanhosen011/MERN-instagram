import { IconButton } from '@material-ui/core'
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons'
import React from 'react'

function HandleLike({ isLike,likeHandler,dislikeHandler }) {
  return (
    <>
      <IconButton >
        {isLike ? <Favorite onClick={dislikeHandler} /> : <FavoriteBorderOutlined onClick={likeHandler} />}
      </IconButton> Love

      <div className='react-popup shadow' >
        <ul className='d-flex' >
          <li> <img src='/images/icons/react/heart.png' /> </li>
          <li> <img src='/images/icons/react/like.png' /> </li>
          <li> <img src='/images/icons/react/light-bulb.png' /> </li>
          <li> <img src='/images/icons/react/confetti.png' /> </li>
          <li> <img src='/images/icons/react/haha.png' /> </li>
          <li> <img src='/images/icons/react/happy.png' /> </li> 
        </ul> 
      </div>   
    </>
  )
}

export default HandleLike
