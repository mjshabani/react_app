import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {} from '@material-ui/core'
import {} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({

}));

function Sample(props) {
  const classes = useStyles()
  const history = useHistory()

  return ();
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sample);
