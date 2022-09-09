import React from 'react';

function EmptyMessage() {
  return <>
    <div className='empty-messages d-flex align-items-center justify-content-center flex-column text-center h-100' >
        <img src='/images/chat.png' alt='Chat img' />
        
        <div className='empty-message-content my-2' >
          <h2> Welcome to Fakegram Chat </h2>  
          <p className='w-75 m-auto text-grey' > Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. cum sociis natoque penatibus et </p>
        </div>
    </div>
  </>;
}

export default EmptyMessage;
