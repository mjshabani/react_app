import React from "react";
import { setDrawer, setLogoutDialog } from "../redux/actions";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Drawer as Drwr,
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

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
  drawerAvatar: {
    alignSelf: "center",
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: theme.spacing(5),
    marginBottom: theme.spacing(0)
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
  listItem: {
    width: "100%",
    textAlign: "center"
  }
}));

function Drawer(props) {
  const history = useHistory();
  const classes = useStyles();

  let list_items = [
    {
      label: "خانه",
      onClick: () => history.push("")
    },
    {
      label: "مشاوران",
      onClick: () => history.push("/consultants")
    },
    {
      label: "زمان‌های مشاوره",
      onClick: () => history.push("/consultation_times")
    }
  ];

  if (props.state.login.user_type === "admin") {
    list_items = list_items.concat([
      {
        label: "کاربران",
        onClick: () => history.push("/users")
      },
      {
        label: "رزرو‌ها",
        onClick: () => history.push("/reservations")
      }
    ]);
  }

  if (props.state.login.user_type === "user") {
    list_items = list_items.concat([
      {
        label: "رزرو‌ها",
        onClick: () => history.push("/reservations")
      },
      {
        label: "پروفایل",
        onClick: () => history.push(`/user/${props.state.login.user.id}`)
      }
    ]);
  }
  if (props.state.login.user_type === "consultant") {
    list_items = list_items.concat([
      {
        label: "پروفایل",
        onClick: () =>
          history.push(`/consultant/${props.state.login.user.username}`)
      }
    ]);
  }

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
      {props.state.login.user_type === "" ? (
        <ListItem button key="title" onClick={() => history.push("")}>
          <Typography variant="h4" className={classes.listItem}>
            سامانه‌‌ رِزلاین
          </Typography>
        </ListItem>
      ) : (
        <ListItem key="avatar">
          <Grid container justify="center">
            <Grid item>
              <Avatar
                className={classes.drawerAvatar}
                src={props.state.login.user.image}
              />
            </Grid>
          </Grid>
        </ListItem>
      )}
      {(() => {
        switch (props.state.login.user_type) {
          case "consultant":
            let consultant = props.state.login.user;
            return (
              <ListItem key="name">
                <Typography variant="h6" className={classes.listItem}>
                  {consultant.title} {consultant.name} {consultant.family}
                </Typography>
              </ListItem>
            );
            break;
          case "user":
            let user = props.state.login.user;
            return (
              <ListItem key="name">
                <Typography variant="h6" className={classes.listItem}>
                  {user.name} {user.family}
                </Typography>
              </ListItem>
            );
            break;
          default:
            break;
        }
      })()}
      {[1, 2, 3].map(item => (
        <ListItem key={item + " "}>
          <Typography variant="h1" className={classes.listItem}></Typography>
        </ListItem>
      ))}
      <Divider />

      {list_items.map((item, index) => [
        <ListItem button key={item.label} onClick={item.onClick}>
          <Typography variant="h6" className={classes.listItem}>
            {item.label}
          </Typography>
        </ListItem>,
        <Divider light variant="middle" />
      ])}
    </Drwr>
  );
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {
  setDrawer,
  setLogoutDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
