import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminLogin from './pages/AdminLogin.js'



function Routing() {
  return (
    <Router>
      <Switch>
        <Route path="/admin/login">
          <AdminLogin />
        </Route>
        <Route path="/admin/panel">
        </Route>
        <Route path="/">
          <Link to='/admin/login'>admin login</Link>
        </Route>
      </Switch>
    </Router>
  );
}

export default Routing;