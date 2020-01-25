import React from "react";
import { Avatar, Typography, Grid, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import SchoolIcon from "@material-ui/icons/School";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  field: {
    textAlign: "right"
  },
  vertField: {
    textAlign: "right"
  },
  smallAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  largeAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9)
  },
  margin: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

function ConsultantItemList(props) {
  const history = useHistory();
  const classes = useStyles();

  function handleEdit() {}

  return (
    <Grid
      item
      onClick={() => history.push(`/consultant/${props.data.username}id`)}
    >
      <Paper className={classes.paper}>
        <Grid
          container
          className={classes.grid}
          direction="row-reverse"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={1}>
            <Typography align="center">{"#" + props.index}</Typography>
          </Grid>

          {(() => {
            console.log("props.user_type");
            console.log(props.user_type);
            if (props.user_type === "adminadmin") {
              return (
                <Grid
                  container
                  direction="row-reverse"
                  justify="space-between"
                  alignItems="center"
                  xs={11}
                >
                  <Grid item xs={1}>
                    <Avatar
                      className={classes.smallAvatar}
                      src={props.data.image}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      className={classes.field}
                    >{`${props.data.title} ${props.data.name} ${props.data.family}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.field}>
                      {props.data.summary_info}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      className={classes.menuButton}
                      color="inherit"
                      onClick={handleEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            } else {
              return (
                <Grid
                  container
                  direction="row-reverse"
                  justify="space-between"
                  alignItems="center"
                  xs={11}
                >
                  <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    xs={3}
                  >
                    <Grid item>
                      <Avatar
                        alt={props.data.name}
                        className={classes.largeAvatar}
                      />
                    </Grid>
                    <Grid item className={classes.margin}>
                      <Typography className={classes.vertField}>
                        {`${props.data.title} ${props.data.name} ${props.data.family}`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="stretch"
                    xs={8}
                  >
                    <Grid
                      item
                      container
                      direction="row-reverse"
                      justify="flex-start"
                      alignItems="flex-start"
                      className={classes.margin}
                    >
                      <Grid item xs={1}>
                        <SchoolIcon />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid item>
                          <Typography
                            variant="h6"
                            className={classes.vertField}
                          >
                            {props.data.summary_info}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row-reverse"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item xs={1}>
                        <InfoIcon />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography className={classes.vertField}>
                          {props.data.further_info}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row-reverse"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item xs={1}>
                        <HomeIcon />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography className={classes.vertField}>
                          {props.data.address}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row-reverse"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item xs={1}>
                        <PhoneCallbackIcon />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography className={classes.vertField}>
                          {props.data.phone_number}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            }
          })()}
        </Grid>
      </Paper>
    </Grid>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantItemList);
