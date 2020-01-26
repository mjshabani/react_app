import React from "react";

import { Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PAGES from "../pages/app";
import Consultants from "./Consultants";
import ConsultationTimes from "./ConsultationTimes";
import { setLoginDialog } from "../redux/actions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
}));

function Main(props) {
  const classes = useStyles();
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
