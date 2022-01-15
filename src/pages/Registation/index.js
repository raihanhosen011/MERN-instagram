import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registration } from '../../redux/actions/authAction'

const Index = () => {
    const [typePass,setTypePass] = useState(true)
    const [userData,setUserData] = useState({ username:'',password:'',email:'',fullname:''})

    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()  

    function handleChange(e){
      const { name,value } = e.target
      setUserData({...userData,[name]:value})
    }

   //  function imgHandler(e){
   //     const files = e.target.files[0]

   //     setUserData({ ...userData,avatar:files })

   //    //  const reader = new FileReader()
   //    //  reader.onload = () =>  setUserData({avatar:reader.result})
   //    //  reader.readAsDataURL(files)
   //  }

    function handleSubmit(e) {
      e.preventDefault()

      dispatch(registration(userData))
    }

    return (
        <>
          <div className='login' >
             <div className='login-area' >
                <div className='container' >

                   <div className='row align-items-center px-md-5' >
                      <div className='col-md-6 left' >
                        <div className='login-area-img' >
                           <img src='./images/instagram-app-mockup-2.png' />
                        </div>
                      </div>  
                      
                      <div className='col-md-6 right' >
                        <div className='login-area-form my-3' >
                           <div className='login-box box-area mb-3' >

                              <div className='login-box-header' >
                                <img src='./images/logos/instagram-clone.png' alt='Fakegram logo' className='inst-logo mb-0' />   
                                <h4 className='my-2 mb-4' >Sign up to see photos and videos from your friends.</h4>
                              </div>

                              <form onSubmit={handleSubmit} >  
                                 {/* <div className='upload-photo' >
                                    <img src={userData.avatar} alt="Upload avatar" className='upload-photo-demo' />   
                                    <input type='file' accept='image/*' name='avatar' onChange={imgHandler} />   
                                 </div> */}

                                 <input type='text' name='fullname' placeholder='Fullname' onChange={handleChange} />
                                 <small className='error' >{ alert?.err?.fullname?.msg }</small>   
                                 
                                 <input type='text' name='username' placeholder='username' onChange={handleChange} />
                                 <small className='error' >{ alert?.err?.username?.msg }</small>     
                                 
                                 <input type='text' name='email' placeholder='Email' onChange={handleChange} />
                                 <small className='error' >{ alert?.err?.email?.msg }</small>  
                                 
                                 <div>
                                    <div className='password-input' >
                                       <input type={`${typePass ? 'password' : 'text'}`} name='password' placeholder='password' maxLength={25} onChange={handleChange} />
                                       <small onClick={() => setTypePass(!typePass)} > { typePass ? 'show' : 'hide' } </small>
                                    </div>        
                                    
                                    <small className='error' >{ alert?.err?.password?.msg }</small>                              
                                 </div>

                                 <button className='button mb-3' > Log in </button>
                              </form>

                           </div>

                           <div className='area-qs box-area mb-4' >
                              <p> Don't have an account? <Link to='/' > Log in </Link></p>  
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
