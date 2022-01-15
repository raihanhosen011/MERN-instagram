import { CameraAltOutlined, CommentOutlined, FavoriteBorderOutlined, LayersSharp } from "@material-ui/icons"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUserPosts } from '../../../redux/actions/profileAction'

function ProfilePosts() {
    const [posts,setPosts] = useState([])

    const { username } = useParams()

    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
      if(profile.userPosts.every(post => post.username !== username)){
        dispatch(getUserPosts(username,auth.token))
      }
    },[dispatch,auth,username])

    useEffect(() => {
       const userPosts = profile.userPosts.filter(post => post.username === username && post.images.length > 0)
       setPosts(userPosts)
    },[username])

    return (
        <div className='profile-content-posts' >
          {
            posts.length > 0 ? (
              <div className='row' >
                {
                  posts.map(({ reacts, images, comment, _id }) => (
                      <>
                        <div className='col-md-4 mb-3' >
                          <div className='single-post' >
                            <Link to={`/post/${_id}`} >
                              <div className='single-post-content' >
                                <div className='likes' > {reacts.length} <FavoriteBorderOutlined/> </div>  
                                <div className='comments' > {comment.length} <CommentOutlined/> </div>  
                              </div>                            
                            </Link>

                            <div className='single-post-images' >
                                <img src={images[0].url} alt='' />  
                            </div>

                            {images.length > 1 && <LayersSharp className='layer-icon' />}
                          </div>  
                        </div>
                      </>                 
                  ))                  
                }
              </div>

            ) : (
                <>
                  <div className='no-post' >
                     <CameraAltOutlined/>
                     <h2> No post yet </h2>
                  </div>                
                </>
            )
          }
        </div>
    )
}

export default ProfilePosts