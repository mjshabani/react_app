import React from "react";
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
  Container
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import { setAlert, setLoginDialog } from "../redux/actions";
import { connect } from "react-redux";
import axios from "axios";
import { toDateString, toWeekdayString, toHourString } from "../utils.js";

const StyledTableCell = withStyles(theme => ({
  head: {
    fontSize: 18,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 800
  },
  fab: {
    margin: 5
  },
  addFab: {
    margin: 10,
    marginLeft: 20
  }
});

function Consultants(props) {
  const classes = useStyles();

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

  const handleDelete = id => () => {
    if (props.state.login.user_type === "admin") {
      axios
        .delete(`/consultant/${id}`)
        .then(function(response) {
          update(true);
          props.setAlert({
            open: true,
            type: "info",
            title: "Success",
            content: ""
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
          }
        });
    } else {
      props.setLoginDialog({
        open: true,
        user_type: "user"
      });
    }
  };

  const handleReserve = id => () => {
    if (props.state.login.user_type === "admin") {
      axios
        .post("/reservation", {
          consultant: id
        })
        .then(function(response) {
          update(true);
          props.setAlert({
            open: true,
            type: "info",
            title: "Success",
            content: ""
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
          }
        });
    } else {
      props.setLoginDialog({
        open: true,
        user_type: "user"
      });
    }
  };

  const actions = item => {
    if (props.state.login.user_type === "admin") {
      return [
        <Fab size="small" color="primary" className={classes.fab}>
          <EditIcon />
        </Fab>,
        <Fab
          size="small"
          color="secondary"
          className={classes.fab}
          onClick={handleDelete(item.id)}
        >
          <DeleteIcon />
        </Fab>
      ];
    }
  };

  const columns = [
    {
      label: "#",
      minWidth: 10
    },
    {
      label: "عنوان",
      fill: item => item.title
    },
    {
      label: "نام",
      fill: item => item.name
    },
    {
      label: "نام‌خانوادگی",
      fill: item => item.family
    },
    {
      label: "اطلاعات خلاصه",
      fill: item => item.summary_info
    },
    {
      label: "اطلاعات تکمیلی",
      fill: item => item.further_info
    },
    {
      label: "آدرس",
      fill: item => item.address
    },
    {
      label: "تلفن",
      fill: item => item.phone_number
    },
    {
      label: "",
      minWidth: 0,
      fill: actions
    }
  ];

  function update(force = false) {
    if (!isFetched || force) {
      axios
        .get("/consultant")
        .then(function(response) {
          console.log(response.data);

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
          }
        });
      setIsFetched(true);
    }
  }

  update();

  return (
    <Container maxWidth="lg">
      {props.state.login.user_type === "admin" && (
        <Fab className={classes.addFab} color="primary">
          <AddIcon />
        </Fab>
      )}
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table" dir="rtl">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <StyledTableCell
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <StyledTableCell align="center">
                      {index + 1}
                    </StyledTableCell>
                    {columns.slice(1, columns.length).map(columns => (
                      <StyledTableCell align="center">
                        {columns.fill(item)}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={total}
          rowsPerPage={perPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangePerPage}
        />
      </Paper>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = {
  setAlert,
  setLoginDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(Consultants);
