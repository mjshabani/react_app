import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/icons";
import { Container, Typography, Link, Grid, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

const footers = [
  {
    title: "پیوند‌ها",
    description: ["Team", "History", "Contact us", "Locations"]
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one"
    ]
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource"
    ]
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"]
  }
];

function Footer(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container
      maxWidth="md"
      component="footer"
      className={classes.footer}
    ></Container>
  );
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
