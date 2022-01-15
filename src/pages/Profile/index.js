import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser } from '../../redux/actions/profileAction'
import ProfileContent from './partials/ProfileContent'
import ProfileInfo from './partials/ProfileInfo'
import './profile.css'

function Index() {
    const { username } = useParams()

    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
      if(profile.users.every(user => user.username !== username)){
        dispatch(getUser(username,auth.token))
      }
    },[dispatch,auth,username])

    return (
        <>
          <div className='profile' >
            <div className='profile-area' >  
               <div className='container' > 
                  <div className='row' >
                     
                     {/* left side */}
                      <div className='col-md-3' >
                        <ProfileInfo />
                      </div> 

                     {/* right side */}
                      <div className='col-md-9' >
                        <ProfileContent/>
                      </div> 
                     
                  </div>
               </div>
            </div>
          </div>   
        </>
    )
}

export default Index
