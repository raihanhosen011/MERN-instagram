import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostFooter from '../../components/cards/Post/partials/PostFooter';
import PostHead from '../../components/cards/Post/partials/PostHead';
import { getSinglePost } from '../../redux/actions/detailsAction';
import './postDetails.css';

function Index() {
  const { id } = useParams()

  const { auth, detail } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSinglePost(id,auth.token))
  },[id])

  const responsive = {
    all: {
      breakpoint: { max: 100000, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  }

  let post = detail.post.post ? detail.post.post : {}
  
  return (
    <>
      <div className='post-details' >
         <div className='container' >
            <div className='post-details-wrapper shadow radius' >
              <div className='row' >

                <div className='col-md-6' >
                    <div className='post-details-images' >
                      <Carousel responsive={responsive} >
                         <img src='https://res.cloudinary.com/raihan-dev/image/upload/v1642042642/fakegram/vwxbqseaw76tvcmqgfzs.jpg' />    
                         <img src='https://res.cloudinary.com/raihan-dev/image/upload/v1642042861/fakegram/ujrvtw14y1skn49dheeg.jpg' />    
                      </Carousel>
                    </div>
                </div>

                <div className='col-md-6' >
                  <div className='post-details-contents' >
                    {
                      post._id ? (
                        <>
                          <div className='content-head' >
                             <PostHead post={detail.post.post} />
                          </div>

                          <div className='content-footer' >
                             <PostFooter post={detail.post.post} /> 
                          </div>                         
                        </>
                      ) : (
                        <>
                          
                        </>
                      )
                    }
                  </div>
                </div>

              </div>
            </div>
         </div>
      </div> 
    </>
  )
}

export default Index
