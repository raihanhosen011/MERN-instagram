import React, {useEffect, useState} from 'react';

import { useParams } from 'react-router-dom'

import EmptyMessage from './EmptyMessage';
import UserMessage from './UserMessage';

function Message() {
  const { user } = useParams()

  const [param, setParam] = useState(user)

  useEffect(() => {
    setParam(user)
  }, [ user ])

  return <>
    <div className='message-messages h-100' >

      {param === "user" ? <EmptyMessage/> : <UserMessage/>}

    </div>
  </>;
}

export default Message;
