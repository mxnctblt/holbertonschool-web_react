import { fromJS } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotificationsByType } from './notificationSelector';

describe('notification selectors', () => {
  const state = fromJS({
    notifications: {
      filter: 'DEFAULT',
      notifications: [
        { id: 1, type: 'default', context: { value: 'New course available', isRead: false } },
        { id: 2, type: 'urgent', context: { value: 'New resume available', isRead: true } },
        { id: 3, type: 'urgent', context: { value: 'New data available', isRead: false } },
      ],
    },
  });

  it('filterTypeSelected works as expected', () => {
    expect(filterTypeSelected(state)).toBe('DEFAULT');
  });

  it('getNotifications returns the list of notifications', () => {
    const notifications = getNotifications(state);
    expect(notifications.toJS()).toEqual([
      { id: 1, type: 'default', context: { value: 'New course available', isRead: false } },
      { id: 2, type: 'urgent', context: { value: 'New resume available', isRead: true } },
      { id: 3, type: 'urgent', context: { value: 'New data available', isRead: false } },
    ]);
  });

  it('getUnreadNotificationsByType returns the list of unread notifications when filter is DEFAULT', () => {
    const unreadNotifications = getUnreadNotificationsByType(state);
    expect(unreadNotifications).toEqual([
      { id: 1, type: 'default', context: { value: 'New course available', isRead: false } },
      { id: 3, type: 'urgent', context: { value: 'New data available', isRead: false } },
    ]);
  });

  it('getUnreadNotificationsByType returns the list of unread urgent notifications when filter is URGENT', () => {
    const stateWithUrgentFilter = state.setIn(['notifications', 'filter'], 'URGENT');
    const unreadUrgentNotifications = getUnreadNotificationsByType(stateWithUrgentFilter);
    expect(unreadUrgentNotifications).toEqual([
      { id: 3, type: 'urgent', context: { value: 'New data available', isRead: false } },
    ]);
  });
});
