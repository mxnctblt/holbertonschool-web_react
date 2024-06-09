import { fromJS } from 'immutable';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS,
} from '../actions/notificationActionTypes';

const initialState = fromJS({
  notifications: [],
  filter: 'DEFAULT',
  loading: false,
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case MARK_AS_READ: {
      const index = state.get('notifications').findIndex((notification) => notification.get('id') === action.id);
      if (index !== -1) {
        return state.setIn(['notifications', index, 'context', 'isRead'], true);
      }
      return state;
    }
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    case SET_LOADING_STATE:
      return state.set('loading', action.loading);
    case FETCH_NOTIFICATIONS_SUCCESS:
      return state.set('notifications', fromJS(action.data.map(notification => ({
        ...notification,
        context: {
          ...notification.context,
          isRead: false
        }
      }))));
    default:
      return state;
  }
}

export default notificationReducer;
