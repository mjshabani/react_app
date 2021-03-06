import React from "react";
import { connect } from "react-redux";
import { setAlert } from "../redux/actions";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import {} from "@material-ui/icons";

import ConsultantInfo from "./ConsultantInfo";
import ConsultationTimes from "./ConsultationTimes";

const useStyles = makeStyles(theme => ({}));

function ConsultantPage(props) {
  const classes = useStyles();
  const history = useHistory();

  const [isFetched, setIsFetched] = React.useState(false);
  const [isFetchedCompletely, setIsFetchedCompletely] = React.useState(false);
  const [consultant, setConsultant] = React.useState({});

  let { consultant_username } = useParams();

  const update = (force = false) => {
    if (!isFetched || force) {
      axios
        .get(`/consultant/${consultant_username}`)
        .then(response => {
          setConsultant(response.data);
          setIsFetchedCompletely(true);
        })
        .catch(error => {
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
          setIsFetchedCompletely(true);
        });
      setIsFetched(true);
    }
  };

  update();

  return (
    <Container maxWidth="md">
      {isFetchedCompletely && [
        <ConsultantInfo consultant={consultant} />,
        <ConsultationTimes
          hideConsultants
          filter={{ consultant: consultant.id }}
        />
      ]}
    </Container>
  );
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = { setAlert };

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantPage);
