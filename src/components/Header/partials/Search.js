import React, { useEffect, useState } from 'react'
import { getData } from '../../../utils/fetchData'
import UserOne from '../../cards/user/UserCard1'
import '../header.css'

function Search() {
    const [searchValue,setSearchValue] = useState('')
    const [users,setUsers] = useState([])
    const [load,setLoad] = useState(false)

    function handleChange(e) {
      setSearchValue(e.target.value)
    }

    useEffect(async () => {
      if (searchValue) {
        setLoad(true)
        const users = await getData(`search-user?username=${searchValue}`)
        setUsers(users.data.users)
        setLoad(false)
      }  
    },[searchValue])

    return (
        <>
          <input type='text' name='search' placeholder='search user' onChange={handleChange} />

          <div className={`search-filter ${searchValue.length === 0 && 'search-hide'}`} >
             {
               users.length > 0 && !load && (
                 <>
                  <div className='search-filter-users' >
                    {users?.map(user => <UserOne user={user} click={() => setSearchValue('')} />)}
                  </div>                 
                 </>
               ) 
             }
             {
               users.length < 0 && !load ? <p className='no-user' > users not found </p> : <></>
             }
             {
               load && <img src='./images/gif/loading-buffering.gif' className='loading-gif' alt='loading' />
             }
          </div>  
        </>
    )
}

export default Search
