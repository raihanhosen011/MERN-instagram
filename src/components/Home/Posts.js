import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../cards/Post'

function Posts() {
    const { posts } = useSelector(state => state)

    return (
        <>
          <div className='posts' >
             <div className='posts-area' >
                {posts.posts?.map((post) => <PostCard post={post} />)}
             </div>
          </div>   
        </>
    )
}

export default Posts
