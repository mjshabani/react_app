import React from "react";
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

import {
  setAlert,
  setLoginDialog,
  setAddConsultationTimeDialog
} from "../redux/actions";
import { useHistory } from "react-router-dom";
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

function ConsultationTimes(props) {
  const classes = useStyles();
  const history = useHistory();

  const [isFetched, setIsFetched] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [params, setParams] = React.useState(-1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePerPage = event => {
    setPerPage(+event.target.value);
  };

  const handleDelete = id => () => {
    if (["admin", "consultant"].includes(props.state.login.user_type)) {
      axios
        .delete(`/consultation_time/${id}`)
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

  const handleReserve = id => () => {
    if (props.state.login.user_type === "user") {
      axios
        .post("/reservation", {
          consultation_time: id
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
        user_type: "user"
      });
    }
  };

  const actions = item => {
    if (
      (props.state.login.user_type === "consultant" &&
        item.consultant.id === props.state.login.user.id) ||
      props.state.login.user_type === "admin"
    ) {
      return [
        <Fab
          size="small"
          color="secondary"
          disabled={item.status === 1}
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
    props.hideConsultants
      ? {
          label: "",
          minWidth: 0,
          fill: () => {}
        }
      : {
          label: "مشاور",
          minWidth: 80,
          fill: item => (
            <div
              onClick={() =>
                history.push(`/consultant/${item.consultant.username}`)
              }
            >
              {`${item.consultant.title} ${item.consultant.name} ${item.consultant.family}`}
            </div>
          )
        },
    {
      label: "روز",
      fill: item => toWeekdayString(item.begin_time)
    },
    {
      label: "تاریخ",
      fill: item => toDateString(item.begin_time)
    },
    {
      label: "ساعت",
      fill: item => toHourString(item.begin_time)
    },
    {
      label: "مدت‌زمان",
      fill: item => item.duration.toLocaleString("fa-IR")
    },
    {
      label: "وضعیت",
      fill: item =>
        item.status === 0 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleReserve(item.id)}
          >
            رزرو
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              props.setAlert({
                open: true,
                type: "error",
                title: "این زمان توسط شخص دیگری رزرو شده است.",
                content: ""
              });
            }}
          >
            رزرو شده
          </Button>
        )
    },
    {
      label: "",
      minWidth: 0,
      fill: actions
    }
  ];

  function update(force = false) {
    let newParams = props.filter !== undefined ? props.filter : {};
    if (
      !isFetched ||
      force ||
      JSON.stringify(newParams) !== JSON.stringify(params)
    ) {
      axios
        .get("/consultation_time", {
          params: newParams
        })
        .then(function(response) {
          const list = response.data.list;
          console.log(list);
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
      setParams(newParams);
    }
  }

  update();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} className={classes.root}>
        <Toolbar dir="rtl">
          <Typography className={classes.title} variant="h6" id="tableTitle">
            زمان‌های مشاوره
          </Typography>
          {props.filter !== undefined &&
            ((props.state.login.user_type === "consultant" &&
              props.filter.consultant === props.state.login.user.id) ||
              props.state.login.user_type === "admin") && (
              <Fab
                className={classes.addFab}
                color="primary"
                size="small"
                onClick={() => {
                  props.setAddConsultationTimeDialog({
                    open: true,
                    afterClose: () => {
                      update(true);
                    },
                    consultant:
                      props.filter !== undefined ? props.filter.consultant : ""
                  });
                }}
              >
                <AddIcon />
              </Fab>
            )}
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
  setAddConsultationTimeDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationTimes);
