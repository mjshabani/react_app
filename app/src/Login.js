import React from 'react';
import './Login.css';

import {Button, TextField, Grid} from '@material-ui/core'

function Login(props) {
    return (
        
        <Grid container 
            className = "Login" 
            spacing={1}
            direction="column"
            justify="flex-start"
            alignItems="center">

            <Grid item>
            <TextField id = 'username' label = 'نام کاربری یا شماره همراه' />
            </Grid>
            <Grid item>
            <TextField id = 'password' label = 'رمز عبور' />
            </Grid>
            <Grid item>
            <Button variant='contained' color='primary' onClick={props.onclick}> ورود </Button>
            </Grid>
        </Grid>
    );
}

export default Login;