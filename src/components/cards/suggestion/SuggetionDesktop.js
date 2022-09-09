import { Replay10Outlined } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { suggestionUser } from '../../../redux/actions/profileAction'
import UserCard1 from '../user/UserCard1'
import './suggestion.css'

const SuggestionDesktop = () => {
    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(suggestionUser(auth))
    },[auth.token])

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
               {profile.suggestion.users?.map(user => <UserCard1 user={user} /> )}   
            </div>

          </div>  
        </>
    )
}

export default SuggestionDesktop
