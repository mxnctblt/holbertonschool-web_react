import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, displayNotificationDrawer, hideNotificationDrawer, loginRequest } from './uiActionCreators';
import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.fetch = jest.fn();

afterEach(() => {
  fetch.mockClear();
});

test('login action creator returns correct action', () => {
  const email = 'test@example.com';
  const password = 'password123';
  const expectedAction = {
    type: LOGIN,
    user: { email, password }
  };
  expect(login(email, password)).toEqual(expectedAction);
});

test('logout action creator returns correct action', () => {
  const expectedAction = {
    type: LOGOUT
  };
  expect(logout()).toEqual(expectedAction);
});

test('displayNotificationDrawer action creator returns correct action', () => {
  const expectedAction = {
    type: DISPLAY_NOTIFICATION_DRAWER
  };
  expect(displayNotificationDrawer()).toEqual(expectedAction);
});

test('hideNotificationDrawer action creator returns correct action', () => {
  const expectedAction = {
    type: HIDE_NOTIFICATION_DRAWER
  };
  expect(hideNotificationDrawer()).toEqual(expectedAction);
});

describe('loginRequest', () => {
  it('creates LOGIN and LOGIN_SUCCESS when loginRequest is successful', async () => {
    const mockResponse = {
      first_name: "Johann",
      last_name: "Salva",
      email: "johann.salva@holberton.nz",
      profile_picture: "http://placehold.it/32x32"
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const expectedActions = [
      { type: LOGIN, user: { email: 'test@example.com', password: 'password123' } },
      { type: LOGIN_SUCCESS, user: {
        email: "johann.salva@holberton.nz",
        first_name: "Johann",
        last_name: "Salva",
        profile_picture: "http://placehold.it/32x32",
        isLoggedIn: true
      }}
    ];

    const store = mockStore({});

    await store.dispatch(loginRequest('test@example.com', 'password123'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates LOGIN and LOGIN_FAILURE when loginRequest fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const expectedActions = [
      { type: LOGIN, user: { email: 'test@example.com', password: 'password123' } },
      { type: LOGIN_FAILURE }
    ];

    const store = mockStore({});

    await store.dispatch(loginRequest('test@example.com', 'password123'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
