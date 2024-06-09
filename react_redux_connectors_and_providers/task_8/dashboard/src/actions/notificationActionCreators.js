import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS
} from './notificationActionTypes';

export const markAsRead = (id) => ({
  type: MARK_AS_READ,
  id,
});

export const setLoadingState = (loading) => {
  return {
    type: SET_LOADING_STATE,
    loading,
  };
};

export const setNotificationFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter,
});

export const setNotifications = (data) => {
  const sanitizedData = data.map(notification => ({
    ...notification,
    type: notification.context.type || 'default',
  }));
  
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data: sanitizedData,
  };
};

export const fetchNotifications = () => {
  return (dispatch) => {
    dispatch(setLoadingState(true));
    return fetch('/notifications.json')
      .then(response => response.json())
      .then(data => {
        dispatch(setNotifications(data));
        dispatch(setLoadingState(false));
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        dispatch(setLoadingState(false));
      });
  };
};
