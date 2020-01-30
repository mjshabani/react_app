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
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EditIcon from "@material-ui/icons/Edit";

import {
  setAlert,
  setLoginDialog,
  setAddConsultantDialog,
  setChangePasswordDialog,
  setUpdateConsultantDialog
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
    maxHeight: 1200
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

  const handleAdd = () => {
    props.setAddConsultantDialog({
      open: true,
      afterClose: () => update(true)
    });
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
    let result = [
      <Fab
        size="small"
        color="primary"
        className={classes.fab}
        onClick={() => history.push(`/consultant/${item.username}`)}
      >
        <VisibilityIcon />
      </Fab>
    ];
    if (
      (props.state.login.user_type === "consultant" &&
        item.id === props.state.login.user.id) ||
      props.state.login.user_type === "admin"
    ) {
      result = result.concat([
        <Fab
          size="small"
          color="primary"
          className={classes.fab}
          onClick={() => {
            props.setChangePasswordDialog({
              open: true,
              afterClose: () => {},
              user_type: "consultant",
              user: item
            });
          }}
        >
          <VpnKeyIcon />
        </Fab>,
        <Fab
          size="small"
          color="primary"
          className={classes.fab}
          onClick={() =>
            props.setUpdateConsultantDialog({
              open: true,
              afterUpdate: () => {
                window.location.reload();
              },
              consultant: item
            })
          }
        >
          <EditIcon />
        </Fab>
      ]);
      if (props.state.login.user_type === "admin") {
        result = result.concat([
          ,
          <Fab
            size="small"
            color="secondary"
            className={classes.fab}
            onClick={handleDelete(item.id)}
          >
            <DeleteIcon />
          </Fab>
        ]);
      }
    }

    return result;
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
      label: "عنوان-نام-نام خانوادگی",
      fill: item => `${item.title} ${item.name} ${item.family}`
    },
    {
      label: "اطلاعات خلاصه",
      fill: item => item.summary_info,
      maxWidth: 80
    },
    {
      label: "اطلاعات تکمیلی",
      fill: item =>
        item.further_info.length > 20
          ? item.further_info.substring(0, 40) + "..."
          : item.further_info,
      maxWidth: 80
    },
    {
      label: "آدرس",
      fill: item =>
        item.address.length > 20
          ? item.address.substring(0, 40) + "..."
          : item.address,
      maxWidth: 80
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
    <Container maxWidth="lg">
      <Paper elevation={3} className={classes.root}>
        <Toolbar dir="rtl">
          <Typography className={classes.title} variant="h6" id="tableTitle">
            مشاوران
          </Typography>
          {props.state.login.user_type === "admin" && (
            <Fab
              className={classes.addFab}
              size="small"
              color="primary"
              onClick={handleAdd}
            >
              <AddIcon />
            </Fab>
          )}
        </Toolbar>
        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader dir="rtl">
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
  setAddConsultantDialog,
  setChangePasswordDialog,
  setUpdateConsultantDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(Consultants);
