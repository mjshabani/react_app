import React from 'react'
import { Alert as A, AlertTitle } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'
import { setAlert } from '../redux/actions/alert'
import { connect } from 'react-redux'

class Alert extends React.Component {
  render() {
    return (

      <Snackbar open={this.props.open} autoHideDuration={3000} 
          onClose={() => this.props.setAlert(false, this.props.type, this.props.title, this.props.content)}>
        <A severity={this.props.type}>
          <AlertTitle>{this.props.title}</AlertTitle>
          {this.props.content}
        </A>
      </Snackbar>
    );
  }
}
const mapStateToProps = state => {
  return state.alert;
};

const mapDispatchToProps = {
  setAlert
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert)
