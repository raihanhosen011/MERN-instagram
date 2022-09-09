import React from 'react';
import Carousel from 'react-multi-carousel';

function PostBody({ post }) {
    const responsive = {
      all: {
        breakpoint: { max: 100000, min: 0 },
        items: 1,
        slidesToSlide: 1
      }
    }

    return (
        <>
          <div className='post-body' >
            <div className='post-body-img' >
              <Carousel responsive={responsive} >
                {post.images?.map(({ url }) => url?.match(/video/i) ? <video controls src={url} alt='' /> : <img src={url} alt='' /> )}
              </Carousel>
            </div>
          </div>   
        </>
    )
}

export default PostBody