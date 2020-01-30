import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { connect } from "react-redux";
import { setRoute } from "../redux/actions";

import Panel from "../components/Panel";
import Alert from "../components/Alert";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Register from "../components/RegisterUser";
import AddConsultant from "../components/AddConsultant";
import ChangePassword from "../components/ChangePassword";
import UpdateConsultant from "../components/UpdateConsultant";
import UpdateUser from "../components/UpdateUser";

import AddConsultationTime from "../components/AddConsultationTime";
import ScrollToTop from "./ScrollToTop";

import localIpUrl from "local-ip-url";
import axios from "axios";

const ipAddress = localIpUrl();
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = "http://" + ipAddress + ":8080/api";

function App(props) {
  switch (props.state.login.user_type) {
    case "admin":
      axios.defaults.headers.common["SECRET-KEY"] = props.state.login.token;
      break;
    case "user":
    case "consultant":
      axios.defaults.headers.common["ACCESS-TOKEN"] = props.state.login.token;
      break;
    default:
      break;
  }

  console.log(props.state);

  return [
    <Router>
      <ScrollToTop />
      <Panel />
      <Alert />
      <Login />
      <Logout />
      <Register />
      <AddConsultant />
      <ChangePassword />
      <UpdateConsultant />
      <UpdateUser />
      <AddConsultationTime />
    </Router>
  ];
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {
  setRoute
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
