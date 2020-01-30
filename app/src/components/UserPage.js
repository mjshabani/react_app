import React from "react";
import { connect } from "react-redux";
import { setAlert } from "../redux/actions";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import {} from "@material-ui/icons";

import UserInfo from "./UserInfo";
import Reservations from "./Reservations";

const useStyles = makeStyles(theme => ({}));

function UserPage(props) {
  const classes = useStyles();
  const history = useHistory();

  const [isFetched, setIsFetched] = React.useState(false);
  const [isFetchedCompletely, setIsFetchedCompletely] = React.useState(false);
  const [user, setUser] = React.useState({});

  let { user_id } = useParams();

  const update = (force = false) => {
    if (!isFetched || force) {
      axios
        .get(`/user/${user_id}`)
        .then(response => {
          setUser(response.data);
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
        <UserInfo user={user} />,
        <Reservations hideUsers filter={{ user: user.id }} />
      ]}
    </Container>
  );
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = { setAlert };

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
