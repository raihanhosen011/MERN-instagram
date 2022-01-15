export function validator({ username,fullname,email,password }) {
  let err = {}

  // username validator
  if (!username){
    err.username = {
      msg : 'Please add your username'  
    }
  }else if(username.replace(/ /g, '').length > 25){
    err.username = {
      msg : "User name is up to 25 characters long."
    } 
  }

  // fullname validator
  if (!fullname){
    err.fullname = {
      msg : "Please add your full name" 
    } 
  }else if (fullname.length > 30){
    err.fullname = {
      msg : "Full name length must be up to 30"  
    }
  } 

  // email validator
  if (!email){
    err.email = {
      msg : "please add your email"  
    }
  }else if(!validateEmail(email)){
    err.email = {
      msg : "this email format is not valid" 
    }
  }

  // password validator
  if (!password){
    err.password = {
      msg : "Please add your password"  
    }
  }else if(password.length < 6){
    err.password = {
      msg : "Password must be at least 6 characters."  
    }
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length
  }
}


function validateEmail(email) {
   // eslint-disable-next-line
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
}