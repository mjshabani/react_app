import {
  SET_ALERT,
  SET_LOGIN,
  SET_DRAWER,
  SET_ROUTE,
  SET_LOGIN_DIALOG,
  SET_LOGOUT_DIALOG,
  SET_REGISTER_DIALOG,
  SET_ADD_CONSULTANT_DIALOG,
  SET_CHANGE_PASSWORD_DIALOG,
  SET_UPDATE_CONSULTANT_DIALOG,
  SET_ADD_CONSULTATION_TIME_DIALOG,
  SET_UPDATE_USER_DIALOG
} from "./actions";

export const alert = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return payload;
    default:
      return state;
  }
};

export const login = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_LOGIN:
      return payload;
    default:
      return state;
  }
};

export const navigation = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_DRAWER:
      return { ...state, drawer_open: payload };
    default:
      return state;
  }
};

export const routing = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_ROUTE:
      return { ...state, route: payload };
    default:
      return state;
  }
};

export const dialog = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_LOGIN_DIALOG:
      return { ...state, login: payload };
    case SET_LOGOUT_DIALOG:
      return { ...state, logout: payload };
    case SET_REGISTER_DIALOG:
      return { ...state, register: payload };
    case SET_ADD_CONSULTANT_DIALOG:
      return { ...state, addConsultant: payload };
    case SET_CHANGE_PASSWORD_DIALOG:
      return { ...state, changePassword: payload };
    case SET_UPDATE_CONSULTANT_DIALOG:
      return { ...state, updateConsultant: payload };
    case SET_ADD_CONSULTATION_TIME_DIALOG:
      return { ...state, addConsultationTime: payload };
    case SET_UPDATE_USER_DIALOG:
      return { ...state, updateUser: payload };
    default:
      return state;
  }
};
