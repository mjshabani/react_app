import React from "react";
import { connect } from "react-redux";
import {
  setChangePasswordDialog,
  setUpdateConsultantDialog
} from "../redux/actions";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import SchoolIcon from "@material-ui/icons/School";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EditIcon from "@material-ui/icons/Edit";

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
    width: "100%"
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
    marginTop: 30,
    marginBottom: 30
  },
  information: {
    marginTop: 5,
    marginBottom: 5
  },
  fab: {
    margin: 5
  }
}));

function ConsultantInfo(props) {
  const classes = useStyles();
  const history = useHistory();

  const informations = [
    {
      icon: <InfoIcon style={{ fill: "gray" }} />,
      text: props.consultant.further_info
    },
    {
      icon: <HomeIcon style={{ fill: "gray" }} />,
      text: props.consultant.address
    },
    {
      icon: <PhoneCallbackIcon style={{ fill: "gray" }} />,
      text: props.consultant.phone_number
    }
  ];

  return (
    <Container maxWidth="md" className={classes.container}>
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
              xs={2}
            >
              <Grid item>
                <Avatar
                  src={props.consultant.image}
                  className={classes.largeAvatar}
                />
              </Grid>
            </Grid>
            <Grid container direction="column" alignItems="stretch" xs={8}>
              <Grid item className={classes.information}>
                <Typography variant="h4" className={classes.text}>
                  {`${props.consultant.title} ${props.consultant.name} ${props.consultant.family}`}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row-reverse"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.information}
              >
                <Typography variant="h6" className={classes.text}>
                  {props.consultant.summary_info}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider light variant="middle" />
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            className={classes.section}
          >
            {informations.map(info => (
              <Grid
                container
                direction="row-reverse"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.information}
              >
                <Grid container justify="center" alignItems="flex-start" xs={2}>
                  <Grid item>{info.icon}</Grid>
                </Grid>
                <Grid item xs={10}>
                  <Typography className={classes.text}>{info.text}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
          {(() => {
            if (
              (props.state.login.user_type === "consultant" &&
                props.consultant.id === props.state.login.user.id) ||
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
                          user_type: "consultant",
                          user: props.consultant
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
                        props.setUpdateConsultantDialog({
                          open: true,
                          afterUpdate: () => {
                            window.location.reload();
                          },
                          consultant: props.consultant
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
  setUpdateConsultantDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantInfo);
