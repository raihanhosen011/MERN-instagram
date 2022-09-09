import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import Header from './components/Header'
import Alerts from './components/loading/Alerts'
import Home from './pages/Home'
import Login from './pages/Login'
import PostDetails from './pages/PostDetails'
import Profile from './pages/Profile'
import Registation from './pages/Registation'
import { getPosts } from './redux/actions/postAction'
import { getNotification } from './redux/actions/notificationAction'
import './responsive.min.css'
import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'
import Messanger from './pages/Messanger'

function App() {
  const { auth, posts, notificaiton, message } = useSelector(state => state)
  const dispatch = useDispatch()

  const history = useHistory()  

  // CHECK TOKEN
  useEffect(() => {
    if (auth.token) return history.push('/')
    if (!auth.token) {
      history.push('/')
    }
  },[auth.token])

  // GET POSTS
  useEffect(() => {
    if(auth.token){
      dispatch(getPosts(auth))
      dispatch(getNotification(auth))
    }
  }, [dispatch, auth.token])
  
  // SOCKET.io
  useEffect(() => {
    const socket = io("http://localhost:5000")
    dispatch({ type : GLOBALTYPES.SOCKET, payload : socket })

    return () => socket.close()
  }, [dispatch])
 
  return (
    <>
      <div className='app' >
        {auth.token && <Header/>}
        {auth.token && <SocketClient/>}

        <Alerts/>
        
        <Switch>
          <Route path='/' exact > {auth.token ? <Home/> : <Login/>} </Route>          
          <Route path='/register' > <Registation/> </Route>
          <Route path='/user/:username' > <Profile/> </Route>
          <Route path='/post/:id' > <PostDetails/> </Route>
          <Route path='/message/:id' > <Messanger/> </Route>
        </Switch>
      </div> 
    </>
  )
}

export default App
