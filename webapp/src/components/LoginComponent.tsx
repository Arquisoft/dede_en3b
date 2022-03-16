import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { SolidConnection } from '../SOLID/API';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

type State = {
  identityPovider: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  identityPovider: '',
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
        identityPovider: action.payload
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

const Login = () => {
  const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [solidConnection, setSolidConnection] = useState(new SolidConnection());

  useEffect(() => {
    if (state.identityPovider.trim()) {
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
  }, [state.identityPovider]);

  const handleLogin = () => {
    if (state.identityPovider.trim().length != 0) {
      dispatch({
        type: 'loginSuccess',
        payload: 'Login Successfully'
      });
    
    let connection = new SolidConnection(state.identityPovider);
    console.log(state.identityPovider);
    connection.login('cart');

    } else {
      dispatch({
        type: 'loginFailed',
        payload: 'Incorrect username or password'
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
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
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="POD Service Provider" />
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
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}>
            Go to the service
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Login;