import React from "react";
import { Alert as A, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { setAlert } from "../redux/actions";
import { connect } from "react-redux";

function Alert(props) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={() =>
        props.setAlert({
          open: false,
          type: props.type,
          title: props.title,
          content: props.content
        })
      }
    >
      <A variant="filled" severity={props.type}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.content}
      </A>
    </Snackbar>
  );
}
const mapStateToProps = state => {
  return state.alert;
};

const mapDispatchToProps = {
  setAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
