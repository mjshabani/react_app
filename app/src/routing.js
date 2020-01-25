import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connect } from 'react-redux'

import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'
import Main from './pages/Main'
import Alert from './components/Alert'

import localIpUrl from 'local-ip-url';
import axios from 'axios'

const ipAddress = localIpUrl();
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = 'http://' + ipAddress + ':8080/api'




function Routing(props) {
  switch(props.login.user_type){
    case 'admin':
      axios.defaults.headers.common['SECRET-KEY'] = props.login.token
      break;
    case 'user':
    case 'consultants':
      axios.defaults.headers.common['ACCESS-TOKEN'] = props.login.token
      break;
    default:
      break;
  }

  console.log(props)

  return (
    <Router>
      <Switch>
        <Route path="/admin/login">
          <AdminLogin />
        </Route>
        <Route path="/admin/panel">
          <AdminPanel/>
        </Route>
        <Route path="/">
          <Main/>
        </Route>
      </Switch>
      <Alert/>
    </Router>
  );
}


const mapStateToProps = state => {
  return state
};

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routing)