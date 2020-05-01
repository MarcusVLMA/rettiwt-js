import React, { useState } from 'react';
import { GitHub, AccountCircle, Lock } from '@material-ui/icons';
import { 
  TextField, 
  InputAdornment, 
  Button
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import LoginIllustration from './login-illustration.svg';
import { 
  Background, 
  LoginCard, 
  LoginImage, 
  LoginCardLeft,
  LoginCardRight 
} from './styles';

import backendApi from './backendApi';


function App(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [fieldError, setFieldError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const login = async () => {
    if(!(username && password)) {
      setFieldError(true);
      enqueueSnackbar('Fill fields in blank', {variant:'error'});
    } else {
      const response = await backendApi.post('/authenticate', {
        username: username,
        password: password
      });
      console.log(response);
      if(response.status === 200) {
        enqueueSnackbar('Logged in successfully!', {variant:'success'});
      } else {
        enqueueSnackbar(response.data.error, {variant:'error'});
      }
    }
  }

  return (
    <Background className="d-flex justify-content-center align-items-center">
      <LoginCard className="card">
        <LoginCardLeft className="d-flex flex-column justify-content-center align-items-center">
          <LoginImage src={LoginIllustration} />
          <div className="d-flex align-items-center mt-5">
            <GitHub style={{ fontSize: 20 }} className="mr-2"/>
            <a href="https://github.com/MarcusVLMA">github.com/MarcusVLMA/rettiwt-js</a>
          </div>
        </LoginCardLeft>
        <LoginCardRight className="d-flex flex-column justify-content-center align-items-center p-4">
          <h1 className="mb-5">Login Rettiwt</h1>
          <TextField
            className="mb-2 w-100"
            id="username"
            label="Username"
            variant="filled"
            error={fieldError && !username}
            value={username}
            onChange={ (event) => setUsername(event.target.value) }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="mb-4 w-100"
            id="password"
            type="password"
            label="Password"
            variant="filled"
            error={fieldError && !password}
            value={password}
            onChange={ (event) => setPassword(event.target.value) }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <Button className="w-100 fieldsButton" onClick={login} variant="contained" disableElevation>
            Login
          </Button>
        </LoginCardRight>
      </LoginCard>
    </Background>
  );
}

export default App;