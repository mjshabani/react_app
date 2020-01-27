import React from "react";
import { connect } from "react-redux";

import AppBar from "../components/AppBar";
import Drawer from "../components/Drawer";

function Navigation(props) {
  return [<AppBar />, <Drawer />];
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
