import { CameraAltOutlined, CloseOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { updateUser } from '../../../redux/actions/profileAction'

function EditProfile({ setOpen, user }) {
   const initState = {
      fullname: user.fullname, mobile: user.mobile, address: user.address, website: user.website, bio: user.bio, profession: user.profession
   }
   const [userData, setUserData] = useState(initState)
   const { fullname,mobile,address,website,bio,profession } = userData

   const [avatar, setAvatar] = useState('')

   const { auth } = useSelector(state => state)
   const dispatch = useDispatch()

   // HANDLE INPUT 
   function handleChange(e){
      const { value,name } = e.target
      setUserData({ ...userData, [name]:value })
   }  

   // HANDLE AVATAR
   function avatarHandler(e){
      const file = e.target.files
      setAvatar(file) 
      dispatch({ type : GLOBALTYPES.AUTH, payload : {...auth,user:{ ...auth.user,avatar:URL.createObjectURL(file[0]) }} })
   }  

   // HANDLE SUBMIT 
   function handleSubmit(e){
      e.preventDefault()
      dispatch(updateUser(userData,avatar,auth))
   }

   return (
        <div className='edit-profile-area' >
           <div className='close-modal' onClick={() => setOpen(false)} >
              <CloseOutlined/>
           </div> 

           <form className='edit-profile-form' onSubmit={handleSubmit} >
              <div className='form-avatar' >
                 <img src={avatar ? URL.createObjectURL(avatar[0]) : auth.user.avatar} alt={auth.user.username} />

                 <div className='form-avatar-content' >
                   <CameraAltOutlined/>
                   <span> change avatar </span> 
                   <input name='avatar' type="file" accept="image/*" onChange={avatarHandler} />
                 </div>
              </div>  

              <div className='form-group' > 
                 <label> Full name </label>
                 <input name='fullname' value={fullname} placeholder='full name' onChange={handleChange} />
              </div> 

              <div className='form-group' >
                 <label> Bio </label>
                 <textarea name='bio' value={bio} placeholder='Enter your bio' onChange={handleChange} />
              </div>

              <div className='form-group' >
                 <label> Mobile </label>
                 <input name='mobile' value={mobile} placeholder='phone number' onChange={handleChange} />
              </div>

              <div className='form-group' >
                 <label> Address </label>
                 <input name='address' value={address} placeholder='address' onChange={handleChange} />
              </div>

              <div className='form-group' >
                 <label> Website </label>
                 <input name='website' value={website} placeholder='Paste your website link' onChange={handleChange} />
              </div>

              <div className='form-group' >
                 <label> Profession </label>
                 <input name='profession' value={profession} placeholder='profession' onChange={handleChange} />
              </div>

              <button type='submit' className='button m-auto' onClick={() => setOpen(false)} > Update </button>
           </form>
        </div>
   )
}

export default EditProfile
