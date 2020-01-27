import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";

import {
  setDrawer,
  setLoginDialog,
  setLogoutDialog,
  setRegisterDialog
} from "../redux/actions";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar as AB,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu
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

function AppBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = [
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      dir="rtl"
    >
      {(() => {
        switch (props.state.login.user_type) {
          case "":
            return [
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  props.setLoginDialog({
                    open: true,
                    user_type: "user"
                  });
                }}
              >
                ورود
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  props.setRegisterDialog({
                    open: true,
                    step: 0
                  });
                }}
              >
                ثبت‌نام
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  props.setLoginDialog({
                    open: true,
                    user_type: "consultant"
                  });
                }}
              >
                ورود مشاوران
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  props.setLoginDialog({
                    open: true,
                    user_type: "admin"
                  });
                }}
              >
                ورود مدیر
              </MenuItem>
            ];
            break;
          default:
            return [
              <MenuItem onClick={handleMenuClose}>پروفایل</MenuItem>,
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  props.setLogoutDialog({
                    open: true
                  });
                }}
              >
                خروج
              </MenuItem>
            ];
            break;
        }
      })()}
    </Menu>
  ];

  return [
    renderMenu,
    <AB
      position="static"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.state.navigation.drawer_open
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
          سامانه‌ نوبت‌دهی آنلاین
        </Typography>
        <IconButton
          edge="end"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={() => props.setDrawer(!props.state.navigation.drawer_open)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AB>
  ];
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {
  setDrawer,
  setLoginDialog,
  setLogoutDialog,
  setRegisterDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
