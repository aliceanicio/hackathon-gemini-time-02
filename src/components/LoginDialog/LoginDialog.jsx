import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, InputAdornment, TextField, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';

export default function LoginDialog({openLoginDialog, closeLoginDialog, openRegisterDialog}) {


    const {login} = useContext(LoginContext)

    const [userError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault()
    
        setUserError(false)
        setPasswordError(false)
    
        if (user == '') setUserError(true)
        if (password == '') setPasswordError(true)

        let res = null

        if(user && password){
          res = login(user, password)
        }
        if(res) {
            setError(res)
            return
        }
    }
    
  
    return (
      <div>
        <Dialog open={openLoginDialog} onClose={() => closeLoginDialog()} disableScrollLock>
          <DialogTitle>Log into your account</DialogTitle>

            <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                <DialogContent>
                    <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    autoFocus
                    margin="dense"
                    id="userName"
                    label="Username"
                    type="text"
                    fullWidth
                    required
                    error={userError}
                    onChange={(e) => setUser(e.target.value)}

                    />
                    <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOpenIcon/>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    error={passwordError}
                    required
                    onChange={(e) => setPassword(e.target.value)}

                    />
                    {error && (
                        <FormHelperText id="component-helper-text" error>{error}</FormHelperText>

                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeLoginDialog()} color="secondary">Cancel</Button>
                    <Button type='submit' endIcon={<ArrowForwardIosIcon/>} color="primary">Login</Button>
                </DialogActions>
            </form> 
            <Typography component="button" variant="overline" type="text" onClick={() => openRegisterDialog()}>Create Account</Typography>
        </Dialog>
      </div>
    );
}
