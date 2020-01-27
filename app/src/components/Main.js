import React from "react";

import { Route, Switch } from "react-router-dom";
import Consultants from "./Consultants";
import ConsultationTimes from "./ConsultationTimes";
import { setLoginDialog } from "../redux/actions";
import { connect } from "react-redux";

function Main(props) {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/consultants">
          <Consultants />
        </Route>
        <Route path="/consultation_times">
          <ConsultationTimes />
        </Route>
        <Route path="/"></Route>
      </Switch>
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {
  setLoginDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
