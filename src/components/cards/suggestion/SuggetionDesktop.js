import { Replay10Outlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import UserCard1 from '../user/UserCard1'
import './suggestion.css'

const SuggestionDesktop = () => {
    return (
        <>
          <div className='suggestion-desktop' >

            <div className='suggestion-desktop-head d-flex justify-content-between' >
              <p>Suggestion for you </p>

              <div className='d-flex' >
                 <Link to='/suggestion' className='see-all' > see all </Link>
                 <Replay10Outlined className='replay-icon ml-2' />   
              </div>  
            </div>

            <div className='suggestion-desktop-body suggestion-desktop-card my-2' >
               <UserCard1/>    
               <UserCard1/>    
               <UserCard1/>    
               <UserCard1/>    
               <UserCard1/>          
            </div>

          </div>  
        </>
    )
}

export default SuggestionDesktop
