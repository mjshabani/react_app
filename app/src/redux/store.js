import { createStore, combineReducers } from 'redux';
import login from './reducers/login';
import alert from './reducers/alert'
import Cookie from 'js-cookie'


const reducer = combineReducers({
  login: login,
  alert: alert
}
);

const initialState = {
  login: {
    user_type: Cookie.get('user_type') ? Cookie.get('user_type') : 'admin',
    username: Cookie.get('username') ? Cookie.get('username') : 'admin',
    token: Cookie.get('token') ? Cookie.get('token') : 'token',
  },
  alert: {
    open: false,
    type: 'success',
    title: 'title',
    content: 'content'
  }
};

const store = createStore(reducer, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;