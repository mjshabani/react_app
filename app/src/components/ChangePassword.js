import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

import { setChangePasswordDialog, setAlert } from "../redux/actions";

function ChangePassword(props) {
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const handleClose = () => {
    props.state.dialog.changePassword.afterClose();
    props.setChangePasswordDialog({
      open: false,
      afterClose: () => {},
      user_type: "",
      user: {}
    });
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }

  function handleChangePassword(password, passwordConfirm) {
    if (passwordConfirm === password) {
      let url = `/${props.state.dialog.changePassword.user_type}/${props.state.dialog.changePassword.user.id}/change_password`;
      axios
        .put(url, {
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
              title: "Bad Request",
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
      open={props.state.dialog.changePassword.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" dir="rtl">
        تغییر رمز کاربر : {props.state.dialog.changePassword.user.family}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          className="ChangePassword"
          spacing={1}
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
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
          onClick={() => handleChangePassword(password, passwordConfirm)}
          variant="contained"
          color="primary"
        >
          تأیید
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {
  setChangePasswordDialog,
  setAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
