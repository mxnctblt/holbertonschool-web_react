import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from "./uiActionTypes";
import { bindActionCreators } from "redux";


export const login = (email, password) => {
  return {
    type: LOGIN,
    user: { email, password },
  };
}

export const logout = () => {
  return {
    type: LOGOUT,
  };
}

export const displayNotificationDrawer = () => {
  return {
    type: DISPLAY_NOTIFICATION_DRAWER,
  };
}

export const hideNotificationDrawer = () => {
  return {
    type: HIDE_NOTIFICATION_DRAWER,
  };
}

export const boundLogin = (dispatch) => {
  return bindActionCreators(login, dispatch);
}

export const boundLogout = (dispatch) => {
  return bindActionCreators(logout, dispatch);
}

export const boundDisplayNotificationDrawer = (dispatch) => {
  return bindActionCreators(displayNotificationDrawer, dispatch);
}

export const boundHideNotificationDrawer = (dispatch) => {
  return bindActionCreators(hideNotificationDrawer, dispatch);
}
