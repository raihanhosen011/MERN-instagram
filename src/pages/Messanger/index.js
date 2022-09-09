import React from 'react';
import Users from './partials/Users'
import Message from './partials/Message'
import './messanger.css'

function Index() {
  return <>
    <div className='messanger' >
      <div className='row h-100' >

         <div className='col-md-3 h-100 bg-white pr-0' > <Users/> </div>

         <div className='col-md-9 h-100 pl-0' style={{ backgroundImage : "url(/images/message-backdrop.png)" }} >  <Message/> </div>

      </div>
    </div>
  </>;
}

export default Index;