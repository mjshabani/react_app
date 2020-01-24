import { SET_ALERT } from '../actions/alert';


const alert = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return payload
    default:
      return state
  };
};

export default alert;