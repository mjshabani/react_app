import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

import { setLoginDialog, setAlert, setLogin } from "../redux/actions";

function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClose = () => {
    props.setLoginDialog({
      open: false,
      user_type: ""
    });
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function onClick(username, password) {
    axios
      .post(`/${props.state.dialog.login.user_type}/login`, {
        username: username,
        password: password
      })
      .then(function(response) {
        switch (props.state.dialog.login.user_type) {
          case "admin":
            props.setLogin_setLoginDialog(
              {
                user_type: "admin",
                user: response.data,
                token: response.data.secret_key
              },
              { open: false, user_type: "" }
            );

            break;
          case "user":
            props.setLogin_setLoginDialog(
              {
                user_type: "user",
                user: response.data,
                token: response.data.access_token
              },
              {
                open: false,
                user_type: ""
              }
            );
            break;
          case "consultant":
            props.setLogin_setLoginDialog(
              {
                user_type: "consultant",
                user: response.data,
                token: response.data.access_token
              },
              {
                open: false,
                user_type: ""
              }
            );
            break;
          default:
            break;
        }
        props.setLoginDialog({
          open: false,
          user_type: ""
        });
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
    <Dialog
      open={props.state.dialog.login.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" dir="rtl">
        ورود
        {
          { user: " کاربر", consultant: " مشاور", admin: " مدیر" }[
            props.state.dialog.login.user_type
          ]
        }
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          className="Login"
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          لغو
        </Button>
        <Button
          onClick={() => onClick(username, password)}
          variant="contained"
          color="primary"
        >
          ورود
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
    setLoginDialog: _ => dispatch(setLoginDialog(_)),
    setAlert: _ => dispatch(setAlert(_)),
    setLogin: _ => dispatch(setLogin(_)),
    setLogin_setLoginDialog: (_1, _2) => {
      dispatch(setLogin(_1));
      dispatch(setLoginDialog(_2));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
