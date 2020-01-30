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
    user: Cookie.get("user") ? JSON.parse(Cookie.get("user")) : {},
    token: Cookie.get("token") ? Cookie.get("token") : ""
  },
  alert: {
    open: false,
    type: "success",
    title: "title",
    content: "content"
  },
  navigation: {
    drawer_open: true
  },
  dialog: {
    login: {
      open: false,
      user_type: "",
      user: {}
    },
    logout: {
      open: false
    },
    register: {
      open: false,
      step: 1
    },
    addConsultant: {
      open: false,
      afterClose: () => {}
    },
    changePassword: {
      open: false,
      afterClose: () => {},
      user_type: "",
      user: {}
    },
    updateConsultant: {
      open: false,
      afterUpdate: () => {},
      consultant: {}
    },
    addConsultationTime: {
      open: false,
      afterClose: () => {},
      consultant: ""
    },
    updateUser: {
      open: false,
      afterUpdate: () => {},
      user: {}
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
