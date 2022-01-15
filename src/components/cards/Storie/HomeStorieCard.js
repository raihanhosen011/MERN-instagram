import React from 'react';
import Carousel from 'react-multi-carousel';
import StorieAvatar from './partials/StorieAvatar';
import './storie.css';

function HomeStorieCard() {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 8
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 6
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 5
      }
    };

    return (
        <>
          <div className='home-storie-card root-card shadow radius' >
            <Carousel responsive={responsive} >
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
               <StorieAvatar/>
            </Carousel>   
          </div>   
        </>
    )
}

export default HomeStorieCard
