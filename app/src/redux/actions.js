import Cookie from "js-cookie";

export const SET_ALERT = "SET_ALERT";
export const setAlert = payload => ({
  type: SET_ALERT,
  payload: payload
});

export const SET_LOGIN = "SET_LOGIN";
export const setLogin = payload => {
  Cookie.set("user_type", payload.user_type);
  Cookie.set("user", payload.user);
  Cookie.set("token", payload.token);
  return {
    type: SET_LOGIN,
    payload: payload
  };
};

export const SET_DRAWER = "SET_DRAWER";
export const setDrawer = open => ({
  type: SET_DRAWER,
  payload: open
});

export const SET_ROUTE = "SET_ROUTE";
export const setRoute = route => ({
  type: SET_ROUTE,
  payload: route
});

export const SET_LOGIN_DIALOG = "SET_LOGIN_DIALOG";
export const setLoginDialog = payload => ({
  type: SET_LOGIN_DIALOG,
  payload: payload
});

export const SET_LOGOUT_DIALOG = "SET_LOGOUT_DIALOG";
export const setLogoutDialog = payload => ({
  type: SET_LOGOUT_DIALOG,
  payload: payload
});

export const SET_REGISTER_DIALOG = "SET_REGISTER_DIALOG";
export const setRegisterDialog = payload => ({
  type: SET_REGISTER_DIALOG,
  payload: payload
});

export const SET_ADD_CONSULTANT_DIALOG = "SET_ADD_CONSULTANT_DIALOG";
export const setAddConsultantDialog = payload => ({
  type: SET_ADD_CONSULTANT_DIALOG,
  payload: payload
});

export const SET_CHANGE_PASSWORD_DIALOG = "SET_CHANGE_PASSWORD_DIALOG";
export const setChangePasswordDialog = payload => ({
  type: SET_CHANGE_PASSWORD_DIALOG,
  payload: payload
});

export const SET_UPDATE_CONSULTANT_DIALOG = "SET_UPDATE_CONSULTANT_DIALOG";
export const setUpdateConsultantDialog = payload => ({
  type: SET_UPDATE_CONSULTANT_DIALOG,
  payload: payload
});

export const SET_ADD_CONSULTATION_TIME_DIALOG =
  "SET_ADD_CONSULTATION_TIME_DIALOG";
export const setAddConsultationTimeDialog = payload => ({
  type: SET_ADD_CONSULTATION_TIME_DIALOG,
  payload: payload
});

export const SET_UPDATE_USER_DIALOG = "SET_UPDATE_USER_DIALOG";
export const setUpdateUserDialog = payload => ({
  type: SET_UPDATE_USER_DIALOG,
  payload: payload
});
