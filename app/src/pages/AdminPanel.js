import React from "react";
import { connect } from "react-redux";
import { addToken } from "../redux/actions/login";
import { setAlert } from "../redux/actions/alert";
import Consultants from "../components/Consultants";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu
} from "@material-ui/core";

import {
  Drawer,
  List,
  Avatar,
  Divider,
  ListItem,
  Grid
} from "@material-ui/core";

import { Menu as MenuIcon, AccountCircle } from "@material-ui/icons";

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

function AdminPanel(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [section, setSection] = React.useState("");

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>پروفایل</MenuItem>
      <MenuItem onClick={handleMenuClose}>خروج</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {renderMenu}
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar variant="dense">
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="start"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.grow} />
          <Typography className={classes.title} variant="h6" noWrap>
            پنل ادمین
          </Typography>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        alignItems="center"
      >
        {(() => {
          switch (section) {
            case "consultants":
              return <Consultants />;
              break;
            case "users":
              break;
            case "consultation_times":
              break;
            default:
              break;
          }
        })()}
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <Avatar
            className={classes.drawerAvatar}
            src="/static/images/avatar/1.jpg"
          />
        </div>
        <Divider />
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          xs={12}
        >
          {[
            ["مشاوران", "consultants"],
            ["کاربران", "users"],
            ["زمان‌ها", "consultation_times"]
          ].map((item, index) => [
            <Grid
              item
              onClick={() => setSection(item[1])}
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
      </Drawer>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  setAlert,
  addToken
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
