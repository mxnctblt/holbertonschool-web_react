import uiReducer from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER, SELECT_COURSE } from '../actions/uiActionTypes';


describe('uiReducer', () => {
  it('should return the initial state when no action is passed', () => {
    const state = uiReducer(undefined, {});
    expect(state).toEqual({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: {}
    });
  });

  it('should return the initial state when the action SELECT_COURSE is passed', () => {
    const state = uiReducer(undefined, { type: SELECT_COURSE });
    expect(state).toEqual({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: {}
    });
  });

  it('should change isNotificationDrawerVisible property when DISPLAY_NOTIFICATION_DRAWER action is passed', () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state).toEqual({
      isNotificationDrawerVisible: true,
      isUserLoggedIn: false,
      user: {}
    });
  });
});
