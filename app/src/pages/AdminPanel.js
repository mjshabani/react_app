import React from 'react';
import { connect } from 'react-redux'
import { addToken } from '../redux/actions/login'
import { setAlert } from '../redux/actions/alert'
import clsx from 'clsx'

import { useTheme, makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography, MenuItem, Menu} from '@material-ui/core'

import {Drawer, CssBaseline, List,
        Divider, ListItem, ListItemText} from '@material-ui/core'

import {Menu as MenuIcon, AccountCircle ,List as ListItemIcon, ChevronLeft
       ,ChevronRight ,Inbox ,Mail as MailIcon} from '@material-ui/icons';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

function AdminPanel() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>

      <MenuItem onClick={handleMenuClose}>پروفایل</MenuItem>
      <MenuItem onClick={handleMenuClose}>خروج</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {renderMenu}
      <AppBar position="static" className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar variant="dense">
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="start"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
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
            onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}></div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    user_type: state.login.user_type,
    username: state.login.username,
    token: state.login.token
  };
};

const mapDispatchToProps = {
  setAlert,
  addToken
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel)