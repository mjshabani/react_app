import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

import { setAddConsultantDialog, setAlert } from "../redux/actions";

function AddConsultant(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const handleClose = () => {
    props.state.dialog.addConsultant.afterClose();
    props.setAddConsultantDialog({
      open: false,
      afterClose: () => {}
    });
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function onClick(username, password, passwordConfirm) {
    if (passwordConfirm === password) {
      axios
        .post("/consultant", {
          username: username,
          password: password
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
    } else {
      props.setAlert({
        open: true,
        type: "error",
        title: "گذرواژه را مجددا وارد نمایید.",
        content: ""
      });
    }
  }

  return (
    <Dialog
      open={props.state.dialog.addConsultant.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" dir="rtl">
        ایجاد حساب کاربری مشاور
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          className="AddConsultant"
          spacing={1}
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <TextField
              id="username"
              label="َUsername"
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              type="password"
              label="Password"
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password_confirm"
              type="password"
              label="Confirm Password"
              onChange={handlePasswordConfirmChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          لغو
        </Button>
        <Button
          onClick={() => onClick(username, password, passwordConfirm)}
          variant="contained"
          color="primary"
        >
          ایجاد
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => {
  return {
    setAddConsultantDialog: _ => dispatch(setAddConsultantDialog(_)),
    setAlert: _ => dispatch(setAlert(_))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddConsultant);
