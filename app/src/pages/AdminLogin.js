import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Login from '../components/Login'
import axios from 'axios'
import { connect } from 'react-redux'
import { addSecretKey } from '../redux/actions/admin'

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
        console.log(response)
        if (response.status === 201) {
          console.log('passed')
          props.addSecretKey(username, response.data.secret_key)
        } else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <p>{props.username}</p>
        <Login onClick={onClick} />
      </Container>
    </React.Fragment>
  );
}


const mapStateToProps = state => {
  console.log(state);
  return { 
    username : state.admin.username,
    secret_key : state.admin.secret_key
   };
};

const mapDispatchToProps = {
  addSecretKey
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin)