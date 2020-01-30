import React from "react";
import { connect } from "react-redux";

import axios from "axios";
import { setAlert, setLogin, setRegisterDialog } from "../redux/actions";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import {} from "@material-ui/icons";

function Register(props) {
  const [username, setUsername] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [longCode, setLongCode] = React.useState("");
  const [shortCode, setShortCode] = React.useState("");

  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.target.value);
  }
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handleShorCodeChange(e) {
    setShortCode(e.target.value);
  }

  function handleRegister() {
    axios
      .post("/user/register", {
        username: username,
        phone_number: phoneNumber
      })
      .then(function(response) {
        setLongCode(response.data.long_code);
        props.setRegisterDialog({
          open: true,
          step: 1
        });
      })
      .catch(function(error) {
        if (error.response) {
          props.setAlert({
            open: true,
            type: "error",
            title: "BadRequest",
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

  function handleVerify() {
    axios
      .put("/user/verify", {
        short_code: shortCode,
        long_code: longCode
      })
      .then(function(response) {
        setTimeout(() => {
          props.setAlert({
            open: true,
            type: "info",
            title: "اطلاعات کاربری و گذرواژه خود را بروز کنید.",
            content: ""
          });
        }, 100);
        props.setLogin_setRegisterDialog(
          {
            user_type: "user",
            user: response.data,
            token: response.data.access_token
          },
          {
            open: false,
            step: 0
          }
        );
      })
      .catch(function(error) {
        if (error.response) {
          props.setAlert({
            open: true,
            type: "error",
            title: "BadRequest",
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

  function handleClose() {
    props.setRegisterDialog({
      open: false,
      step: 0
    });
  }

  return (
    <Dialog
      open={props.state.dialog.register.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="form-dialog-title" dir="rtl">
        ثبت نام
      </DialogTitle>
      {props.state.dialog.register.step === 0
        ? [
            <DialogContent>
              <DialogContentText dir="rtl">
                شماره همراه خود را به همراه 0 وارد کنید.
                <br />
                همچنین نام کاربری شما باید حداقل شامل 5 حرف باشد.
              </DialogContentText>
              <TextField
                margin="dense"
                id="phone_number"
                label="Phone Number"
                type="text"
                fullWidth
                onChange={handlePhoneNumberChange}
              />
              <TextField
                margin="dense"
                id="username"
                label="Username"
                type="text"
                fullWidth
                onChange={handleUsernameChange}
              />
            </DialogContent>,
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                لغو
              </Button>
              <Button
                onClick={handleRegister}
                variant="contained"
                color="primary"
              >
                تایید
              </Button>
            </DialogActions>
          ]
        : [
            <DialogContent>
              <DialogContentText dir="rtl">
                کد ارسال شده به تلفن همراه خود را وارد کنید.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="short_code"
                label="Code"
                type="text"
                fullWidth
                onChange={handleShorCodeChange}
              />
            </DialogContent>,
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                لغو
              </Button>
              <Button
                onClick={handleVerify}
                variant="contained"
                color="primary"
              >
                تایید
              </Button>
            </DialogActions>
          ]}
    </Dialog>
  );
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => {
  return {
    setRegisterDialog: _ => dispatch(setRegisterDialog(_)),
    setAlert: _ => dispatch(setAlert(_)),
    setLogin: _ => dispatch(setLogin(_)),
    setLogin_setRegisterDialog: (_1, _2) => {
      dispatch(setLogin(_1));
      dispatch(setRegisterDialog(_2));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
