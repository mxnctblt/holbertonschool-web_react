import { Map } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER } from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  it('should return the initial state when no action is passed', () => {
    const state = notificationReducer(undefined, {});
    const expectedState = Map({
      notifications: Map(), 
      filter: 'DEFAULT'
    });
    expect(state).toEqual(expectedState);
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS action', () => {
    const data = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New data available' }
    ];
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    expect(state.toJS()).toEqual({
      filter: 'DEFAULT',
      notifications: {
        '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
        '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
      }
    });
  });

  it('should handle MARK_AS_READ action', () => {
    const initialState = Map({
      filter: 'DEFAULT',
      notifications: {
        '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
        '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
      }
    });
    const state = notificationReducer(initialState, { type: MARK_AS_READ, index: '2' });
    expect(state.toJS().notifications['2'].isRead).toBe(true);
  });

  it('should handle SET_TYPE_FILTER action', () => {
    const initialState = Map({
      filter: 'DEFAULT',
      notifications: {
        '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
        '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        '3': { id: 3, type: 'urgent', value: 'New data available', isRead: false }
      }
    });
    const state = notificationReducer(initialState, { type: SET_TYPE_FILTER, filter: 'URGENT' });
    expect(state.toJS().filter).toBe('URGENT');
  });
});
