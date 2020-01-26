import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { login, alert, navigation, routing, dialog } from "./reducers";
import Cookie from "js-cookie";

const reducer = combineReducers({
  login: login,
  alert: alert,
  navigation: navigation,
  routing: routing,
  dialog: dialog
});

const initialState = {
  login: {
    user_type: Cookie.get("user_type") ? Cookie.get("user_type") : "",
    username: Cookie.get("username") ? Cookie.get("username") : "",
    token: Cookie.get("token") ? Cookie.get("token") : ""
  },
  alert: {
    open: false,
    type: "success",
    title: "title",
    content: "content"
  },
  navigation: {
    drawer_open: false
  },
  dialog: {
    login: {
      open: false,
      user_type: ""
    },
    logout: {
      open: false
    },
    register: {
      open: false,
      step: 1
    }
  }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;
