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
          <input type='text' name='search' autocomplete="off"  class="form-control form-control-md chat-input form-control" placeholder='search user...' onChange={handleChange} />

          <div className={`search-filter ${searchValue.length === 0 && 'search-hide'}`} >

            {
              searchValue.length > 0 &&
                <>
                  {
                    load ? 
                      <img src='/images/gif/loading.gif' className='m-auto' /> : 
                      <>
                        {
                          users.length > 0 ?
                            <>
                              <div className='search-filter-users' >
                                {users?.map(user => <UserOne user={user} click={() => setSearchValue('')} />)}
                              </div>  
                            </>
                              :
                            <>
                              <div className='no-user' > 
                                 <img src='/images/gif/crying.gif' alt='crying gif' /> 
                                 <h4> Oops, sorry bro. There is no user by the name "<strong>{searchValue}</strong>" </h4>
                              </div>
                            </>
                        }
                      </>
                  }
                </>
            }

          </div>  
        </>
    )
}

export default Search
