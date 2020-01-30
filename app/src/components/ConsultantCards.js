import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Container,
  Grid
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EditIcon from "@material-ui/icons/Edit";

import ConsultantCard from "./ConsultantCard";

import { setAlert } from "../redux/actions";
import { connect } from "react-redux";
import axios from "axios";
import { toDateString, toWeekdayString, toHourString } from "../utils.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: 50
  },
  container: {
    maxHeight: 1200
  },
  item: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  text: {
    textAlign: "center"
  }
}));

function ConsultantCards(props) {
  const classes = useStyles();
  const history = useHistory();

  const [isFetched, setIsFetched] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePerPage = event => {
    setPerPage(+event.target.value);
  };

  function update(force = false) {
    if (!isFetched || force) {
      axios
        .get("/consultant")
        .then(function(response) {
          const list = response.data.list;
          const meta = response.data.meta;
          setItems(list);
          setTotal(meta.total);
          setPerPage(meta.per_page);
          setPage(meta.page);
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
      setIsFetched(true);
    }
  }

  update();

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.root}>
        <Grid
          container
          direction="row-reverse"
          alignItems="stretch"
          spacing={2}
        >
          {items.map((item, index) => {
            return (
              <Grid item xs={3}>
                <ConsultantCard className={classes.paper} consultant={item} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = {
  setAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantCards);
