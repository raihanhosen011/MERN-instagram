import React from 'react';
import Carousel from 'react-multi-carousel';
import SingleCardAll from './partials/SingleCardAll';

const SuggestionAll = () => {

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 3
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
      }
    };

    return (
        <>
          <div className='suggestion-all root-card shadow radius' >
             <small className='mb-2 d-block' > Suggestion for you </small> 
             <Carousel responsive={responsive} >
                <SingleCardAll/>
                <SingleCardAll/>
                <SingleCardAll/>
                <SingleCardAll/>
                <SingleCardAll/>
                <SingleCardAll/>
             </Carousel>
          </div>  
        </>
    )
}

export default SuggestionAll
