import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

function SingleCardAll() {
    return (
        <>
          <div className='suggestion-card-all text-center radius' >
             <Avatar className='m-auto mt-1' />

             <div className='suggestion-card-texts mb-3 mt-2' >
                <Link to='/' className='user-texts-name d-block' >User name</Link>
                <span className='user-texts-username' >username</span>
             </div> 

             <button className='button w-100' >Follow</button>
          </div>   
        </>
    )
}

export default SingleCardAll
