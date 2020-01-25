import React from 'react'
import { Container, Grid, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ConsultantItemList from './ConsultantItemList'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Consultants(props) {
  const classes = useStyles();

  const [isFetched, setIsFetched] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(10)
  const [items, setItems] = React.useState([])
  const [total, setTotal] = React.useState(0)

  function update() {
    if (!isFetched) {
      axios.get('/consultant')
        .then(function (response) {
          const list = response.data.list
          const meta = response.data.meta
          setItems(list)
          setTotal(meta.total)
          setPerPage(meta.per_page)
          setPage(meta.page)
        })
        .catch(function (error) {
          if (error.response) {
            props.setAlert(true, 'error', 'Bad Request', error.response.data)
          }
        });
      setIsFetched(true)
    }
  }

  update()

  return (
    <Container maxWidth="sm" >
      <Grid container spacing={3} flexGrow={1}>
        <Grid item xs={12} >
          {items.map((item, index) => (
            <ConsultantItemList data={item} index={index + (page - 1)*perPage + 1} user_type={props.login.user_type} />
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Consultants)
