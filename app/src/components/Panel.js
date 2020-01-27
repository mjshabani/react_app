import React from "react";
import { connect } from "react-redux";
import { setAlert } from "../redux/actions";
import clsx from "clsx";
import Main from "./Main";
import Navigation from "./Navigation";
import Footer from "./Footer";

import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 100
  },
  menuButton: {
    marginLeft: theme.spacing(2)
  },
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginBottom: 50
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignSelf: "center",
    padding: theme.spacing(1, 1),
    ...theme.mixins.toolbar
  },
  drawerAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(5),
    marginBottom: theme.spacing(10)
  },
  section: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

function Panel(props) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <Navigation />
      <div
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.state.navigation.drawer_open
        })}
      >
        <Main />
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = {
  setAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
