import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Login from '../components/Login'
import axios from 'axios'
import { connect } from 'react-redux'
import { addToken } from '../redux/actions/login'
import { setAlert } from '../redux/actions/alert'

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

function AdminLogin(props) {
  const classes = useStyles();

  function onClick(username, password) {
    axios.post('/admin/login', {
      username: username,
      password: password
    })
      .then(function (response) {
        props.addToken('admin', username, response.data.secret_key)
      })
      .catch(function (error) {
        if(error.response){
          props.setAlert(true, 'error', 'Authentication Failed', error.response.data)
        }
      });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Login onClick={onClick} />
      </Container>
    </React.Fragment>
  );
}


const mapStateToProps = state => {
  return {
    user_type: state.login.user_type,
    username: state.login.username,
    token: state.login.token
  };
};

const mapDispatchToProps = {
  setAlert,
  addToken
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin)