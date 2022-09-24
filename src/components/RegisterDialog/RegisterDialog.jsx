import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';

export default function RegisterDialog({openRegisterDialog, closeRegisterDialog}) {

    const {register} = useContext(LoginContext)


    const [userError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [error, setError] = useState('');

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault()
    
        setUserError(false)
        setPasswordError(false)
        setPasswordConfirmationError(false)
    
        if (user == '') setUserError(true)
        if (password == '') setPasswordError(true)
        if (passwordConfirmation == '') setPasswordConfirmationError(true)
        if(passwordConfirmation !== password) {
            setPasswordError(true)
            setPasswordConfirmationError(true)
            setPasswordMatchError(true)
        }else setPasswordMatchError(false)
        let res = null
        if(user && password && passwordConfirmation && (password === passwordConfirmation)){
            res = register(user,password)
            if(res){
                setError(res)
                return
            }
            closeRegisterDialog()
        }
      }
    
  
    return (
      <div>
        <Dialog open={openRegisterDialog} onClose={() => closeRegisterDialog()} disableScrollLock>
          <DialogTitle>Register your account</DialogTitle>
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
                    id="passwordConfirmation"
                    label="Password confirmation"
                    type="password"
                    fullWidth
                    error={passwordConfirmationError}
                    required
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    {passwordMatchError &&
                        <FormHelperText error id="component-error-text">The passwords must match</FormHelperText>
                    }
                    {error && (
                        <FormHelperText id="component-helper-text" error>{error}</FormHelperText>

                    )}

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeRegisterDialog()}>Cancel</Button>
                    <Button type='submit' endIcon={<ArrowForwardIosIcon/>}>Register</Button>
                </DialogActions>
            </form> 
        </Dialog>
      </div>
    );
}
