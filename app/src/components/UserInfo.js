import React from "react";
import { connect } from "react-redux";
import { setChangePasswordDialog, setUpdateUserDialog } from "../redux/actions";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import SchoolIcon from "@material-ui/icons/School";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Container,
  Typography,
  Grid,
  Paper,
  Fab,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "100%",
    flexGrow: 1
  },
  container: {
    marginBottom: 50
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  text: {
    textAlign: "right"
  },
  section: {
    paddingTop: 20,
    paddingBottom: 20
  },
  information: {
    marginTop: 1,
    marginBottom: 1
  },
  fab: {
    margin: 5
  }
}));

function UserInfo(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Grid
          container
          className={classes.grid}
          direction="column"
          justify="center"
          alignItems="space-between"
        >
          <Grid
            container
            direction="row-reverse"
            justify="space-around"
            alignItems="center"
            className={classes.section}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="stretch"
              xs={4}
            >
              <Grid item>
                <Avatar
                  src={props.user.image}
                  className={classes.largeAvatar}
                />
              </Grid>
            </Grid>
            <Grid container direction="column" alignItems="flex-end" xs={8}>
              <Grid item className={classes.information} spacing={3}>
                <Typography variant="h4" className={classes.text}>
                  {`${props.user.name} ${props.user.family}`}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row-reverse"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
                className={classes.information}
              >
                <Grid item justify="center" alignItems="flex-start" xs={2}>
                  <PersonIcon style={{ fill: "gray" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6" className={classes.text}>
                    @{props.user.username}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="row-reverse"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
                className={classes.information}
              >
                <Grid item justify="center" alignItems="flex-start" xs={2}>
                  <PhoneCallbackIcon style={{ fill: "gray" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6" className={classes.text}>
                    {props.user.phone_number}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {(() => {
            if (
              (props.state.login.user_type === "user" &&
                props.user.id === props.state.login.user.id) ||
              props.state.login.user_type === "admin"
            ) {
              return [
                <Divider light variant="middle" />,
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.section}
                >
                  <Grid item>
                    <Fab
                      size="large"
                      color="primary"
                      className={classes.fab}
                      onClick={() =>
                        props.setChangePasswordDialog({
                          open: true,
                          afterClose: () => {},
                          user_type: "user",
                          user: props.user
                        })
                      }
                    >
                      <VpnKeyIcon />
                    </Fab>
                  </Grid>
                  <Grid item>
                    <Fab
                      size="large"
                      color="primary"
                      className={classes.fab}
                      onClick={() =>
                        props.setUpdateUserDialog({
                          open: true,
                          afterUpdate: () => {
                            window.location.reload();
                          },
                          user: props.user
                        })
                      }
                    >
                      <EditIcon />
                    </Fab>
                  </Grid>
                </Grid>
              ];
            }
          })()}
        </Grid>
      </Paper>
    </Container>
  );
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {
  setChangePasswordDialog,
  setUpdateUserDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
