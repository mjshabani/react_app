import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'
import Main from './pages/Main'
import Alert from './components/Alert'



function Routing() {
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

export default Routing;