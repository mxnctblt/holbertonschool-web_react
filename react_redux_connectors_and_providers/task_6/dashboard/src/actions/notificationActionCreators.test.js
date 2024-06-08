import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';
import {
  setLoadingState,
  setNotifications,
  fetchNotifications,
  markAsRead,
  setNotificationFilter,
} from './notificationActionCreators';
import {
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters
} from './notificationActionTypes';

// Configure fetch mock
fetchMock.enableMocks();

// Création du mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(() => {
  fetchMock.resetMocks();
});

test('setLoadingState action creator returns correct action', () => {
  const loading = true;
  const expectedAction = {
    type: SET_LOADING_STATE,
    loading,
  };
  expect(setLoadingState(loading)).toEqual(expectedAction);
});

test('setNotifications action creator returns correct action', () => {
  const data = [{ id: 1, type: 'default', value: 'New course available' }];
  const expectedAction = {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data,
  };
  expect(setNotifications(data)).toEqual(expectedAction);
});

test('fetchNotifications dispatches the correct actions', async () => {
  const mockData = [{ id: 1, type: 'default', value: 'New course available' }];
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const expectedActions = [
    { type: SET_LOADING_STATE, loading: true },
    { type: FETCH_NOTIFICATIONS_SUCCESS, data: mockData },
    { type: SET_LOADING_STATE, loading: false },
  ];

  const store = mockStore({});
  await store.dispatch(fetchNotifications());
  const actions = store.getActions();
  expect(actions[0]).toEqual(expectedActions[0]);
  expect(actions[1]).toEqual(expectedActions[1]);
  expect(actions[2]).toEqual(expectedActions[2]);
});

test('markAsRead action creator returns correct action', () => {
  const id = 1;
  const expectedAction = {
    type: MARK_AS_READ,
    id,
  };
  expect(markAsRead(id)).toEqual(expectedAction);
});

test('setNotificationFilter action creator returns correct action', () => {
  const filter = NotificationTypeFilters.DEFAULT;
  const expectedAction = {
    type: SET_TYPE_FILTER,
    filter,
  };
  expect(setNotificationFilter(filter)).toEqual(expectedAction);
});
