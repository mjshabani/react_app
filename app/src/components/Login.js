import React from 'react';
import './Login.css';
import { Button, TextField, Grid } from '@material-ui/core'

class Login extends React.Component {


  constructor(props) {
    super(props)
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    return (
      <Grid container
        className="Login"
        spacing={1}
        direction="column"
        justify="flex-start"
        alignItems="center">

        <Grid item>
          <TextField id='username' label='نام کاربری یا شماره همراه' onChange={this.handleUsernameChange} />
        </Grid>
        <Grid item>
          <TextField id='password' type='password' label='رمز عبور' onChange={this.handlePasswordChange} />
        </Grid>
        <Grid item>
          <Button variant='contained' color='primary' onClick={() => this.props.onClick(this.state.username, this.state.password)}> ورود </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Login;