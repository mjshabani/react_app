import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
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
import { connect } from "react-redux";
import ConsultationTimeItemList from "./ConsultationTimeItemList";
import axios from "axios";

const columns = [
  {
    id: "index",
    label: "#",
    minWidth: 20,
    align: "center",
    format: value => value.toLocaleString()
  },
  {
    id: "consultant",
    label: "مشاور",
    minWidth: 80,
    align: "center",
    format: value => value.toLocaleString()
  },
  {
    id: "begin_time",
    label: "تاریخ",
    minWidth: 80,
    align: "center",
    format: value => value.toLocaleString()
  },
  {
    id: "duration",
    label: "مدت‌زمان",
    minWidth: 50,
    align: "center",
    format: value => value.toFixed(2)
  },
  {
    id: "status",
    label: "وضعیت",
    minWidth: 80,
    align: "center",
    format: value => value.toFixed(2)
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

function ConsultationTimes(props) {
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

  function update() {
    if (!isFetched) {
      axios
        .get("/consultation_time")
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
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table" dir="rtl">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.code}>
                    <TableCell key="index" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell key="consultant" align="center">
                      {`${item.consultant.title} ${item.consultant.name} ${item.consultant.family}`}
                    </TableCell>
                    <TableCell key="begin_time" align="center">
                      {item.begin_time}
                    </TableCell>
                    <TableCell key="duration" align="center">
                      {`${item.duration}'`}
                    </TableCell>
                    <TableCell key="status" align="center">
                      {item.status === 0 ? (
                        <Button variant="contained" color="primary">
                          رزرو
                        </Button>
                      ) : (
                        <Button variant="contained" disabled color="secondary">
                          رزرو شده
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          perPageOptions={[10, 25, 100]}
          component="div"
          count={items.length}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationTimes);
