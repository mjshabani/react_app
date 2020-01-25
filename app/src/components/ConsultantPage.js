// import React from "react";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Login from "../components/Login";
// import axios from "axios";
// import { connect } from "react-redux";
// import { addToken } from "../redux/actions/login";
// import { setAlert } from "../redux/actions/alert";

// const useStyles = makeStyles(theme => ({

// }));

// function ConsultantPage(props) {
//   const classes = useStyles();

//   function onClick(username, password) {
//     axios
//       .post("/admin/login", {
//         username: username,
//         password: password
//       })
//       .then(function(response) {
//         props.addToken("admin", username, response.data.secret_key);
//       })
//       .catch(function(error) {
//         if (error.response) {
//           props.setAlert(
//             true,
//             "error",
//             "Authentication Failed",
//             error.response.data
//           );
//         }
//       });
//   }

//   return (
//     <Container maxWidth="sm">

//     <Container>
//   );
// }

// const mapStateToProps = state => {
//   return state;
// };

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(ConsultantPage);
