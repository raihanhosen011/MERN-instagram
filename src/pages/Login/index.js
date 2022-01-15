import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../redux/actions/authAction'
import './login.css'

const Index = () => {
    const [typePass,setTypePass] = useState(true)
    const [userData,setUserData] = useState({ username:'',password:''})
    
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()  

    function handleChange(e){
       const { name,value } = e.target
       setUserData({...userData,[name]:value})
    }

    function handleSubmit(e) {
      e.preventDefault()

      dispatch(login(userData))
    }
    
    return (
        <>
          <div className='login' >
             <div className='login-area' >
                <div className='container' >

                   <div className='row align-items-center px-md-5' >
                      <div className='col-md-6 left' >
                        <div className='login-area-img' >
                           <img src='./images/instagram-app-mockup.png' />
                        </div>
                      </div>  
                      
                      <div className='col-md-6 right' >
                        <div className='login-area-form' >
                           <div className='login-box box-area mb-3' >
                              <img src='./images/logos/instagram-clone.png' alt='Fakegram logo' className='inst-logo' />   

                              <form onSubmit={handleSubmit} >
                                 <input type='text' name='username' placeholder='Enter your username or email' onChange={handleChange} />
                                 <small className='error' > {alert?.err?.username?.msg} </small>   

                                 <div>
                                    <div className='password-input' >
                                       <input type={`${typePass ? 'password' : 'text'}`} name='password' placeholder='Enter password' maxLength={25} onChange={handleChange} />
                                       <small onClick={() => setTypePass(!typePass)} > { typePass ? 'show' : 'hide' } </small>
                                    </div>           
                                    <small className='error' > {alert?.err?.password?.msg} </small>                            
                                 </div>

                                 <button className='button mb-3' disabled={userData.username && userData.password ? false : true} > Log in </button>
                              </form>
                           
                           </div>

                           <div className='area-qs box-area mb-4' >
                              <p> Don't have an account? <Link to='/register' > Sign up </Link></p>  
                           </div>

                           <div className='login-area-getapp' > 
                              <p>Get the app.</p>
                              
                              <img src='./images/logos/button-get-it-on-google-play.png' alt='play store' />
                           </div>
                           
                        </div>
                      </div>  
                   </div>

                </div>             
             </div> 
          </div>   
        </>
    )
}

export default Index
