import React, { useReducer, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { doSolidLogin, getSolidWebId } from '../api/api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

type State = {
  identityProvider: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

function BreadcrumbsLogin() {
  return(
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" href="/" >
        <Typography
        variant='h6'
        sx={{color: 'text.secondary'}}>
            Home
        </Typography>
      </Link>
      <Typography variant='h6'
        sx={{color: 'text.secondary'}}>
            Connect to your POD
        </Typography>
    </Breadcrumbs>
  );
}

const initialState:State = {
  identityProvider: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setIdentityProvider', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
   case 'setIdentityProvider': 
      return {
        ...state,
         identityProvider: action.payload
       };
  case 'setIsButtonDisabled': 
       return {
       ...state,
        isButtonDisabled: action.payload
       };
     case 'loginSuccess': 
       return {
      ...state,
        helperText: action.payload,
        isError: false
       };
  case 'loginFailed': 
     return {
       ...state,
        helperText: action.payload,
       isError: true
      };
   case 'setIsError': 
       return {
         ...state,
     isError: action.payload
    };
  }
}

export function Login(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.identityProvider.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.identityProvider]);

  const handleLogin = async () => {
    console.log(state.identityProvider);
    await doSolidLogin(state.identityProvider);
    console.log(getSolidWebId());
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    
    if (event.key === 'Enter') {
      event.preventDefault();
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setIdentityProvider',
        payload: event.target.value
      });
    };

  return (
    <Box sx={{ bgcolor: 'background.default', padding: '1em', height: '20em', display: 'flex', flexDirection: 'column'}}>
      <BreadcrumbsLogin />
      <form noValidate autoComplete="off">
      <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '20em', margin: 'auto',
       marginTop: 0, bgcolor: 'background.light'}}>
        <Box sx={{textAlign: 'center', bgcolor: 'background.dark', color: 'text.light', padding: '4em', width: '12em'}}>
          <Typography
            variant='h5'>
          POD Service Provider
          </Typography>
          </Box> 
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="identityProvider"
              type="email"
              label="POD identity provider"
              placeholder="URL of the POD identity provider"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <Box sx={{paddingBottom: 2, paddingTop: 2, alignSelf: 'center'}}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleLogin}
            disabled={state.isButtonDisabled}>
            Go to the service
          </Button>
        </Box>
      </Box>
      <Box sx={{paddingBottom: 2, paddingTop: 2, alignSelf: 'center'}}>
        <p style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Don't know what a SOLID POD is? check out the&nbsp;<a href="https://solidproject.org/">SOLID project</a></p>
      </Box>
    </form>
    </Box>
  );
}

export default Login;
