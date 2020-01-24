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
    user_type: Cookie.get('user_type') ? Cookie.get('user_type') : '',
    username: Cookie.get('username') ? Cookie.get('username') : '',
    token: Cookie.get('token') ? Cookie.get('token') : '',
  },
  alert: {
    open: false,
    type: 'success',
    title: 'title',
    content: 'content'
  }
};

console.log('initial State : ')
console.log(initialState)

const store = createStore(reducer, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;