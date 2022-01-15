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
import './responsive.min.css'

function App() {
  const { auth, posts } = useSelector(state => state)
  const dispatch = useDispatch()

  const history = useHistory()  

  useEffect(() => {
    if (auth.token) return history.push('/')
    if (!auth.token) {
      history.push('/')
    }
  },[auth.token])

  useEffect(() => {
    if(auth.token) return dispatch(getPosts(auth))
  }, [dispatch, auth])
  
  return (
    <>
      <div className='app' >
        {auth.token && <Header/>}

        <Alerts/>
        <Switch>
          <Route path='/' exact > {auth.token ? <Home/> : <Login/>} </Route>          
          <Route path='/register' > <Registation/> </Route>
          <Route path='/user/:username' > <Profile/> </Route>
          <Route path='/post/:id' > <PostDetails/> </Route>
        </Switch>
      </div> 
    </>
  )
}

export default App
