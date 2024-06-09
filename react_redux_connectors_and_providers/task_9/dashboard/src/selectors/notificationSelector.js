import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const filterTypeSelected = (state) => {
  return state.getIn(['notifications', 'filter']);
};

export const getNotifications = (state) => state.getIn(['notifications', 'notifications'], fromJS([]));

export const getUnreadNotificationsByType = createSelector(
  [filterTypeSelected, getNotifications],
  (filter, notifications) => {

    const unreadNotifications = notifications.toJS().filter(notification => notification.context && !notification.context.isRead);

    if (filter === 'URGENT') {
      return unreadNotifications.filter(notification => notification.type === 'urgent');
    }
    return unreadNotifications;
  }
);
