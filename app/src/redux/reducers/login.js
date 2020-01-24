import { ADD_TOKEN } from '../actions/login';


const login = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_TOKEN:
      return payload
    default:
      return state
  };
};

export default login;