import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  Fab,
  Paper,
  Typography,
  Toolbar,
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import {
  setAlert,
  setLoginDialog,
  setChangePasswordDialog,
  setUpdateUserDialog
} from "../redux/actions";
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
    maxHeight: 1000
  },
  fab: {
    margin: 5
  },
  addFab: {
    margin: 10,
    marginLeft: 20
  }
});

function Users(props) {
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

  const handleDelete = id => () => {
    if (props.state.login.user_type === "admin") {
      axios
        .delete(`/user/${id}`)
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
          } else {
            props.setAlert({
              open: true,
              type: "error",
              title: "ارتباط با سرور برقرار نیست.",
              content: ""
            });
          }
        });
    } else {
      props.setLoginDialog({
        open: true,
        user_type: "admin"
      });
    }
  };

  const actions = item => {
    if (props.state.login.user_type === "admin") {
      return [
        <Fab
          size="small"
          color="primary"
          className={classes.fab}
          onClick={() => history.push(`/user/${item.id}`)}
        >
          <VisibilityIcon />
        </Fab>,
        <Fab
          size="small"
          color="primary"
          className={classes.fab}
          onClick={() =>
            props.setUpdateUserDialog({
              open: true,
              afterUpdate: () => {
                window.location.reload();
              },
              user: item
            })
          }
        >
          <EditIcon />
        </Fab>,
        <Fab
          size="small"
          color="primary"
          className={classes.fab}
          onClick={() => {
            props.setChangePasswordDialog({
              open: true,
              afterClose: () => {},
              user_type: "user",
              user: item
            });
          }}
        >
          <VpnKeyIcon />
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
      label: "نام کاربری",
      fill: item => item.username
    },
    {
      label: "نام",
      fill: item => item.name
    },
    {
      label: "نام خانوادگی",
      fill: item => item.family
    },
    {
      label: "شماره همراه",
      fill: item => item.phone_number,
      maxWidth: 80
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
        .get("/user")
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
    <Container maxWidth="md">
      <Paper elevation={3} className={classes.root}>
        <Toolbar dir="rtl">
          <Typography className={classes.title} variant="h6" id="tableTitle">
            کاربران
          </Typography>
        </Toolbar>

        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader aria-label="sticky table" dir="rtl">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <StyledTableCell
                    align="center"
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth
                    }}
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
                    {columns.slice(1, columns.length).map(column => (
                      <StyledTableCell
                        align="center"
                        style={{
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth
                        }}
                      >
                        {column.fill(item)}
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
  setLoginDialog,
  setChangePasswordDialog,
  setUpdateUserDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
