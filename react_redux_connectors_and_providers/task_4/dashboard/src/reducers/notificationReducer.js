import { Map } from 'immutable';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER } from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

// État initial
const initialState = Map({
  notifications: Map(),
  filter: 'DEFAULT'
});

// Réducteur de notifications
const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const normalizedData = notificationsNormalizer(action.data);
      const notifications = normalizedData.entities.notifications;
      Object.keys(notifications).forEach(id => {
        notifications[id].isRead = false;
      });
      return state.set('notifications', notifications);
    case MARK_AS_READ:
      return state.setIn(['notifications', action.index, 'isRead'], true);
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    default:
      return state;
  }
};

export default notificationReducer;
