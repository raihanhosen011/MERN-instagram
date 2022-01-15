import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from './Default';
import './loading.css';

function Alerts() {
    const [open, setOpen] = useState(true);

    const { alert } = useSelector(state => state)

    useEffect(() => {
      setOpen(true)
    },[alert?.err?.common])

    return (
        <>
          {alert.loading && <Loading/>}
          <div className='alerts' >
            {
              alert?.err?.common && 
              <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        severity="error"
                        variant="filled" 
                    >
                       {alert?.err?.common?.msg}
                    </Alert>
              </Collapse>
            }  
          </div>   
        </>
    )
}

export default Alerts
