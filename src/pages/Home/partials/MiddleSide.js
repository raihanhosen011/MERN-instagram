import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import HomeStorieCard from '../../../components/cards/Storie/HomeStorieCard'
import SuggestionAll from '../../../components/cards/suggestion/SuggestionAll'
import Posts from '../../../components/Home/Posts'

function RightSide() {
    const { posts } = useSelector(state => state)
  
    return (
        <>
          <div className='middle-side' >
             
            {/* Being story card */}
              <HomeStorieCard/>   
            {/* End story card */}

            <div className='whitespace' />

            {/* being suggestion carousel */}
              <SuggestionAll/>
            {/* end suggestion carousel */}

            <div className='whitespace' />

            {/* Being posts */}
              { posts.POST_LOADING && <CircularProgress/> }
              { !posts.POST_LOADING || posts.result !== 0 ? <Posts /> : <h3> no posts </h3>}
            {/* End posts */}

          </div>   
        </>
    )
}

export default RightSide
