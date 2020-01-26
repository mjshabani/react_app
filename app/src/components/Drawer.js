import React from "react";
import { setDrawer } from "../redux/actions";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Drawer as Drwr,
  Avatar,
  Divider,
  Grid
} from "@material-ui/core";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 100
  },
  menuButton: {
    marginLeft: theme.spacing(2)
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
  }
}));

function Drawer(props) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Drwr
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.state.navigation.drawer_open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <Avatar
          className={classes.drawerAvatar}
          src={props.state.login.image}
        />
      </div>
      <Divider />
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        {[
          ["مشاوران", "consultants"],
          ["کاربران", "users"],
          ["زمان‌ها", "consultation_times"]
        ].map((item, index) => [
          <Grid
            item
            onClick={() => history.push(`/${item[1]}`)}
            className={classes.section}
          >
            <Typography variant="h6" align="center">
              {" "}
              {item[0]}
            </Typography>
          </Grid>,
          <Divider />
        ])}
      </Grid>
    </Drwr>
  );
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {
  setDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
