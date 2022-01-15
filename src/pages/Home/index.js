import React from 'react'
import { useSelector } from 'react-redux'
import './home.css'
import LeftSide from './partials/LeftSide'
import MiddleSide from './partials/MiddleSide'
import RightSide from './partials/RightSide'

const Index = () => {
  const { posts } = useSelector(state => state)
  
  return (
        <>
          <main className='home' > 
            <div className='home-area' >
              <div className='container' >
                <div className='row' >

                    {/* Being left side */}
                      <div className='col-md-3 home-left' >
                        <LeftSide/>
                      </div>
                    {/* End left side */}


                    {/* Being middle side */}
                      <div className='col-md-6 home-middle' >
                        <MiddleSide/>
                      </div>
                    {/* End middle side */}


                    {/* Being right side */}
                      <div className='col-md-3 home-right' >
                        <RightSide/>
                      </div>
                    {/* End right side */}

                </div>
              </div>
            </div>
          </main>   
        </>
    )
}

export default Index
