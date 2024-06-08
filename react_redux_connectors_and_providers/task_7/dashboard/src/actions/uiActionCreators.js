import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';
import { bindActionCreators } from 'redux';


export const login = (email, password) => ({
  type: LOGIN,
  user: { email, password }
});

export const logout = () => ({
  type: LOGOUT
});

export const displayNotificationDrawer = () => ({
  type: DISPLAY_NOTIFICATION_DRAWER
});

export const hideNotificationDrawer = () => ({
  type: HIDE_NOTIFICATION_DRAWER
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const loginRequest = (email, password) => {
  return async (dispatch) => {
    dispatch(login(email, password));
    try {
      const response = await fetch('/login-success.json');
      const data = await response.json();
      const userWithLoginStatus = { ...data, isLoggedIn: true };
      dispatch(loginSuccess(userWithLoginStatus));
    } catch (error) {
      dispatch(loginFailure());
    }
  };
};


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

export const boundLoginRequest = (dispatch) => {
  return bindActionCreators(loginRequest, dispatch);
}
