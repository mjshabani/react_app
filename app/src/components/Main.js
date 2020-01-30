import React from "react";

import { Route, Switch, useParams, useHistory } from "react-router-dom";
import Consultants from "./Consultants";
import Users from "./Users";
import ConsultationTimes from "./ConsultationTimes";
import ConsultantPage from "./ConsultantPage";
import UserPage from "./UserPage";
import ConsultantCards from "./ConsultantCards";
import Reservations from "./Reservations";

import { setLoginDialog } from "../redux/actions";
import { connect } from "react-redux";

function Main(props) {
  const history = useHistory();
  return (
    <React.Fragment>
      <Switch>
        <Route path="/consultants">
          <Consultants />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/reservations">
          <Reservations />
        </Route>
        <Route path="/user/:user_id">
          <UserPage />
        </Route>
        <Route path="/consultation_times">
          <ConsultationTimes />
        </Route>
        <Route path="/consultant/:consultant_username">
          <ConsultantPage />
        </Route>
        <Route path="">
          <ConsultantCards />
          <ConsultationTimes />
        </Route>
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
