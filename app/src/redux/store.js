import { createStore, combineReducers } from 'redux';
import admin from './reducers/admin';


const reducer = combineReducers({
  admin: admin
}
);

const initialState = {
  admin: {
    username: "admin",
    secret_key: "",
  }
};

const store = createStore(reducer, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;