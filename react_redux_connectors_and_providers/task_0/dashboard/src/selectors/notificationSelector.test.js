import { Map } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

describe('notification selectors', () => {
  const state = Map({
    filter: 'DEFAULT',
    notifications: Map({
      '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
      '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
      '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    })
  });

  it('filterTypeSelected works as expected', () => {
    expect(filterTypeSelected(state)).toBe('DEFAULT');
  });

  it('getNotifications returns the list of notifications', () => {
    const notifications = getNotifications(state);
    expect(notifications.toJS()).toEqual({
      '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
      '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
      '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    });
  });

  it('getUnreadNotifications returns the list of unread notifications', () => {
    const unreadNotifications = getUnreadNotifications(state);
    expect(unreadNotifications.toJS()).toEqual({
      '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
      '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    });
  });
});
