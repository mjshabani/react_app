import { ADD_SECRET_KEY } from '../actions/admin';


const admin = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_SECRET_KEY:
      const {username, secret_key} = payload;
      
      return {
        username: username,
        secret_key: secret_key
      }
    default:
      return state
  };
};

export default admin;