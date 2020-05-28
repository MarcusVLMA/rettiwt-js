import React, { useState } from 'react';
import { AccountCircle, Lock } from '@material-ui/icons';
import { TextField, InputAdornment } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { Background, GreenButton } from '../styles/General';
import { SignUpCard, SignUpTitle } from '../styles/screens/SignUp';
import backendApi from '../backendApi';

export default function SignUp(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [fieldError, setFieldError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  
  const { history } = props;

  const signUp = async () => {
    if(!(username && password && confirmPassword)) {
        setFieldError(true);
        enqueueSnackbar('Fill fields in blank', {variant:'error'});
    } else if(password !== confirmPassword) {
        setFieldError(true);
        enqueueSnackbar("Passwords doesn't match", {variant:'error'});
    } else {
        const response = await backendApi.post('/register', {
            username, password
        });

        if(response.status === 200) {
            enqueueSnackbar('Signed up succesfully. You can login now!', {variant:'success'});
            history.push('/');
        } else if(response.status === 409){
            enqueueSnackbar('This username already exists', {variant:'error'});
            setUsername('');
        } else {
            enqueueSnackbar('Sorry, something wrong happened. Please, try again later.', {variant:'error'});
        }
    }
  }

  return (
    <Background className="d-flex justify-content-center align-items-center">
      <SignUpCard className='p-5'>
        <SignUpTitle className='mb-5'>
            Create your account
        </SignUpTitle>
        <TextField
          className="mb-2 w-100"
          id="username"
          label="Username"
          variant="filled"
          error={fieldError && !username}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className="mb-2 w-100"
          id="password"
          type="password"
          label="Password"
          variant="filled"
          error={fieldError && !password}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className="mb-4 w-100"
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          variant="filled"
          error={(fieldError && !confirmPassword) || (confirmPassword !== password)}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <GreenButton className="w-100 fieldsButton" onClick={signUp} variant="contained" disableElevation>
            Sign Up!
        </GreenButton>
      </SignUpCard>
    </Background>
  );
}