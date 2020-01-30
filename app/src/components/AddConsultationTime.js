import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
// import from '../uitls'

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";

import { setAddConsultationTimeDialog, setAlert } from "../redux/actions";

function AddConsultationTime(props) {
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState("");
  const [duration, setDuration] = React.useState("");

  const handleClose = () => {
    props.state.dialog.addConsultationTime.afterClose();
    props.setAddConsultationTimeDialog({
      open: false,
      afterClose: () => {},
      consultant: ""
    });
  };

  function handleTimeChange(time) {
    setTime(time);
  }
  function handleDurationChange(e) {
    setDuration(e.target.value);
  }
  function handleDateChange(date) {
    setDate(date);
  }

  function onClick(date, time, duration) {
    axios
      .post("/consultation_time", {
        begin_time: `${date
          .toISOString()
          .substring(0, 10)}T${time.toLocaleTimeString("en-GB")}`,
        duration: parseInt(duration),
        consultant: props.state.dialog.addConsultationTime.consultant
      })
      .then(function(response) {
        handleClose();
      })
      .catch(function(error) {
        if (error.response) {
          props.setAlert({
            open: true,
            type: "error",
            title: "Authentication Failed",
            content: error.response.data
          });
        } else {
          props.setAlert({
            open: true,
            type: "error",
            title: "ارتباط با سرور برقرار نیست.",
            content: ""
          });
        }
      });
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog
        open={props.state.dialog.addConsultationTime.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" dir="rtl">
          ایجاد زمان مشاوره
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            className="AddConsultationTime"
            spacing={1}
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <KeyboardDatePicker
                label="Date"
                format="yyyy/MM/dd"
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item>
              <KeyboardTimePicker
                mode="24h"
                id="time-picker"
                label="Time"
                onChange={handleTimeChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="duration"
                type="number"
                label="Duration"
                onChange={handleDurationChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            لغو
          </Button>
          <Button
            onClick={() => onClick(date, time, duration)}
            variant="contained"
            color="primary"
          >
            ایجاد
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {
  setAddConsultationTimeDialog,
  setAlert
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddConsultationTime);
