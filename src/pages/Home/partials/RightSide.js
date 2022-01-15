import { Avatar, Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { ExitToAppOutlined } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../redux/actions/authAction';

function RightSide() {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    return (
        <div className='right-side radius shadow' >
           <ul className='right-side-lists' >
              <li className="single-list profile" >
                <Link to={`/user/${auth.user.username}/?tab=posts`} >
                  <Avatar/>
                  <span>Profile</span>                
                </Link>
              </li>

              <hr/>

              <li className="single-list logout" onClick={handleClickOpen} >
                <ExitToAppOutlined/>
                <span>Log out</span>
              </li>  
           </ul>     


           <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >          
               <DialogContent>
                 <p> Are you sure you want to log out? </p>
               </DialogContent>
               
               <DialogActions>
                 <Button variant="outlined" size='small' onClick={handleClose}> No </Button>
                 <Button variant="outlined" size='small' onClick={() => dispatch(logout())} autoFocus> Yes </Button>
               </DialogActions>
           </Dialog>
        </div>
    )
}

export default RightSide
