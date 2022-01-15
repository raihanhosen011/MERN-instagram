import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import SuggestionDesktop from '../../../components/cards/suggestion/SuggetionDesktop'

function LeftSide() {
    return (
        <>
          <div className='left-side' >
             
            {/* author profile  */}
             <div className='author-profile' >
                <Avatar/>

                <div className='author-texts' >
                   <Link to='/' className='author-texts-name' >Author name</Link>
                   <span className='author-texts-username' >author username</span>
                </div> 
             </div>

            {/* suggestion */}
             <SuggestionDesktop/>

          </div>   
        </>
    )
}

export default LeftSide
