import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

export const filterTypeSelected = (state) => state.get('filter');

export const getNotifications = (state) => state.getIn(['notifications', 'notifications'], fromJS([]));

export const getUnreadNotifications = createSelector(
  getNotifications,
  (notifications) => notifications.toJS().filter(notification => !notification.isRead)
);
