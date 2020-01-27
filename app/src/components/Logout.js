import React from "react";
import { connect } from "react-redux";

import axios from "axios";
import { setAlert, setLogin, setLogoutDialog } from "../redux/actions";

import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import {} from "@material-ui/icons";

function Logout(props) {
  const history = useHistory();

  function handleLogout() {
    axios
      .delete(`/${props.state.login.user_type}/logout`)
      .then(function(response) {
        history.push("/");
        props.setLogin_setLogoutDialog(
          {
            user_type: "",
            username: "",
            token: ""
          },
          { open: false }
        );
      })
      .catch(function(error) {
        props.setLogin_setLogoutDialog(
          {
            user_type: "",
            username: "",
            token: ""
          },
          { open: false }
        );
      });
  }

  function handleClose() {
    props.setLogoutDialog({
      open: false
    });
  }

  return (
    <Dialog
      open={props.state.dialog.logout.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"از خروج خود مطمئن هستید؟"}
      </DialogTitle>
      <DialogActions textAlign="center">
        <Button onClick={handleClose} variant="contained" color="primary">
          نه :)
        </Button>
        <Button
          onClick={() => handleLogout()}
          variant="contained"
          color="secondary"
          autoFocus
        >
          بله :/
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
    setLogoutDialog: _ => dispatch(setLogoutDialog(_)),
    setAlert: _ => dispatch(setAlert(_)),
    setLogin: _ => dispatch(setLogin(_)),
    setLogin_setLogoutDialog: (_1, _2) => {
      dispatch(setLogin(_1));
      dispatch(setLogoutDialog(_2));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
