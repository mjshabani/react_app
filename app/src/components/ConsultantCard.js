import React from "react";
import { connect } from "react-redux";
import {} from "../redux/actions";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import SchoolIcon from "@material-ui/icons/School";

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
    flexGrow: 1,
    height: "100%"
  },
  grid: {
    padding: 10
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  text: {
    textAlign: "right"
  },
  section: {
    marginTop: 5,
    marginBottom: 5
  },
  information: {
    spacing: theme.spacing(10),
    marginTop: 5,
    marginBottom: 5
  },
  text: {
    textAlign: "right",
    fontSize: 14
  },
  title: {
    textAlign: "center"
  },
  divider: {
    marginTop: 5,
    marginBottom: 10
  }
}));

function ConsultantCard(props) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = () => {
    history.push(`/consultant/${props.consultant.username}`);
  };

  const informations = [
    {
      icon: <InfoIcon style={{ fill: "gray" }} />,
      text: props.consultant.summary_info
    },
    {
      icon: <HomeIcon style={{ fill: "gray" }} />,
      text: props.consultant.address
        .split(/[،\.]+/)
        .slice(0, 2)
        .join()
    },
    {
      icon: <PhoneCallbackIcon style={{ fill: "gray" }} />,
      text: props.consultant.phone_number
    }
  ];

  return (
    <Paper elevation={3} className={classes.paper} onClick={onClick}>
      <Grid
        container
        className={classes.grid}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.section}
        >
          <Grid item>
            <Avatar
              src={props.consultant.image}
              className={classes.largeAvatar}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            {`${props.consultant.title} ${props.consultant.name} ${props.consultant.family}`}
          </Typography>
          <Divider className={classes.divider} />
        </Grid>
        {informations.map(info => (
          <Grid
            container
            direction="row-reverse"
            justify="space-around"
            alignItems="flex-start"
            className={classes.information}
          >
            <Grid container justify="center" alignItems="flex-start" xs={2}>
              <Grid item>{info.icon}</Grid>
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.text}>
                {info.text.length > 30
                  ? info.text.substring(0, 30) + "..."
                  : info.text}
              </Typography>
            </Grid>{" "}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantCard);
